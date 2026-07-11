# Backend API Documentation - interView

**Last Updated:** July 10, 2026  
**Framework:** Express.js + Firebase Admin SDK  
**Language:** Node.js (v20+)  
**Main Entry:** `gcp/index.js`

---

## Overview

The backend is a single Cloud Run endpoint that receives all frontend requests and routes them based on the `eventType` field in the JSON payload. The architecture uses modular event handlers and a bulkhead pattern for resilience.

### Technology Stack
- **Framework:** Express.js
- **Database:** Firebase Firestore
- **Authentication:** JWT (custom implementation)
- **Encryption:** bcryptjs, crypto (Node.js)
- **Rate Limiting:** Custom in-memory implementation
- **Concurrency:** Semaphore-based bulkheads

---

## 1. Core Infrastructure

### 1.1 Main Endpoint Handler
**File:** `gcp/index.js:125-181`  
**Function:** `exports.ingest(req, res)`

```javascript
// Request structure
POST /
Headers: Content-Type: application/json
Body: {
  eventType: string,     // Determines handler
  [handler-specific fields]
}

// All responses follow:
{
  ok: boolean,
  [data fields if ok],
  error?: string
}
```

**Request Processing Pipeline:**
1. Extract event type and IP address
2. Validate CORS origin
3. Route to appropriate handler based on event type
4. Log request completion

**CORS Configuration:** Whitelist maintained in `gcp/request.js`

---

### 1.2 Rate Limiting
**File:** `gcp/index.js:38-53`, `gcp/request.js`

**Configuration Constants:**
```javascript
RATE_WINDOW_MS = 60_000         // 1 minute window
MAX_PER_IP = 60                 // 60 requests per IP per minute
MAX_PER_NAME_IP = 20            // 20 requests per (name+IP) per minute
```

**Implementation:**
- In-memory bucket-based rate limiter
- Tracks: IP address, user name, timestamp
- Auto-cleanup of old buckets every minute
- Rejects requests exceeding limits with 429 status

**Usage:** Called in each handler before processing

---

### 1.3 Bulkhead Pattern (Resilience)
**File:** `gcp/bulkhead.js`

**Configured Bulkheads:**
```javascript
firestoreBulkhead    // Limits concurrent Firestore operations
aiProviderBulkhead   // Limits concurrent AI provider calls (25_000ms timeout)
githubBulkhead       // Limits concurrent GitHub API calls
```

**Semaphore Implementation:**
- Controls concurrent access to resources
- Prevents cascade failures
- Each bulkhead has configurable max concurrent requests

---

## 2. Event Handlers

### 2.1 Authentication Handler
**File:** `gcp/auth.js`  
**Event Types:** `signup`, `auth`

#### 2.1.1 Signup Event
**File:** `gcp/auth.js:1-100`  
**Function:** `handleAuthAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'signup',
  username: string,       // Min 3 chars, alphanumeric + underscore
  password: string,       // Min 8 chars
  clientTime: string,
  timezone: string,
  locale: string,
  page: string,
  referrer: string,
  userAgent: string,
  screen: { width, height },
  windowSize: { width, height },
  colorDepth: number,
  platform: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  sessionToken?: string,  // JWT token
  knownUser?: boolean,
  error?: string
}
```

**Validation:**
- Username: 3-50 chars, alphanumeric + underscore only
- Password: 8+ chars, no validation on complexity
- Rate limit: 20 requests per IP per minute

**Database Operations:**
- Check if user exists in Firestore collection `users`
- Hash password with bcryptjs (rounds: 10)
- Create user document with metadata
- Generate JWT session token

**Security:**
- BCRYPT password hashing with salt rounds = 10
- Passwords not stored in logs
- Session tokens expire after 30 days (server-side)

---

#### 2.1.2 Auth (Login) Event
**File:** `gcp/auth.js:100-167`  
**Function:** `handleAuthAction(req, res, meta, ctx)` (same handler)

**Request Payload:**
```javascript
{
  eventType: 'auth',
  username: string,
  password: string,
  clientTime: string,
  timezone: string,
  locale: string,
  page: string,
  referrer: string,
  userAgent: string,
  screen: { width, height },
  windowSize: { width, height },
  colorDepth: number,
  platform: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  sessionToken?: string,  // JWT
  knownUser?: boolean,    // true if existing user
  welcomeMessage?: string,
  error?: string
}
```

**Validation:**
- Verify username and password against Firestore
- Compare provided password with bcrypt hash

**Database Operations:**
- Query user document
- Verify bcrypt hash
- Create/refresh session record
- Log successful/failed authentication attempt

---

### 2.2 Content Handler
**File:** `gcp/content.js`  
**Event Types:** `index_content`, `page_content`

#### 2.2.1 Index Content
**File:** `gcp/content.js:30-80`  
**Function:** `handleContentAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'index_content'
}
```

**Response:**
```javascript
{
  ok: boolean,
  cards?: Array<{
    id: string,
    title: string,
    description: string,
    icon?: string,
    category?: string,
    tags?: Array<string>
  }>,
  error?: string
}
```

**Data Source Priority:**
1. Firestore collection `index/main/cards`
2. Fallback: Local file `data/index.json`
3. Cache: 5-minute in-memory cache

**Caching Strategy:**
- First request fetches from Firestore
- Subsequent requests served from cache
- Cache invalidation on TTL or explicit update

---

#### 2.2.2 Page Content
**File:** `gcp/content.js:80-150`  
**Function:** `handleContentAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'page_content',
  page: string,         // Page slug/identifier
  kind?: string         // Content type: 'guide', 'tutorial', etc.
}
```

**Response:**
```javascript
{
  ok: boolean,
  title?: string,
  description?: string,
  contentHtml?: string, // Pre-rendered HTML
  tocHtml?: string,     // Table of contents HTML
  lastUpdated?: string,
  error?: string
}
```

**Data Source:**
- Firestore collection `pages/{pageId}`
- GitHub private repo (if available)
- Local fallback from `htmls/` directory

**Processing:**
- Sanitize page slug: alphanumeric, underscore, dash only
- Extract markdown from GitHub
- Convert to HTML
- Generate table of contents
- Cache for 1 hour

---

### 2.3 Message Handler
**File:** `gcp/message.js`  
**Event Types:** `message_send`, `message_fetch`, `message_delete`

#### 2.3.1 Send Message
**File:** `gcp/message.js:150-350`  
**Function:** `handleMessageAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'message_send',
  scope: 'global' | 'user' | 'admin',
  from: string,         // Sender username
  to: string,           // Recipient (if scope='user')
  message?: string,     // Uncompressed message
  messageGzipBase64?: string,  // Gzip + base64
  messageEncoding: 'utf8' | 'gzip',
  messageLength: number,
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  messageId?: string,
  version?: string,
  timestamp?: string,
  error?: string
}
```

**Validation:**
- Max message length: 600,000 chars (uncompressed)
- Session token required for user/admin scopes
- Rate limit: 20 req/min per (user+IP)

**Processing:**
- Decompress if gzipped
- Sanitize message content
- Increment message version
- Store in Firestore collection `messages`

**Database Operations:**
```
Collection: messages/{scope}/{thread}
Document: {
  from, to, message, timestamp, version, seen, createdAt
}
```

---

#### 2.3.2 Fetch Messages
**File:** `gcp/message.js:350-500`  
**Function:** `handleMessageAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'message_fetch',
  scope: 'global' | 'user' | 'admin',
  user: string,
  markSeen: boolean,    // Mark fetched as read
  knownVersion: string, // Last known message version
  beforeTime?: string,  // Pagination: ISO timestamp
  limit: number,        // Max 100
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  messages?: Array<{
    id: string,
    from: string,
    to?: string,
    message: string,
    timestamp: string,
    version: string,
    seen: boolean
  }>,
  hasMore?: boolean,
  error?: string
}
```

**Query Logic:**
- Fetch messages from specific scope
- Paginate using `beforeTime` timestamp
- Return max `limit` messages (default: 20)
- Mark as seen if requested

---

#### 2.3.3 Delete Messages
**File:** `gcp/message.js:500-650`  
**Function:** `handleMessageAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'message_delete',
  scope: 'global' | 'user' | 'admin',
  index?: number,       // Specific message index
  id?: string,          // Message ID
  deleteAll?: boolean,  // Delete all in scope
  requestor: string,    // User requesting delete
  user: string,
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  deletedCount?: number,
  error?: string
}
```

**Security:**
- Only message author or admins can delete
- Admin scope can only be accessed by admins

---

### 2.4 AI Handler
**File:** `gcp/ai.js` (802 lines)  
**Event Types:** `ai_chat`, `ai_config_get`, `ai_config_save`, `ai_config_set_active`, `ai_config_delete`, `ai_visualize`, `ai_visualization_get`, `ai_visualization_submit`, `ai_visualization_history`, `ai_markdown_assist`

#### 2.4.1 AI Chat
**File:** `gcp/ai.js:1-150`  
**Function:** `handleAiAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'ai_chat',
  message: string,      // User question
  history?: Array<{     // Conversation history
    role: 'user' | 'assistant',
    content: string
  }>,
  page?: string,        // Context: current page
  sessionToken: string,
  user: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  response?: string,    // AI generated answer
  tokens?: {
    used: number,
    available: number
  },
  model?: string,
  error?: string
}
```

**AI Provider Support:**
- **OpenAI:** gpt-4, gpt-3.5-turbo
- **Anthropic:** claude-3-opus, claude-3-sonnet
- **Google Vertex:** gemini-pro
- **Groq:** mixtral-8x7b

**Configuration:**
- Max output tokens: 2,900
- Timeout: 25 seconds
- Uses user's configured API key (stored encrypted)

**Processing:**
1. Fetch user's AI config
2. Build system prompt with context
3. Call AI provider
4. Stream response or return full response
5. Log tokens used

**Error Handling:**
- Provider timeout → 500 error
- Invalid API key → 401 error
- Rate limit exceeded → 429 error

---

#### 2.4.2 AI Config - Get
**File:** `gcp/ai.js:150-220`

**Request Payload:**
```javascript
{
  eventType: 'ai_config_get',
  user: string,
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  keys?: Array<{
    id: string,
    provider: string,     // 'openai', 'anthropic', 'google', 'groq'
    hasApiKey: boolean,   // Never return actual key
    lastUsed?: string,
    model?: string
  }>,
  activeKeyId?: string,
  error?: string
}
```

**Database:**
```
Collection: ai_config/{userId}
Document: {
  provider, model, apiKey (encrypted), createdAt, lastUsed
}
```

**Security:**
- Never return actual API keys to frontend
- Return only `hasApiKey` boolean flag

---

#### 2.4.3 AI Config - Save
**File:** `gcp/ai.js:220-350`

**Request Payload:**
```javascript
{
  eventType: 'ai_config_save',
  user: string,
  sessionToken: string,
  keys: Array<{
    id: string,
    provider: string,
    apiKey: string,       // Will be encrypted
    baseUrl?: string,
    model?: string
  }>,
  activeKeyId: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  activeKeyId?: string,
  error?: string
}
```

**Processing:**
1. Validate API key format (per provider)
2. Encrypt with crypto.createCipher()
3. Store in Firestore
4. Set active key ID
5. Clear any AI chat cache for user

**Encryption:**
- Algorithm: AES-256 (via crypto module)
- Key: User ID + server secret
- Stored as base64 in Firestore

---

#### 2.4.4 AI Visualization - Generate
**File:** `gcp/ai.js:400-600`, `gcp/visualization.js`

**Request Payload:**
```javascript
{
  eventType: 'ai_visualize',
  user: string,
  sessionToken: string,
  sourceCode: string,   // Code to trace
  language: string,     // 'java', 'python', 'javascript', 'cpp', 'c'
  audienceLevel?: string  // 'beginner', 'intermediate', 'advanced'
}
```

**Response:**
```javascript
{
  ok: boolean,
  visualization?: {
    id: string,
    steps: Array<{
      label: string,
      state: Array<{
        name: string,
        value: any,
        role: 'input' | 'variable' | 'output'
      }>,
      stats?: Array<{
        label: string,
        value: any,
        tone: 'neutral' | 'positive' | 'warning'
      }>,
      cells?: Array<{
        index: string,
        value: any,
        tag: string
      }>
    }>,
    flow?: Array<{
      type: 'start' | 'process' | 'decision' | 'end',
      text: string
    }>,
    complexity?: {
      time: string,     // 'O(n)', 'O(n²)', etc.
      space: string
    }
  },
  error?: string
}
```

**Processing:**
1. Validate language support
2. Normalize source code (e.g., Java class names)
3. Call AI provider to generate trace steps
4. Parse response into visualization structure
5. Store for future retrieval

**AI Max Tokens:** 9,000 (larger than chat)

**Database:**
```
Collection: visualizations/{userId}/{id}
Document: {
  language, sourceCode, visualization, createdAt, status
}
```

---

### 2.5 Admin Handler
**File:** `gcp/admin.js`  
**Event Types:** `admin`, `admin_visualization_pending`, `admin_visualization_review`

#### 2.5.1 Admin Dashboard
**File:** `gcp/admin.js:1-150`  
**Function:** `handleAdminAction(req, res, meta, ctx)`

**Request Payload:**
```javascript
{
  eventType: 'admin',
  username: string,
  password: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  stats?: {
    totalUsers: number,
    activeUsers: number,
    totalMessages: number,
    totalVisualizations: number,
    lastUpdated: string
  },
  dashboard?: {
    recentActivity: Array,
    systemHealth: object
  },
  error?: string
}
```

**Authentication:**
- Verify admin credentials
- Check `admin` flag in user document

**Database Queries:**
- Count users: collection `users`
- Active users: last login within 30 days
- Stats from aggregated documents

---

#### 2.5.2 Pending Visualizations
**File:** `gcp/admin.js:150-300`

**Request Payload:**
```javascript
{
  eventType: 'admin_visualization_pending',
  username: string,
  password: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  items?: Array<{
    id: string,
    user: string,
    sourceCode: string,
    language: string,
    visualization: object,
    submittedAt: string,
    status: 'pending' | 'approved' | 'rejected'
  }>,
  error?: string
}
```

**Query:**
```
Collection: visualizations_pending
Where: status == 'pending'
Limit: 50
```

---

#### 2.5.3 Review Visualization
**File:** `gcp/admin.js:300-450`

**Request Payload:**
```javascript
{
  eventType: 'admin_visualization_review',
  id: string,
  action: 'approve' | 'reject',
  username: string,
  password: string,
  feedback?: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  id?: string,
  action?: string,
  error?: string
}
```

**Processing:**
1. Update visualization status
2. Move to approved/rejected collection
3. Log admin action
4. Notify user if approved

---

### 2.6 Analytics Handler
**File:** `gcp/analytics.js`  
**Event Types:** `page_view`, `page_exit`, and all unrecognized event types

#### 2.6.1 Page View
**Request Payload:**
```javascript
{
  eventType: 'page_view',
  name: string,         // User name
  clientTime: string,
  timezone: string,
  locale: string,
  page: string,         // Page URL
  referrer: string,
  userAgent: string,
  geo?: object          // Geolocation data
}
```

**Processing:**
- Insert into Firestore collection `analytics/page_views`
- Aggregate stats hourly
- No response required (fire-and-forget)

---

#### 2.6.2 Page Exit
**Request Payload:**
```javascript
{
  eventType: 'page_exit',
  name: string,
  page: string,
  timeOnPage: number,   // Milliseconds
  scrollDepth: number,  // 0-100 percentage
  interactions: number,
  clientTime: string
}
```

**Processing:**
- Store in collection `analytics/page_exits`
- Calculate engagement metrics
- Update user session stats

---

## 3. Helper Modules

### 3.1 Firebase Helper
**File:** `gcp/firebase.js`  
**Function:** `createFirestoreGetter(admin)`

**Exports:**
```javascript
getFirestore()  // Returns Firestore instance
```

**Usage:** Lazy-loads Firestore connection on first call

---

### 3.2 Session Helper
**File:** `gcp/session.js`  
**Functions:** `createSessionHelpers(config)`

**Exports:**
```javascript
validateSessionToken(token, user)  // Returns true/false
createSessionToken(user)            // Returns JWT
refreshSessionToken(token)          // Returns new JWT
```

**Token Format:** JWT with payload:
```javascript
{
  userId: string,
  username: string,
  createdAt: timestamp,
  expiresAt: timestamp + 30_days
}
```

---

### 3.3 ID Generator
**File:** `gcp/id.js`  
**Functions:**

```javascript
makeId()        // Returns: ulid-like string for documents
makeVersion()   // Returns: timestamp-based version string
```

---

### 3.4 Validation Helper
**File:** `gcp/validation.js`  
**Functions:**

```javascript
validateName(name)              // Validate username
safeStr(value)                  // Sanitize string
safePositiveInt(value)          // Parse positive int
safeMessage(value)              // Sanitize message content
sanitizePageSlug(slug)          // Validate page identifier
extractPageSlugFromUrl(url)     // Extract slug from URL
```

---

### 3.5 Logging
**File:** `gcp/log.js`  
**Function:** `logEvent(eventName, details, level = 'info')`

**Levels:** 'info', 'warn', 'error'

**Usage Throughout:** All handlers call `logEvent()` for debugging

---

### 3.6 Lock Helper
**File:** `gcp/lock.js`  
**Functions:** `createLockHelpers(config)`

**Exports:**
```javascript
acquireLock(key, ttl)      // Distributed lock
releaseLock(key)            // Release lock
withLock(key, fn, ttl)     // Execute fn with lock
```

**Implementation:** Firestore-backed distributed lock

---

### 3.7 Git Helper
**File:** `gcp/git.js`  
**Functions:** `createGitHelpers(config)`

**Exports:**
```javascript
fetchGithubContent(repo, path)  // Fetch from GitHub
validateGithubUrl(url)          // Validate URL
parseGithubUrl(url)             // Extract owner/repo
```

**Rate Limiting:** 20 requests/minute per API key

---

### 3.8 Visualization Helper
**File:** `gcp/visualization.js`  
**Functions:** `createVisualizationHelpers(config)`

**Exports:**
```javascript
generateVisualization(code, language)  // Call AI
parseVisualizationResponse(response)    // Parse AI response
```

---

### 3.9 Request Helper
**File:** `gcp/request.js`

**Functions:**
```javascript
isAllowedOrigin(req)              // Check CORS whitelist
setCors(res, req)                 // Set CORS headers
toOrigin(url)                     // Extract origin from URL
sendDependencyError(res, error)   // Format dependency errors
```

**Whitelist:** Configured in environment or hardcoded

---

## 4. Database Schema

### Collections Overview

```
Firestore Collections:
├── users/{userId}
│   ├── username: string
│   ├── passwordHash: string (bcrypt)
│   ├── createdAt: timestamp
│   ├── lastLogin: timestamp
│   ├── isAdmin: boolean
│   ├── roles: Array<string>
│   └── metadata: object
│
├── sessions/{sessionId}
│   ├── userId: string
│   ├── token: string
│   ├── createdAt: timestamp
│   ├── expiresAt: timestamp
│   └── ipAddress: string
│
├── ai_config/{userId}/{configId}
│   ├── provider: string (openai|anthropic|google|groq)
│   ├── model: string
│   ├── apiKey: string (encrypted)
│   ├── isActive: boolean
│   └── lastUsed: timestamp
│
├── messages/{scope}/{threadId}
│   ├── from: string
│   ├── to: string (optional)
│   ├── message: string
│   ├── timestamp: timestamp
│   ├── version: string
│   ├── seen: boolean
│   └── createdAt: timestamp
│
├── visualizations/{userId}/{vizId}
│   ├── language: string
│   ├── sourceCode: string
│   ├── visualization: object
│   ├── status: string (pending|approved|rejected)
│   ├── createdAt: timestamp
│   └── approvedAt?: timestamp
│
├── visualizations_pending
│   └── (same as visualizations with status='pending')
│
├── analytics/page_views
│   ├── user: string
│   ├── page: string
│   ├── timestamp: timestamp
│   └── sessionId: string
│
├── analytics/page_exits
│   ├── user: string
│   ├── page: string
│   ├── timeOnPage: number
│   ├── scrollDepth: number
│   └── timestamp: timestamp
│
└── index/main
    ├── cards: Array<{id, title, description, icon, category}>
    └── metadata: {lastUpdated, version}
```

---

## 5. Environment Configuration

**Required Environment Variables:**
```bash
PORT=8080                                  # Server port
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
FIREBASE_CONFIG_PATH=/path/to/credentials

# GitHub Integration (optional)
GITHUB_API_TOKEN=ghp_...
GITHUB_CONTENT_REPO=owner/repo

# AI Providers (configured per-user)
(User stores their own API keys encrypted in Firestore)
```

---

## 6. Unused/Deprecated Exports

The following items are exported from `gcp/index.js` but **NOT actively used** by any handler or should be marked for cleanup:

**Can Be Removed After Verification:**
- `sanitizeLogDetails` - Only used internally in logging
- `makeVersion` - Only used in message.js
- Unused validator functions (check each handler)

**For Future Refactoring:**
- Move some session helpers to lazy-load modules
- Consider moving `makeId`, `makeVersion` to specific modules
- Extract common validation into shared module

---

## 7. Error Codes & Messages

**Standard HTTP Response Codes:**
```
200 OK - Request successful
400 Bad Request - Validation error or malformed payload
401 Unauthorized - Authentication failed
403 Forbidden - Insufficient permissions
404 Not Found - Resource doesn't exist
429 Too Many Requests - Rate limit exceeded
500 Internal Server Error - Server-side error
503 Service Unavailable - Dependency service down
```

**Error Response Format:**
```javascript
{
  ok: false,
  error: "Human-readable error message",
  detail?: "Technical details",
  statusCode?: number
}
```

---

## 8. Performance & Limits

**Request Limits:**
- Max JSON body size: 10 MB
- Max message length: 600,000 characters
- Max AI output: 2,900 tokens (chat), 9,000 tokens (visualization)
- Rate limits: 60 req/min per IP, 20 req/min per (user+IP)

**Timeouts:**
- AI provider calls: 25 seconds
- GitHub API calls: 20 seconds
- Firestore operations: Default Firestore timeout

**Caching:**
- Index content: 5 minutes
- Page content: 1 hour
- AI responses: None (real-time)

---

## 9. Deployment

**Cloud Run Configuration:**
```
Memory: 512 MB - 2 GB
CPU: 1 - 2 vCPU
Timeout: 540 seconds (9 minutes)
Concurrency: 50 - 100
```

**Build & Deploy:**
```bash
cd gcp
npm install
# Deploy to Cloud Run
gcloud run deploy visit-ingest --source .
```

---

## 10. Monitoring & Logging

**Logs Location:**
- GCP Cloud Logging console
- Each request logs: eventType, status, duration, result

**Metrics to Monitor:**
- Request count by event type
- Error rate by handler
- P95 response latency
- Rate limit violations
- AI provider failures
- Database operation latency

---

## Summary of Active Backend Handlers

| Handler | File | Event Types | Status |
|---------|------|-------------|--------|
| Authentication | auth.js | signup, auth | ✅ Active |
| Content | content.js | index_content, page_content | ✅ Active |
| Messages | message.js | message_send, message_fetch, message_delete | ✅ Active |
| AI | ai.js | ai_chat, ai_config_*, ai_visualize*, ai_markdown_assist | ✅ Active |
| Admin | admin.js | admin, admin_visualization_* | ✅ Active |
| Analytics | analytics.js | page_view, page_exit, [other] | ✅ Active |

---

**Total Active Event Types: 21**  
**Total Active Handlers: 6**  
**Total Active Database Collections: 9**

