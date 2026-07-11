# Frontend API Documentation - interView

**Last Updated:** July 10, 2026  
**Base Endpoint:** `https://visit-ingest-342647168408.asia-south1.run.app`

---

## Overview

All frontend API calls use the same endpoint with POST requests. The `eventType` field in the payload determines which backend handler processes the request.

### Configuration
- **Endpoint Configuration File:** `js/visit-config.js`
- **Endpoint Env Variable:** `window.VISIT_ENDPOINT`
- **Default Method:** POST
- **Content-Type:** application/json
- **CORS:** Enabled for whitelisted origins

---

## 1. Authentication APIs

### 1.1 Signup
**File:** `js/auth-client.js`  
**Event Type:** `signup`  
**HTTP Method:** POST  
**Used By:** login.html

```javascript
{
  eventType: 'signup',
  username: string,        // User name (validated)
  password: string,        // Password (bcrypt-compatible)
  clientTime: string,      // ISO timestamp
  timezone: string,        // Intl.DateTimeFormat timeZone
  locale: string,          // navigator.language
  page: string,            // window.location.href
  referrer: string,        // document.referrer
  userAgent: string,       // navigator.userAgent
  screen: {
    width: number,
    height: number
  },
  windowSize: {
    width: number,
    height: number
  },
  colorDepth: number,      // screen.colorDepth
  platform: string         // navigator.platform
}
```

**Response:**
```javascript
{
  ok: boolean,
  sessionToken: string,    // JWT token for session
  knownUser: boolean,      // Existing user indicator
  error?: string
}
```

**Backend Handler:** `gcp/auth.js` - `handleAuthAction()`

---

### 1.2 Login (Auth)
**File:** `js/auth-client.js`  
**Event Type:** `auth`  
**HTTP Method:** POST  
**Used By:** login.html

**Request Payload:**
```javascript
{
  eventType: 'auth',
  username: string,        // User name
  password: string,        // Password
  clientTime: string,      // ISO timestamp
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
  sessionToken: string,    // JWT for authenticated session
  knownUser: boolean,
  welcomeMessage?: string, // Optional greeting
  error?: string
}
```

**Backend Handler:** `gcp/auth.js` - `handleAuthAction()`

---

## 2. Content APIs

### 2.1 Fetch Index Content
**File:** `js/index-app.js`  
**Event Type:** `index_content`  
**HTTP Method:** POST  
**Used By:** index.html

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
  cards: Array<{
    id: string,
    title: string,
    description: string,
    icon?: string,
    category?: string
  }>,
  error?: string
}
```

**Backend Handler:** `gcp/content.js` - `handleContentAction()`  
**Data Source:** Firestore or local fallback from `data/index.json`

---

### 2.2 Fetch Page Content
**File:** `js/generic-page-loader.js`  
**Event Type:** `page_content`  
**HTTP Method:** POST  
**Used By:** pages/page.html

**Request Payload:**
```javascript
{
  eventType: 'page_content',
  page: string,            // Page identifier/slug
  kind?: string            // Content kind (guide, tutorial, etc.)
}
```

**Response:**
```javascript
{
  ok: boolean,
  title: string,
  description?: string,
  contentHtml: string,     // HTML content
  tocHtml?: string,        // Table of contents HTML
  lastUpdated?: string,
  error?: string
}
```

**Backend Handler:** `gcp/content.js` - `handleContentAction()`  
**Data Source:** Private repo via GitHub API or local fallback

---

## 3. Chat & Messaging APIs

### 3.1 Send Message
**File:** `js/chat.js`  
**Event Type:** `message_send`  
**HTTP Method:** POST  
**Used By:** index.html, admin.html

**Request Payload:**
```javascript
{
  eventType: 'message_send',
  scope: string,           // 'global', 'user', 'admin'
  from: string,            // Sender user ID
  to: string,              // Recipient user ID (if private)
  message: string | null,  // Plain text message
  messageGzipBase64: string | null,  // Gzipped + base64 (for large messages)
  messageEncoding: string, // 'utf8' or 'gzip'
  messageLength: number,   // Length before encoding
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  messageId?: string,
  timestamp?: string,
  error?: string
}
```

**Backend Handler:** `gcp/message.js` - `handleMessageAction()`

---

### 3.2 Fetch Messages
**File:** `js/chat.js`  
**Event Type:** `message_fetch`  
**HTTP Method:** POST  
**Used By:** index.html, admin.html

**Request Payload:**
```javascript
{
  eventType: 'message_fetch',
  scope: string,           // 'global', 'user', 'admin'
  user: string,            // Current user
  markSeen: boolean,       // Mark fetched messages as read
  knownVersion: string,    // Last known message version
  beforeTime?: string,     // ISO timestamp for pagination
  limit: number,           // Max messages to fetch (default: 20)
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  messages: Array<{
    id: string,
    from: string,
    to: string,
    message: string,
    timestamp: string,
    seen: boolean,
    version: string
  }>,
  hasMore: boolean,
  error?: string
}
```

**Backend Handler:** `gcp/message.js` - `handleMessageAction()`

---

### 3.3 Delete Message
**File:** `js/chat.js`  
**Event Type:** `message_delete`  
**HTTP Method:** POST  
**Used By:** index.html, admin.html

**Request Payload:**
```javascript
{
  eventType: 'message_delete',
  scope: string,
  index: number | null,    // Specific message index
  id: string | null,       // Message ID (if not using index)
  deleteAll: boolean,      // Delete all messages in scope
  requestor: string,       // User requesting deletion
  user: string,            // User for which to delete
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  deletedCount: number,
  error?: string
}
```

**Backend Handler:** `gcp/message.js` - `handleMessageAction()`

---

## 4. AI Features APIs

### 4.1 AI Chat
**File:** `js/chat.js`  
**Event Type:** `ai_chat`  
**HTTP Method:** POST  
**Used By:** index.html

**Request Payload:**
```javascript
{
  eventType: 'ai_chat',
  message: string,         // User question/prompt
  history: Array<{         // Conversation history
    role: 'user' | 'assistant',
    content: string
  }>,
  page: string,            // Current page context
  sessionToken: string,
  user: string             // User identifier
}
```

**Response:**
```javascript
{
  ok: boolean,
  response: string,        // AI generated response
  tokens: {
    used: number,
    available: number
  },
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`  
**AI Providers:** OpenAI, Anthropic, Google, Groq (configurable per user)

---

### 4.2 AI Config - Get
**File:** `js/chat.js`  
**Event Type:** `ai_config_get`  
**HTTP Method:** POST  
**Used By:** index.html, Aisettings.js

**Request Payload:**
```javascript
{
  eventType: 'ai_config_get',
  user: string,            // User identifier
  sessionToken: string
}
```

**Response:**
```javascript
{
  ok: boolean,
  keys: Array<{
    id: string,
    provider: string,      // 'openai', 'anthropic', 'google', 'groq'
    activeKeyId: string,
    hasApiKey: boolean,    // Boolean flag (actual key not returned)
    lastUsed?: string
  }>,
  activeKeyId: string,     // Currently active key ID
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.3 AI Config - Save/Add
**File:** `js/chat.js`, `js/Aisettings.js`  
**Event Type:** `ai_config_save`  
**HTTP Method:** POST  
**Used By:** index.html

**Request Payload:**
```javascript
{
  eventType: 'ai_config_save',
  user: string,
  sessionToken: string,
  keys: Array<{
    id: string,
    provider: string,
    apiKey: string,        // Encrypted before saving
    baseUrl?: string,      // For self-hosted models
    model?: string         // Model identifier
  }>,
  activeKeyId: string      // Set which key is active
}
```

**Response:**
```javascript
{
  ok: boolean,
  activeKeyId: string,
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.4 AI Config - Set Active
**File:** `js/Aisettings.js`  
**Event Type:** `ai_config_set_active`  
**HTTP Method:** POST  
**Used By:** index.html

**Request Payload:**
```javascript
{
  eventType: 'ai_config_set_active',
  user: string,
  sessionToken: string,
  keyId: string            // Key ID to activate
}
```

**Response:**
```javascript
{
  ok: boolean,
  activeKeyId: string,
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.5 AI Config - Delete
**File:** `js/Aisettings.js`  
**Event Type:** `ai_config_delete`  
**HTTP Method:** POST  
**Used By:** index.html

**Request Payload:**
```javascript
{
  eventType: 'ai_config_delete',
  user: string,
  sessionToken: string,
  keyId: string            // Key ID to delete
}
```

**Response:**
```javascript
{
  ok: boolean,
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.6 AI Visualization - Generate
**File:** `js/main.js`  
**Event Type:** `ai_visualize`  
**HTTP Method:** POST  
**Used By:** pages/page.html (logic explorer pages)

**Request Payload:**
```javascript
{
  eventType: 'ai_visualize',
  user: string,
  sessionToken: string,
  sourceCode: string,      // Code to visualize
  language: string,        // 'java', 'python', 'javascript', 'cpp'
  audienceLevel?: string   // 'beginner', 'intermediate', 'advanced'
}
```

**Response:**
```javascript
{
  ok: boolean,
  visualization: {
    id: string,
    steps: Array<{
      label: string,
      state: Array<{
        name: string,
        value: any,
        role: string         // 'input', 'variable', 'output'
      }>,
      stats?: Array<{
        label: string,
        value: any,
        tone: string         // 'neutral', 'positive', 'warning'
      }>,
      cells?: Array<{
        index: string,
        value: any,
        tag: string
      }>
    }>,
    flow?: Array<{
      type: string,         // 'start', 'process', 'decision', 'end'
      text: string
    }>,
    complexity?: {
      time: string,         // 'O(n)', 'O(n²)', etc.
      space: string
    }
  },
  error?: string
}
```

**Backend Handler:** `gcp/ai.js`, `gcp/visualization.js` - `handleAiAction()`

---

### 4.7 AI Visualization - Fetch
**File:** `js/main.js`  
**Event Type:** `ai_visualization_get`  
**HTTP Method:** POST  
**Used By:** pages/page.html

**Request Payload:**
```javascript
{
  eventType: 'ai_visualization_get',
  user: string,
  sessionToken: string,
  id: string               // Visualization ID
}
```

**Response:**
```javascript
{
  ok: boolean,
  visualization: { /* Same as ai_visualize response */ },
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.8 AI Visualization - Submit for Approval
**File:** `js/main.js`  
**Event Type:** `ai_visualization_submit`  
**HTTP Method:** POST  
**Used By:** pages/page.html

**Request Payload:**
```javascript
{
  eventType: 'ai_visualization_submit',
  user: string,
  sessionToken: string,
  sourceCode: string,
  language: string,
  visualization: { /* visualization object */ }
}
```

**Response:**
```javascript
{
  ok: boolean,
  id: string,              // Submission ID
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.9 AI Visualization - Fetch History
**File:** `js/main.js`  
**Event Type:** `ai_visualization_history`  
**HTTP Method:** POST  
**Used By:** pages/page.html

**Request Payload:**
```javascript
{
  eventType: 'ai_visualization_history',
  user: string,
  sessionToken: string,
  limit?: number           // Max items (default: 10)
}
```

**Response:**
```javascript
{
  ok: boolean,
  visualizations: Array<{
    id: string,
    language: string,
    sourceCodePreview: string,
    createdAt: string,
    timestamp: string
  }>,
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

### 4.10 AI Markdown Assist
**File:** `js/md-editor.js`  
**Event Type:** `ai_markdown_assist`  
**HTTP Method:** POST  
**Used By:** index.html

**Request Payload:**
```javascript
{
  eventType: 'ai_markdown_assist',
  user: string,
  sessionToken: string,
  content: string,         // Markdown content to assist with
  action: string           // 'improve', 'summarize', 'expand', 'fix'
}
```

**Response:**
```javascript
{
  ok: boolean,
  improved: string,        // Improved markdown
  error?: string
}
```

**Backend Handler:** `gcp/ai.js` - `handleAiAction()`

---

## 5. Admin APIs

### 5.1 Admin Dashboard
**File:** `js/admin.js`  
**Event Type:** `admin`  
**HTTP Method:** POST  
**Used By:** admin.html

**Request Payload:**
```javascript
{
  eventType: 'admin',
  username: string,        // Admin username
  password: string         // Admin password
}
```

**Response:**
```javascript
{
  ok: boolean,
  stats: {
    totalUsers: number,
    activeUsers: number,
    totalMessages: number,
    totalVisualizations: number,
    lastUpdated: string
  },
  dashboard: {
    recentActivity: Array,
    systemHealth: object
  },
  error?: string
}
```

**Backend Handler:** `gcp/admin.js` - `handleAdminAction()`

---

### 5.2 Admin - Fetch Pending Visualizations
**File:** `js/admin.js`  
**Event Type:** `admin_visualization_pending`  
**HTTP Method:** POST  
**Used By:** admin.html

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
  items: Array<{
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

**Backend Handler:** `gcp/admin.js` - `handleAdminAction()`

---

### 5.3 Admin - Review Visualization
**File:** `js/admin.js`  
**Event Type:** `admin_visualization_review`  
**HTTP Method:** POST  
**Used By:** admin.html

**Request Payload:**
```javascript
{
  eventType: 'admin_visualization_review',
  id: string,              // Visualization ID
  action: 'approve' | 'reject',
  username: string,
  password: string,
  feedback?: string        // Optional feedback
}
```

**Response:**
```javascript
{
  ok: boolean,
  id: string,
  action: string,
  error?: string
}
```

**Backend Handler:** `gcp/admin.js` - `handleAdminAction()`

---

## 6. Analytics & Page Tracking

### 6.1 Page View Tracking
**File:** `js/main.js`  
**Event Type:** `page_view`  
**HTTP Method:** POST  
**Used By:** pages/page.html, pages/pdf-viewer.html

**Request Payload:**
```javascript
{
  eventType: 'page_view',
  name: string,            // User name
  clientTime: string,      // ISO timestamp
  timezone: string,
  locale: string,
  page: string,            // Current page URL
  referrer: string,
  userAgent: string,
  geo?: object             // Geolocation if available
}
```

**Response:** Accepted silently (no response required)

**Backend Handler:** `gcp/analytics.js` - `handleAnalyticsAction()` (default fallback)

---

### 6.2 Exit Tracking
**File:** `js/main.js`  
**Event Type:** `page_exit`  
**HTTP Method:** POST  
**Used By:** pages/page.html, pages/pdf-viewer.html

**Request Payload:**
```javascript
{
  eventType: 'page_exit',
  name: string,
  page: string,
  timeOnPage: number,      // Milliseconds
  scrollDepth: number,     // Percentage (0-100)
  interactions: number,    // Count of user interactions
  clientTime: string,
  timezone: string
}
```

**Response:** Accepted silently

**Backend Handler:** `gcp/analytics.js` - `handleAnalyticsAction()` (default fallback)

---

## 7. Unused/Fallback APIs

### Legacy/Deprecated Endpoints
The following endpoints are exported in the backend context but **NOT actively called** from any frontend code:

- `js_*` events (JavaScript-specific handlers) - exported but no active usage
- `git_*` events (GitHub integration) - used internally by backend only
- `sanitizeLogDetails` - used internally for logging
- `makeVersion` - used internally in message handlers

### Recommended for Cleanup (Phase 2)
These can be removed or refactored after verification:
- Legacy validator functions with limited usage
- Unused session helpers
- Deprecated message handlers (if not in active use)

---

## 8. Rate Limiting & Throttling

**Rate Limits:**
- Per IP: 60 requests/minute
- Per IP + Name: 20 requests/minute

**Throttling:**
- Page view tracking: 30-second throttle per page
- Message polling: Configurable per feature

**Burst Protection:**
- Bulkhead pattern for AI provider calls
- Bulkhead pattern for GitHub API calls
- Bulkhead pattern for Firestore operations

---

## 9. Error Handling

All API responses follow this pattern:

```javascript
{
  ok: boolean,        // true for success, false for errors
  [data fields],      // If ok === true
  error?: string,     // Human-readable error if ok === false
  detail?: string,    // Technical details if available
  statusCode?: number // HTTP status code
}
```

**Common Error Codes:**
- 400: Bad request (validation failed)
- 401: Unauthorized (invalid credentials)
- 403: Forbidden (insufficient permissions)
- 404: Not found
- 429: Too many requests (rate limited)
- 500: Server error

---

## 10. Configuration & Endpoints

**Base URL Configuration:**
- **File:** `js/visit-config.js`
- **Environment:** `window.VISIT_ENDPOINT`
- **Format:** Full HTTPS URL

**Session Management:**
- **Session Token:** Stored in `sessionStorage.visitSessionToken`
- **Token TTL:** 30 days (server-side)
- **Token Format:** JWT

---

## Summary of All API Endpoints

| Feature | Event Type | Used By | Status |
|---------|-----------|---------|--------|
| Signup | `signup` | login.html | ✅ Active |
| Login | `auth` | login.html | ✅ Active |
| Index Content | `index_content` | index.html | ✅ Active |
| Page Content | `page_content` | page.html | ✅ Active |
| Message Send | `message_send` | index.html | ✅ Active |
| Message Fetch | `message_fetch` | index.html | ✅ Active |
| Message Delete | `message_delete` | index.html | ✅ Active |
| AI Chat | `ai_chat` | index.html | ✅ Active |
| AI Config Get | `ai_config_get` | index.html | ✅ Active |
| AI Config Save | `ai_config_save` | index.html | ✅ Active |
| AI Config Set Active | `ai_config_set_active` | index.html | ✅ Active |
| AI Config Delete | `ai_config_delete` | index.html | ✅ Active |
| AI Visualize | `ai_visualize` | page.html | ✅ Active |
| AI Visualization Get | `ai_visualization_get` | page.html | ✅ Active |
| AI Visualization Submit | `ai_visualization_submit` | page.html | ✅ Active |
| AI Visualization History | `ai_visualization_history` | page.html | ✅ Active |
| AI Markdown | `ai_markdown_assist` | index.html | ✅ Active |
| Admin Dashboard | `admin` | admin.html | ✅ Active |
| Admin Visualizations | `admin_visualization_pending` | admin.html | ✅ Active |
| Admin Review | `admin_visualization_review` | admin.html | ✅ Active |
| Page View | `page_view` | page.html | ✅ Active |
| Page Exit | `page_exit` | page.html | ✅ Active |

---

**Total Active Endpoints: 21**

