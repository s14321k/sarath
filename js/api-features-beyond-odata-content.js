// Api Features Beyond Odata - Content Data
const apiFeaturesBeyondOdataContentData = `<h1 id="api-features-beyond-odata-complete-guide">API Features Beyond OData — Complete Guide</h1>
<p>A comprehensive reference covering Webhooks &amp; Events, Data Retrieval &amp; Querying,</p>
<p>Metadata &amp; Schema Exploration, Batch &amp; Async Operations, File Handling, and Authentication &amp; Security.</p>
<hr>
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#1-authentication--security">Authentication &amp; Security</a></li>
<li><a href="#2-data-retrieval--querying">Data Retrieval &amp; Querying</a></li>
<li><a href="#3-metadata--schema-exploration">Metadata &amp; Schema Exploration</a></li>
<li><a href="#4-batch--async-operations">Batch &amp; Async Operations</a></li>
<li><a href="#5-file-handling--attachments">File Handling &amp; Attachments</a></li>
<li><a href="#6-webhooks--events--real-time">Webhooks &amp; Events / Real-Time</a></li>
<li><a href="#7-quick-decision-matrix">Quick Decision Matrix</a></li>
</ul>
<hr>
<h2 id="1-authentication-security">1. Authentication &amp; Security</h2>
<h3 id="11-oauth-20-the-enterprise-standard">1.1 OAuth 2.0 — The Enterprise Standard</h3>
<p>OAuth 2.0 is the most widely used auth framework for APIs. It delegates access using tokens</p>
<p>without sharing credentials.</p>
<h4 id="grant-types">Grant Types</h4>
<table>
<thead><tr>
<th>Grant Type</th>
<th>Use Case</th>
<th>Flow</th>
</tr></thead><tbody>
<tr>
<td><code>authorization_code</code></td>
<td>Web apps, user-facing login</td>
<td>Redirect → code → token</td>
</tr>
<tr>
<td><code>client_credentials</code></td>
<td>Server-to-server (no user)</td>
<td>Direct token request</td>
</tr>
<tr>
<td><code>device_code</code></td>
<td>CLI tools, IoT, TV apps</td>
<td>Device polls for user approval</td>
</tr>
<tr>
<td><code>refresh_token</code></td>
<td>Renew expired access tokens</td>
<td>Exchange refresh → new access token</td>
</tr>
<tr>
<td><code>PKCE</code></td>
<td>SPAs, mobile (no client secret)</td>
<td>code<em>verifier + code</em>challenge</td>
</tr>
</tbody></table>
<h4 id="authorization-code-pkce-flow-most-secure">Authorization Code + PKCE Flow (Most Secure)</h4>
<pre><code class="language-">
1. App generates code_verifier (random string) + code_challenge (SHA256 hash)
2. Redirect user to:
   GET /authorize
     ?response_type=code
     &amp;client_id=app123
     &amp;redirect_uri=https://app.com/callback
     &amp;scope=openid profile email
     &amp;code_challenge=abc123hash
     &amp;code_challenge_method=S256

3. User logs in, server returns:
   GET https://app.com/callback?code=AUTH_CODE

4. Exchange code for token:
   POST /token
   Content-Type: application/x-www-form-urlencoded

   grant_type=authorization_code
   &amp;code=AUTH_CODE
   &amp;redirect_uri=https://app.com/callback
   &amp;client_id=app123
   &amp;code_verifier=ORIGINAL_RANDOM_STRING

5. Token response:
{
  &quot;access_token&quot;: &quot;eyJhbGciOiJSUzI1NiJ9...&quot;,
  &quot;token_type&quot;: &quot;Bearer&quot;,
  &quot;expires_in&quot;: 3600,
  &quot;refresh_token&quot;: &quot;rt_abc123&quot;,
  &quot;scope&quot;: &quot;openid profile email&quot;,
  &quot;id_token&quot;: &quot;eyJ...&quot;
}
</code></pre>
<h4 id="client-credentials-flow-service-to-service">Client Credentials Flow (Service-to-Service)</h4>
<pre><code class="language-">
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&amp;client_id=service_app
&amp;client_secret=secret_xyz
&amp;scope=api.read api.write

Response:
{
  &quot;access_token&quot;: &quot;eyJhbGciOiJSUzI1NiJ9...&quot;,
  &quot;token_type&quot;: &quot;Bearer&quot;,
  &quot;expires_in&quot;: 3600
}
</code></pre>
<hr>
<h3 id="12-jwt-json-web-token">1.2 JWT (JSON Web Token)</h3>
<p>JWTs are self-contained tokens carrying claims — no database lookup needed for verification.</p>
<h4 id="structure">Structure</h4>
<pre><code class="language-">
Header.Payload.Signature

eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9   ← Header (Base64)
.eyJzdWIiOiJ1c2VyXzEyMyIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcwNDA2NzIwMH0=  ← Payload
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature
</code></pre>
<h4 id="decoded-payload">Decoded Payload</h4>
<pre><code class="language-json">
{
  &quot;sub&quot;: &quot;user_123&quot;,
  &quot;name&quot;: &quot;Alice&quot;,
  &quot;email&quot;: &quot;alice@company.com&quot;,
  &quot;roles&quot;: [&quot;admin&quot;, &quot;viewer&quot;],
  &quot;iat&quot;: 1704067200,
  &quot;exp&quot;: 1704070800,
  &quot;iss&quot;: &quot;https://auth.company.com&quot;,
  &quot;aud&quot;: &quot;https://api.company.com&quot;
}
</code></pre>
<h4 id="jwt-claims-reference">JWT Claims Reference</h4>
<table>
<thead><tr>
<th>Claim</th>
<th>Name</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>sub</code></td>
<td>Subject</td>
<td>User/entity identifier</td>
</tr>
<tr>
<td><code>iss</code></td>
<td>Issuer</td>
<td>Who issued the token</td>
</tr>
<tr>
<td><code>aud</code></td>
<td>Audience</td>
<td>Intended recipient</td>
</tr>
<tr>
<td><code>exp</code></td>
<td>Expiration</td>
<td>Unix timestamp — token invalid after</td>
</tr>
<tr>
<td><code>iat</code></td>
<td>Issued At</td>
<td>When token was created</td>
</tr>
<tr>
<td><code>nbf</code></td>
<td>Not Before</td>
<td>Token invalid before this time</td>
</tr>
<tr>
<td><code>jti</code></td>
<td>JWT ID</td>
<td>Unique token identifier (prevents replay)</td>
</tr>
</tbody></table>
<h4 id="token-validation-server-side">Token Validation (Server Side)</h4>
<pre><code class="language-javascript">
import jwt from &#x27;jsonwebtoken&#x27;;

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: [&#x27;RS256&#x27;],
      audience: &#x27;https://api.company.com&#x27;,
      issuer: &#x27;https://auth.company.com&#x27;
    });
    return decoded;
  } catch (err) {
    if (err.name === &#x27;TokenExpiredError&#x27;) throw new Error(&#x27;Token expired&#x27;);
    if (err.name === &#x27;JsonWebTokenError&#x27;) throw new Error(&#x27;Invalid token&#x27;);
    throw err;
  }
}
</code></pre>
<hr>
<h3 id="13-api-keys">1.3 API Keys</h3>
<p>Simple, static tokens — suitable for server-to-server or internal APIs.</p>
<pre><code class="language-">
# In header (preferred)
GET /api/v1/products
x-api-key: sk-live-abc123def456

# In query param (avoid — leaks in logs)
GET /api/v1/products?apiKey=sk-live-abc123def456
</code></pre>
<p><strong>Best Practices:</strong></p>
<ul>
<li>Rotate keys regularly</li>
<li>Scope keys to specific permissions</li>
<li>Store hashed in database (never plaintext)</li>
<li>Log usage per key for auditing</li>
</ul>
<hr>
<h3 id="14-mtls-mutual-tls">1.4 mTLS (Mutual TLS)</h3>
<p>Both client and server authenticate each other using certificates. Used in zero-trust architectures and high-security enterprise integrations.</p>
<pre><code class="language-">
Client Certificate → Server verifies client identity
Server Certificate → Client verifies server identity
</code></pre>
<pre><code class="language-bash">
# Call API with client certificate
curl --cert client.crt \
     --key  client.key \
     --cacert ca.crt \
     https://api.company.com/v1/secure-endpoint
</code></pre>
<hr>
<h3 id="15-rbac-scopes">1.5 RBAC &amp; Scopes</h3>
<pre><code class="language-json">
// OAuth scopes — coarse-grained
&quot;scope&quot;: &quot;orders:read orders:write customers:read&quot;

// JWT roles claim — fine-grained RBAC
{
  &quot;roles&quot;: [&quot;OrderManager&quot;, &quot;CustomerViewer&quot;],
  &quot;permissions&quot;: [&quot;order.create&quot;, &quot;order.cancel&quot;, &quot;customer.read&quot;]
}
</code></pre>
<p><strong>API Enforcement:</strong></p>
<pre><code class="language-javascript">
function requirePermission(permission) {
  return (req, res, next) =&gt; {
    const { permissions } = req.user;
    if (!permissions.includes(permission)) {
      return res.status(403).json({ error: &#x27;Insufficient permissions&#x27; });
    }
    next();
  };
}

app.delete(&#x27;/orders/:id&#x27;, requirePermission(&#x27;order.cancel&#x27;), deleteOrder);
</code></pre>
<hr>
<h3 id="16-security-headers">1.6 Security Headers</h3>
<pre><code class="language-">
# Always include these response headers
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src &#x27;self&#x27;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: no-referrer
Cache-Control: no-store          ← for sensitive API responses
</code></pre>
<hr>
<h3 id="17-rate-limiting-throttling">1.7 Rate Limiting &amp; Throttling</h3>
<pre><code class="language-">
# Response headers
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 450
X-RateLimit-Reset: 1704067200
Retry-After: 60

# When limit exceeded
HTTP 429 Too Many Requests
{
  &quot;error&quot;: &quot;rate_limit_exceeded&quot;,
  &quot;message&quot;: &quot;Too many requests. Retry after 60 seconds.&quot;,
  &quot;retryAfter&quot;: 60
}
</code></pre>
<p><strong>Client-side retry with backoff:</strong></p>
<pre><code class="language-javascript">
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt &lt; maxRetries; attempt++) {
    const res = await fetch(url);

    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get(&#x27;Retry-After&#x27;) || &#x27;5&#x27;);
      await new Promise(r =&gt; setTimeout(r, retryAfter * 1000 * Math.pow(2, attempt)));
      continue;
    }

    return res.json();
  }
  throw new Error(&#x27;Max retries exceeded&#x27;);
}
</code></pre>
<hr>
<h2 id="2-data-retrieval-querying">2. Data Retrieval &amp; Querying</h2>
<h3 id="21-rest-query-patterns">2.1 REST Query Patterns</h3>
<h4 id="filtering-via-query-parameters">Filtering via Query Parameters</h4>
<pre><code class="language-">
GET /products?category=electronics&amp;minPrice=100&amp;maxPrice=500&amp;inStock=true
GET /orders?status=pending&amp;createdAfter=2024-01-01&amp;customerId=C001
GET /employees?department=IT&amp;seniority=senior&amp;location=London
</code></pre>
<h4 id="field-projection-like-select">Field Projection (like <code>$select</code>)</h4>
<pre><code class="language-">
GET /customers?fields=id,name,email,phone
GET /orders?include=orderId,amount,status
GET /products?only=id,name,price
</code></pre>
<h4 id="sorting">Sorting</h4>
<pre><code class="language-">
GET /products?sort=price:desc,name:asc
GET /employees?orderBy=salary&amp;direction=desc
GET /orders?sortBy=-createdAt,+customerId   # - = desc, + = asc
</code></pre>
<h4 id="full-text-search">Full-Text Search</h4>
<pre><code class="language-">
GET /products?q=wireless+headphones
GET /articles?search=machine+learning&amp;fields=title,summary
GET /customers?query=alice&amp;searchIn=name,email
</code></pre>
<h4 id="sparse-fieldsets-jsonapi-standard">Sparse Fieldsets (JSON:API standard)</h4>
<pre><code class="language-">
GET /articles?fields[articles]=title,body&amp;fields[author]=name,email
</code></pre>
<hr>
<h3 id="22-graphql-querying-recap-for-comparison">2.2 GraphQL Querying (Recap for Comparison)</h3>
<pre><code class="language-graphql">
# Precise, nested, single-request query
query {
  orders(status: &quot;Pending&quot;, limit: 100) {
    orderId
    amount
    customer { name email }
    items { productName quantity }
  }
}
</code></pre>
<hr>
<h3 id="23-jsonapi-specification">2.3 JSON:API Specification</h3>
<p>A standardized format for REST APIs (<code>application/vnd.api+json</code>).</p>
<pre><code class="language-json">
{
  &quot;data&quot;: [
    {
      &quot;type&quot;: &quot;articles&quot;,
      &quot;id&quot;: &quot;1&quot;,
      &quot;attributes&quot;: {
        &quot;title&quot;: &quot;OData vs GraphQL&quot;,
        &quot;body&quot;: &quot;...&quot;,
        &quot;publishedAt&quot;: &quot;2024-06-01&quot;
      },
      &quot;relationships&quot;: {
        &quot;author&quot;: {
          &quot;data&quot;: { &quot;type&quot;: &quot;people&quot;, &quot;id&quot;: &quot;9&quot; }
        },
        &quot;tags&quot;: {
          &quot;data&quot;: [
            { &quot;type&quot;: &quot;tags&quot;, &quot;id&quot;: &quot;5&quot; },
            { &quot;type&quot;: &quot;tags&quot;, &quot;id&quot;: &quot;12&quot; }
          ]
        }
      }
    }
  ],
  &quot;included&quot;: [
    {
      &quot;type&quot;: &quot;people&quot;,
      &quot;id&quot;: &quot;9&quot;,
      &quot;attributes&quot;: { &quot;name&quot;: &quot;Alice&quot;, &quot;email&quot;: &quot;alice@example.com&quot; }
    }
  ],
  &quot;meta&quot;: { &quot;total&quot;: 150 },
  &quot;links&quot;: {
    &quot;self&quot;: &quot;/articles?page=1&quot;,
    &quot;next&quot;: &quot;/articles?page=2&quot;,
    &quot;last&quot;: &quot;/articles?page=15&quot;
  }
}
</code></pre>
<hr>
<h3 id="24-cursor-based-pagination-production-standard">2.4 Cursor-Based Pagination (Production Standard)</h3>
<pre><code class="language-">
# Request
GET /orders?limit=100&amp;cursor=eyJpZCI6NTAwfQ==

# Response
{
  &quot;data&quot;: [...],
  &quot;pagination&quot;: {
    &quot;nextCursor&quot;: &quot;eyJpZCI6NjAwfQ==&quot;,
    &quot;prevCursor&quot;: &quot;eyJpZCI6NDAwfQ==&quot;,
    &quot;hasNextPage&quot;: true,
    &quot;hasPrevPage&quot;: true,
    &quot;totalCount&quot;: 15420
  }
}
</code></pre>
<p><strong>Cursor generation:</strong></p>
<pre><code class="language-javascript">
// Encode last record&#x27;s ID as cursor
const cursor = Buffer.from(JSON.stringify({ id: lastRecord.id })).toString(&#x27;base64&#x27;);

// Decode on next request
const { id } = JSON.parse(Buffer.from(cursor, &#x27;base64&#x27;).toString());

// Query using decoded cursor
SELECT * FROM orders WHERE id &gt; {id} ORDER BY id LIMIT 100;
</code></pre>
<hr>
<h3 id="25-hypermedia-hateoas">2.5 Hypermedia (HATEOAS)</h3>
<p>APIs that return links to possible next actions — fully self-describing.</p>
<pre><code class="language-json">
{
  &quot;orderId&quot;: &quot;ORD-101&quot;,
  &quot;status&quot;: &quot;Pending&quot;,
  &quot;amount&quot;: 500.00,
  &quot;_links&quot;: {
    &quot;self&quot;:    { &quot;href&quot;: &quot;/orders/ORD-101&quot; },
    &quot;cancel&quot;:  { &quot;href&quot;: &quot;/orders/ORD-101/cancel&quot;,  &quot;method&quot;: &quot;POST&quot; },
    &quot;pay&quot;:     { &quot;href&quot;: &quot;/orders/ORD-101/payment&quot;, &quot;method&quot;: &quot;POST&quot; },
    &quot;customer&quot;:{ &quot;href&quot;: &quot;/customers/C001&quot; },
    &quot;items&quot;:   { &quot;href&quot;: &quot;/orders/ORD-101/items&quot; }
  }
}
</code></pre>
<hr>
<h2 id="3-metadata-schema-exploration">3. Metadata &amp; Schema Exploration</h2>
<h3 id="31-openapi-swagger">3.1 OpenAPI / Swagger</h3>
<p>The most widely used API description standard. Describes endpoints, parameters, request/response schemas, auth, and more.</p>
<pre><code class="language-yaml">
openapi: 3.1.0
info:
  title: Order Management API
  version: 1.0.0
  description: Manages orders, customers, and inventory

servers:
  - url: https://api.company.com/v1

security:
  - BearerAuth: []

paths:
  /orders:
    get:
      summary: List orders
      operationId: listOrders
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [Pending, Completed, Cancelled]
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
            maximum: 500
      responses:
        &#x27;200&#x27;:
          description: Paginated list of orders
          content:
            application/json:
              schema:
                $ref: &#x27;#/components/schemas/OrderListResponse&#x27;
        &#x27;401&#x27;:
          $ref: &#x27;#/components/responses/Unauthorized&#x27;

    post:
      summary: Create an order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: &#x27;#/components/schemas/CreateOrderRequest&#x27;
      responses:
        &#x27;201&#x27;:
          description: Order created

components:
  schemas:
    Order:
      type: object
      required: [orderId, customerId, amount]
      properties:
        orderId:
          type: string
          example: &quot;ORD-101&quot;
        customerId:
          type: string
        amount:
          type: number
          format: double
        status:
          type: string
          enum: [Pending, Processing, Completed, Cancelled]
        createdAt:
          type: string
          format: date-time

  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
</code></pre>
<p><strong>Tools built on OpenAPI:</strong></p>
<ul>
<li><strong>Swagger UI</strong> — Interactive API browser</li>
<li><strong>Postman</strong> — Import spec and auto-generate collections</li>
<li><strong>OpenAPI Generator</strong> — Generate client SDKs in 50+ languages</li>
<li><strong>Prism</strong> — Mock server from spec</li>
<li><strong>Spectral</strong> — Lint and validate your spec</li>
</ul>
<hr>
<h3 id="32-json-schema">3.2 JSON Schema</h3>
<p>Describes and validates JSON document structure.</p>
<pre><code class="language-json">
{
  &quot;$schema&quot;: &quot;https://json-schema.org/draft/2020-12/schema&quot;,
  &quot;$id&quot;: &quot;https://api.company.com/schemas/order.json&quot;,
  &quot;title&quot;: &quot;Order&quot;,
  &quot;type&quot;: &quot;object&quot;,
  &quot;required&quot;: [&quot;customerId&quot;, &quot;items&quot;],
  &quot;properties&quot;: {
    &quot;customerId&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;pattern&quot;: &quot;^C[0-9]{4}$&quot;,
      &quot;description&quot;: &quot;Customer ID in format C0001&quot;
    },
    &quot;items&quot;: {
      &quot;type&quot;: &quot;array&quot;,
      &quot;minItems&quot;: 1,
      &quot;items&quot;: {
        &quot;type&quot;: &quot;object&quot;,
        &quot;required&quot;: [&quot;productId&quot;, &quot;quantity&quot;],
        &quot;properties&quot;: {
          &quot;productId&quot;: { &quot;type&quot;: &quot;string&quot; },
          &quot;quantity&quot;:  { &quot;type&quot;: &quot;integer&quot;, &quot;minimum&quot;: 1 },
          &quot;unitPrice&quot;: { &quot;type&quot;: &quot;number&quot;,  &quot;minimum&quot;: 0 }
        }
      }
    },
    &quot;discount&quot;: {
      &quot;type&quot;: &quot;number&quot;,
      &quot;minimum&quot;: 0,
      &quot;maximum&quot;: 100
    },
    &quot;shippingAddress&quot;: {
      &quot;$ref&quot;: &quot;#/$defs/Address&quot;
    }
  },
  &quot;$defs&quot;: {
    &quot;Address&quot;: {
      &quot;type&quot;: &quot;object&quot;,
      &quot;required&quot;: [&quot;street&quot;, &quot;city&quot;, &quot;country&quot;],
      &quot;properties&quot;: {
        &quot;street&quot;:  { &quot;type&quot;: &quot;string&quot; },
        &quot;city&quot;:    { &quot;type&quot;: &quot;string&quot; },
        &quot;country&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;minLength&quot;: 2, &quot;maxLength&quot;: 2 }
      }
    }
  }
}
</code></pre>
<hr>
<h3 id="33-asyncapi">3.3 AsyncAPI</h3>
<p>OpenAPI equivalent for event-driven / async APIs (Kafka, WebSockets, AMQP).</p>
<pre><code class="language-yaml">
asyncapi: 3.0.0
info:
  title: Order Events API
  version: 1.0.0

channels:
  order/created:
    description: Published when a new order is placed
    messages:
      OrderCreated:
        payload:
          type: object
          properties:
            orderId:    { type: string }
            customerId: { type: string }
            amount:     { type: number }
            createdAt:  { type: string, format: date-time }

  order/status/changed:
    description: Published when order status changes
    messages:
      OrderStatusChanged:
        payload:
          type: object
          properties:
            orderId:   { type: string }
            oldStatus: { type: string }
            newStatus: { type: string }
            changedAt: { type: string, format: date-time }
</code></pre>
<hr>
<h3 id="34-graphql-introspection">3.4 GraphQL Introspection</h3>
<p>GraphQL APIs are self-describing — you can query the schema itself.</p>
<pre><code class="language-graphql">
# List all types in the schema
{
  __schema {
    types {
      name
      kind
      description
    }
  }
}

# Inspect a specific type
{
  __type(name: &quot;Order&quot;) {
    name
    fields {
      name
      type { name kind }
      description
    }
  }
}

# Discover all queries and mutations
{
  __schema {
    queryType    { fields { name description } }
    mutationType { fields { name description } }
  }
}
</code></pre>
<hr>
<h3 id="35-api-discovery-well-known-endpoints">3.5 API Discovery — <code>.well-known</code> Endpoints</h3>
<p>Standardized discovery endpoints:</p>
<pre><code class="language-">
# OpenID Connect discovery
GET /.well-known/openid-configuration

# OAuth Authorization Server Metadata
GET /.well-known/oauth-authorization-server

# API metadata
GET /.well-known/apis.json

# Health check (standard)
GET /health
GET /ready
GET /live
</code></pre>
<p><strong>OpenID Connect discovery response:</strong></p>
<pre><code class="language-json">
{
  &quot;issuer&quot;: &quot;https://auth.company.com&quot;,
  &quot;authorization_endpoint&quot;: &quot;https://auth.company.com/authorize&quot;,
  &quot;token_endpoint&quot;: &quot;https://auth.company.com/token&quot;,
  &quot;userinfo_endpoint&quot;: &quot;https://auth.company.com/userinfo&quot;,
  &quot;jwks_uri&quot;: &quot;https://auth.company.com/.well-known/jwks.json&quot;,
  &quot;scopes_supported&quot;: [&quot;openid&quot;, &quot;profile&quot;, &quot;email&quot;],
  &quot;grant_types_supported&quot;: [&quot;authorization_code&quot;, &quot;client_credentials&quot;]
}
</code></pre>
<hr>
<h2 id="4-batch-async-operations">4. Batch &amp; Async Operations</h2>
<h3 id="41-rest-batch-requests">4.1 REST Batch Requests</h3>
<p>Group multiple operations into a single HTTP call.</p>
<pre><code class="language-json">
POST /api/batch
Content-Type: application/json

{
  &quot;requests&quot;: [
    {
      &quot;id&quot;: &quot;req-1&quot;,
      &quot;method&quot;: &quot;GET&quot;,
      &quot;url&quot;: &quot;/customers/C001&quot;
    },
    {
      &quot;id&quot;: &quot;req-2&quot;,
      &quot;method&quot;: &quot;POST&quot;,
      &quot;url&quot;: &quot;/orders&quot;,
      &quot;body&quot;: { &quot;customerId&quot;: &quot;C001&quot;, &quot;amount&quot;: 500 }
    },
    {
      &quot;id&quot;: &quot;req-3&quot;,
      &quot;method&quot;: &quot;PATCH&quot;,
      &quot;url&quot;: &quot;/orders/ORD-99&quot;,
      &quot;body&quot;: { &quot;status&quot;: &quot;Cancelled&quot; },
      &quot;dependsOn&quot;: [&quot;req-2&quot;]         ← sequential dependency
    }
  ]
}
</code></pre>
<p><strong>Response:</strong></p>
<pre><code class="language-json">
{
  &quot;responses&quot;: [
    { &quot;id&quot;: &quot;req-1&quot;, &quot;status&quot;: 200, &quot;body&quot;: { &quot;customerId&quot;: &quot;C001&quot;, &quot;name&quot;: &quot;Alice&quot; } },
    { &quot;id&quot;: &quot;req-2&quot;, &quot;status&quot;: 201, &quot;body&quot;: { &quot;orderId&quot;: &quot;ORD-101&quot; } },
    { &quot;id&quot;: &quot;req-3&quot;, &quot;status&quot;: 200, &quot;body&quot;: { &quot;status&quot;: &quot;Cancelled&quot; } }
  ]
}
</code></pre>
<hr>
<h3 id="42-async-long-running-operations">4.2 Async / Long-Running Operations</h3>
<p>For operations that take too long for a synchronous response.</p>
<h4 id="pattern-202-accepted-polling">Pattern: 202 Accepted + Polling</h4>
<pre><code class="language-">
# Step 1 — Submit job
POST /api/reports/generate
{
  &quot;reportType&quot;: &quot;annual-sales&quot;,
  &quot;year&quot;: 2024,
  &quot;format&quot;: &quot;xlsx&quot;
}

→ HTTP 202 Accepted
{
  &quot;jobId&quot;: &quot;job-789&quot;,
  &quot;status&quot;: &quot;queued&quot;,
  &quot;statusUrl&quot;: &quot;/api/jobs/job-789&quot;,
  &quot;estimatedSeconds&quot;: 120
}
</code></pre>
<pre><code class="language-">
# Step 2 — Poll status
GET /api/jobs/job-789

→ HTTP 200
{
  &quot;jobId&quot;: &quot;job-789&quot;,
  &quot;status&quot;: &quot;processing&quot;,   ← queued | processing | succeeded | failed
  &quot;progress&quot;: 45,
  &quot;startedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;
}
</code></pre>
<pre><code class="language-">
# Step 3 — Get result when done
GET /api/jobs/job-789

→ HTTP 200
{
  &quot;jobId&quot;: &quot;job-789&quot;,
  &quot;status&quot;: &quot;succeeded&quot;,
  &quot;resultUrl&quot;: &quot;/api/reports/annual-sales-2024.xlsx&quot;,
  &quot;completedAt&quot;: &quot;2024-06-01T10:02:15Z&quot;,
  &quot;expiresAt&quot;: &quot;2024-06-08T10:02:15Z&quot;
}
</code></pre>
<hr>
<h3 id="43-prefer-header-ietf-rfc-7240">4.3 Prefer Header (IETF RFC 7240)</h3>
<p>Clients hint at preferred async behavior:</p>
<pre><code class="language-">
POST /api/data-export
Prefer: respond-async, wait=30

→ If completes within 30s: 200 OK with result
→ If takes longer:         202 Accepted with job link
</code></pre>
<hr>
<h3 id="44-job-queue-patterns">4.4 Job Queue Patterns</h3>
<pre><code class="language-">
Producer → [Queue] → Worker → Result Store
              ↓
         Dead Letter Queue (on failure)
</code></pre>
<p><strong>Message payload example:</strong></p>
<pre><code class="language-json">
{
  &quot;jobId&quot;: &quot;job-789&quot;,
  &quot;type&quot;: &quot;generate-report&quot;,
  &quot;payload&quot;: {
    &quot;reportType&quot;: &quot;annual-sales&quot;,
    &quot;year&quot;: 2024,
    &quot;requestedBy&quot;: &quot;user_123&quot;
  },
  &quot;retryCount&quot;: 0,
  &quot;maxRetries&quot;: 3,
  &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;,
  &quot;priority&quot;: &quot;normal&quot;
}
</code></pre>
<hr>
<h3 id="45-bulk-import-export-apis">4.5 Bulk Import / Export APIs</h3>
<pre><code class="language-">
# Bulk create via array
POST /api/customers/bulk
Content-Type: application/json

{
  &quot;customers&quot;: [
    { &quot;name&quot;: &quot;Alice&quot;, &quot;email&quot;: &quot;alice@co.com&quot; },
    { &quot;name&quot;: &quot;Bob&quot;,   &quot;email&quot;: &quot;bob@co.com&quot;   },
    { &quot;name&quot;: &quot;Carol&quot;, &quot;email&quot;: &quot;carol@co.com&quot; }
  ],
  &quot;options&quot;: {
    &quot;onDuplicate&quot;: &quot;skip&quot;,      ← skip | update | error
    &quot;validateAll&quot;: true          ← fail all if any invalid
  }
}

→ HTTP 207 Multi-Status
{
  &quot;summary&quot;: { &quot;total&quot;: 3, &quot;created&quot;: 2, &quot;skipped&quot;: 1, &quot;failed&quot;: 0 },
  &quot;results&quot;: [
    { &quot;index&quot;: 0, &quot;status&quot;: 201, &quot;id&quot;: &quot;C101&quot; },
    { &quot;index&quot;: 1, &quot;status&quot;: 201, &quot;id&quot;: &quot;C102&quot; },
    { &quot;index&quot;: 2, &quot;status&quot;: 409, &quot;error&quot;: &quot;Email already exists&quot; }
  ]
}
</code></pre>
<hr>
<h3 id="46-idempotency-for-batch-safety">4.6 Idempotency for Batch Safety</h3>
<pre><code class="language-">
POST /api/orders
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000

# If retried with same key → returns original response, no duplicate
</code></pre>
<hr>
<h2 id="5-file-handling-attachments">5. File Handling &amp; Attachments</h2>
<h3 id="51-multipart-upload">5.1 Multipart Upload</h3>
<p>Used to upload files alongside metadata in a single request.</p>
<pre><code class="language-">
POST /api/documents
Content-Type: multipart/form-data; boundary=----boundary123

------boundary123
Content-Disposition: form-data; name=&quot;metadata&quot;
Content-Type: application/json

{
  &quot;title&quot;: &quot;Q4 Sales Report&quot;,
  &quot;category&quot;: &quot;finance&quot;,
  &quot;tags&quot;: [&quot;sales&quot;, &quot;2024&quot;, &quot;quarterly&quot;]
}
------boundary123
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;q4-report.pdf&quot;
Content-Type: application/pdf

&lt;binary PDF data&gt;
------boundary123--
</code></pre>
<p><strong>JavaScript (FormData):</strong></p>
<pre><code class="language-javascript">
const formData = new FormData();
formData.append(&#x27;metadata&#x27;, JSON.stringify({
  title: &#x27;Q4 Sales Report&#x27;,
  category: &#x27;finance&#x27;
}));
formData.append(&#x27;file&#x27;, fileInput.files[0]);

await fetch(&#x27;/api/documents&#x27;, {
  method: &#x27;POST&#x27;,
  headers: { &#x27;Authorization&#x27;: &#96;Bearer ${token}&#96; },
  body: formData
});
</code></pre>
<hr>
<h3 id="52-chunked-resumable-upload">5.2 Chunked / Resumable Upload</h3>
<p>For large files — upload in parts, resume if interrupted.</p>
<pre><code class="language-">
# Step 1 — Initiate upload session
POST /api/upload/initiate
{
  &quot;fileName&quot;: &quot;large-video.mp4&quot;,
  &quot;fileSize&quot;: 524288000,
  &quot;mimeType&quot;: &quot;video/mp4&quot;,
  &quot;chunkSize&quot;: 5242880         ← 5MB chunks
}

→ { &quot;uploadId&quot;: &quot;upload-abc&quot;, &quot;uploadUrl&quot;: &quot;/api/upload/upload-abc&quot; }
</code></pre>
<pre><code class="language-">
# Step 2 — Upload chunks
PUT /api/upload/upload-abc
Content-Range: bytes 0-5242879/524288000
Content-Type: video/mp4

&lt;chunk 1 binary data&gt;

→ { &quot;uploadId&quot;: &quot;upload-abc&quot;, &quot;receivedBytes&quot;: 5242880, &quot;status&quot;: &quot;in_progress&quot; }
</code></pre>
<pre><code class="language-">
# Step 3 — Complete upload
POST /api/upload/upload-abc/complete
{
  &quot;totalChunks&quot;: 100,
  &quot;checksum&quot;: &quot;sha256:abc123...&quot;
}

→ { &quot;fileId&quot;: &quot;file-xyz&quot;, &quot;url&quot;: &quot;/files/file-xyz&quot;, &quot;status&quot;: &quot;processed&quot; }
</code></pre>
<pre><code class="language-">
# Resume interrupted upload
GET /api/upload/upload-abc/status
→ { &quot;receivedBytes&quot;: 15728640 }   ← resume from here
</code></pre>
<hr>
<h3 id="53-pre-signed-urls-secure-direct-uploaddownload">5.3 Pre-signed URLs (Secure Direct Upload/Download)</h3>
<p>Generate a temporary signed URL for direct cloud storage access — bypass your API server.</p>
<pre><code class="language-">
# Request pre-signed upload URL
POST /api/files/upload-url
{
  &quot;fileName&quot;: &quot;profile-photo.jpg&quot;,
  &quot;mimeType&quot;: &quot;image/jpeg&quot;,
  &quot;fileSizeBytes&quot;: 204800
}

→ {
    &quot;uploadUrl&quot;: &quot;https://storage.company.com/uploads/uuid-123?X-Signature=...&quot;,
    &quot;fileId&quot;: &quot;file-uuid-123&quot;,
    &quot;expiresAt&quot;: &quot;2024-06-01T11:00:00Z&quot;
  }
</code></pre>
<pre><code class="language-">
# Client uploads directly to storage (no API server)
PUT https://storage.company.com/uploads/uuid-123?X-Signature=...
Content-Type: image/jpeg

&lt;binary image data&gt;
</code></pre>
<pre><code class="language-">
# Request pre-signed download URL
GET /api/files/file-uuid-123/download-url

→ {
    &quot;downloadUrl&quot;: &quot;https://storage.company.com/files/uuid-123?X-Signature=...&quot;,
    &quot;expiresAt&quot;: &quot;2024-06-01T11:00:00Z&quot;
  }
</code></pre>
<hr>
<h3 id="54-file-metadata-management">5.4 File Metadata &amp; Management</h3>
<pre><code class="language-">
# Get file info
GET /api/files/file-uuid-123
→ {
    &quot;fileId&quot;: &quot;file-uuid-123&quot;,
    &quot;name&quot;: &quot;profile-photo.jpg&quot;,
    &quot;mimeType&quot;: &quot;image/jpeg&quot;,
    &quot;sizeBytes&quot;: 204800,
    &quot;checksum&quot;: &quot;sha256:abc123...&quot;,
    &quot;uploadedBy&quot;: &quot;user_42&quot;,
    &quot;uploadedAt&quot;: &quot;2024-06-01T10:30:00Z&quot;,
    &quot;url&quot;: &quot;/api/files/file-uuid-123/content&quot;
  }

# List files with filters
GET /api/files?category=finance&amp;uploadedAfter=2024-01-01&amp;mimeType=application/pdf

# Delete file
DELETE /api/files/file-uuid-123
→ HTTP 204 No Content

# Download file content
GET /api/files/file-uuid-123/content
→ Content-Type: image/jpeg
  Content-Disposition: attachment; filename=&quot;profile-photo.jpg&quot;
  &lt;binary content&gt;
</code></pre>
<hr>
<h3 id="55-virus-scanning-validation">5.5 Virus Scanning &amp; Validation</h3>
<pre><code class="language-json">
POST /api/files/scan
{
  &quot;fileId&quot;: &quot;file-uuid-123&quot;
}

→ {
    &quot;fileId&quot;: &quot;file-uuid-123&quot;,
    &quot;scanStatus&quot;: &quot;clean&quot;,        ← clean | infected | error
    &quot;scannedAt&quot;: &quot;2024-06-01T10:31:00Z&quot;,
    &quot;engine&quot;: &quot;ClamAV 1.3.0&quot;
  }
</code></pre>
<hr>
<h2 id="6-webhooks-events-real-time">6. Webhooks &amp; Events / Real-Time</h2>
<h3 id="61-webhooks">6.1 Webhooks</h3>
<p>Webhooks are HTTP callbacks — your server pushes events to subscriber URLs when something happens.</p>
<h4 id="webhook-registration">Webhook Registration</h4>
<pre><code class="language-">
POST /api/webhooks
{
  &quot;url&quot;: &quot;https://your-app.com/webhooks/receiver&quot;,
  &quot;events&quot;: [&quot;order.created&quot;, &quot;order.cancelled&quot;, &quot;payment.failed&quot;],
  &quot;secret&quot;: &quot;whsec_your_signing_secret&quot;,
  &quot;active&quot;: true,
  &quot;headers&quot;: {
    &quot;x-custom-header&quot;: &quot;my-app-identifier&quot;
  }
}

→ {
    &quot;webhookId&quot;: &quot;wh-abc123&quot;,
    &quot;status&quot;: &quot;active&quot;,
    &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;
  }
</code></pre>
<h4 id="webhook-event-payload">Webhook Event Payload</h4>
<pre><code class="language-">
POST https://your-app.com/webhooks/receiver
Content-Type: application/json
X-Webhook-ID: wh-abc123
X-Event-Type: order.created
X-Timestamp: 1717228800
X-Signature: sha256=abc123def456...

{
  &quot;eventId&quot;: &quot;evt-xyz789&quot;,
  &quot;eventType&quot;: &quot;order.created&quot;,
  &quot;occurredAt&quot;: &quot;2024-06-01T10:00:00Z&quot;,
  &quot;data&quot;: {
    &quot;orderId&quot;: &quot;ORD-101&quot;,
    &quot;customerId&quot;: &quot;C001&quot;,
    &quot;amount&quot;: 500.00,
    &quot;status&quot;: &quot;Pending&quot;
  }
}
</code></pre>
<h4 id="signature-verification-security-critical">Signature Verification (Security Critical)</h4>
<pre><code class="language-javascript">
const crypto = require(&#x27;crypto&#x27;);

function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac(&#x27;sha256&#x27;, secret)
    .update(payload)
    .digest(&#x27;hex&#x27;);

  const received = signature.replace(&#x27;sha256=&#x27;, &#x27;&#x27;);

  // Use timingSafeEqual to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(received)
  );
}

app.post(&#x27;/webhooks/receiver&#x27;, express.raw({ type: &#x27;application/json&#x27; }), (req, res) =&gt; {
  const sig = req.headers[&#x27;x-signature&#x27;];
  if (!verifyWebhook(req.body, sig, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send(&#x27;Invalid signature&#x27;);
  }

  const event = JSON.parse(req.body);
  // Process event...
  res.status(200).json({ received: true });
});
</code></pre>
<h4 id="webhook-retry-logic-server-side">Webhook Retry Logic (Server-Side)</h4>
<pre><code class="language-">
Delivery attempt 1 → fails → retry after 5s
Delivery attempt 2 → fails → retry after 25s
Delivery attempt 3 → fails → retry after 125s
Delivery attempt 4 → fails → retry after 625s
Delivery attempt 5 → fails → mark as failed, notify owner
</code></pre>
<hr>
<h3 id="62-server-sent-events-sse">6.2 Server-Sent Events (SSE)</h3>
<p>One-way real-time stream from server to browser. Simpler than WebSockets.</p>
<pre><code class="language-">
GET /api/events/live-orders
Accept: text/event-stream

← HTTP 200
Content-Type: text/event-stream
Cache-Control: no-cache

id: 1
event: order.created
data: {&quot;orderId&quot;:&quot;ORD-101&quot;,&quot;amount&quot;:500,&quot;status&quot;:&quot;Pending&quot;}

id: 2
event: order.status.changed
data: {&quot;orderId&quot;:&quot;ORD-99&quot;,&quot;newStatus&quot;:&quot;Completed&quot;}

id: 3
event: heartbeat
data: {}
</code></pre>
<p><strong>JavaScript client:</strong></p>
<pre><code class="language-javascript">
const evtSource = new EventSource(&#x27;/api/events/live-orders&#x27;, {
  headers: { Authorization: &#96;Bearer ${token}&#96; }
});

evtSource.addEventListener(&#x27;order.created&#x27;, (e) =&gt; {
  const order = JSON.parse(e.data);
  console.log(&#x27;New order:&#x27;, order);
});

evtSource.addEventListener(&#x27;error&#x27;, () =&gt; {
  // Browser auto-reconnects using Last-Event-ID header
});
</code></pre>
<hr>
<h3 id="63-websockets">6.3 WebSockets</h3>
<p>Full-duplex, persistent connection. Both client and server can send at any time.</p>
<pre><code class="language-">
# Upgrade to WebSocket
GET /ws/orders
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZQ==
Sec-WebSocket-Version: 13

→ 101 Switching Protocols
</code></pre>
<p><strong>JavaScript (Client):</strong></p>
<pre><code class="language-javascript">
const ws = new WebSocket(&#x27;wss://api.company.com/ws/orders&#x27;);

ws.onopen = () =&gt; {
  // Subscribe to specific events
  ws.send(JSON.stringify({
    action: &#x27;subscribe&#x27;,
    channels: [&#x27;orders&#x27;, &#x27;inventory&#x27;],
    filter: { region: &#x27;EMEA&#x27; }
  }));
};

ws.onmessage = (event) =&gt; {
  const message = JSON.parse(event.data);
  console.log(&#x27;Event:&#x27;, message.type, message.data);
};

ws.onclose = (event) =&gt; {
  // Implement reconnection logic
  setTimeout(() =&gt; reconnect(), 3000);
};
</code></pre>
<hr>
<h3 id="64-long-polling-fallback-pattern">6.4 Long Polling (Fallback Pattern)</h3>
<p>Client immediately re-requests after receiving a response, simulating push behavior.</p>
<pre><code class="language-javascript">
async function longPoll() {
  while (true) {
    try {
      const res = await fetch(&#x27;/api/events/poll?lastEventId=123&amp;timeout=30&#x27;);
      const data = await res.json();

      if (data.events.length &gt; 0) {
        processEvents(data.events);
        lastEventId = data.lastEventId;
      }
    } catch (err) {
      await new Promise(r =&gt; setTimeout(r, 2000));  // backoff on error
    }
  }
}
</code></pre>
<hr>
<h3 id="65-event-schema-standard-cloudevents">6.5 Event Schema Standard (CloudEvents)</h3>
<p>CNCF standard for describing event data in a common format.</p>
<pre><code class="language-json">
{
  &quot;specversion&quot;: &quot;1.0&quot;,
  &quot;id&quot;: &quot;evt-abc123&quot;,
  &quot;source&quot;: &quot;https://orders.company.com&quot;,
  &quot;type&quot;: &quot;com.company.orders.created&quot;,
  &quot;datacontenttype&quot;: &quot;application/json&quot;,
  &quot;time&quot;: &quot;2024-06-01T10:00:00Z&quot;,
  &quot;subject&quot;: &quot;ORD-101&quot;,
  &quot;data&quot;: {
    &quot;orderId&quot;: &quot;ORD-101&quot;,
    &quot;customerId&quot;: &quot;C001&quot;,
    &quot;amount&quot;: 500.00
  }
}
</code></pre>
<hr>
<h3 id="66-real-time-technology-comparison">6.6 Real-Time Technology Comparison</h3>
<table>
<thead><tr>
<th>Technology</th>
<th>Direction</th>
<th>Protocol</th>
<th>Best For</th>
</tr></thead><tbody>
<tr>
<td><strong>Webhooks</strong></td>
<td>Server → Client (push)</td>
<td>HTTP</td>
<td>Event notifications, integrations</td>
</tr>
<tr>
<td><strong>SSE</strong></td>
<td>Server → Client</td>
<td>HTTP</td>
<td>Live feeds, dashboards, logs</td>
</tr>
<tr>
<td><strong>WebSockets</strong></td>
<td>Bidirectional</td>
<td>WS/WSS</td>
<td>Chat, gaming, live collaboration</td>
</tr>
<tr>
<td><strong>Long Polling</strong></td>
<td>Server → Client</td>
<td>HTTP</td>
<td>Fallback when WS/SSE not available</td>
</tr>
<tr>
<td><strong>gRPC Streaming</strong></td>
<td>Bidirectional</td>
<td>HTTP/2</td>
<td>Microservice real-time sync</td>
</tr>
<tr>
<td><strong>Kafka/AMQP</strong></td>
<td>Async messaging</td>
<td>TCP</td>
<td>High-volume event streaming</td>
</tr>
<tr>
<td><strong>GraphQL Subscriptions</strong></td>
<td>Server → Client</td>
<td>WS</td>
<td>Real-time GraphQL data</td>
</tr>
</tbody></table>
<hr>
<h2 id="7-quick-decision-matrix">7. Quick Decision Matrix</h2>
<table>
<thead><tr>
<th>You Need To...</th>
<th>Use This</th>
</tr></thead><tbody>
<tr>
<td>Secure API with user login</td>
<td>OAuth 2.0 + PKCE + JWT</td>
</tr>
<tr>
<td>Secure service-to-service</td>
<td>OAuth 2.0 Client Credentials or mTLS</td>
</tr>
<tr>
<td>Describe your API to others</td>
<td>OpenAPI 3.1 + Swagger UI</td>
</tr>
<tr>
<td>Validate incoming JSON</td>
<td>JSON Schema</td>
</tr>
<tr>
<td>Query data with filters &amp; sorting</td>
<td>REST query params or OData <code>$filter</code></td>
</tr>
<tr>
<td>Flexible nested queries</td>
<td>GraphQL</td>
</tr>
<tr>
<td>Paginate millions of records</td>
<td>Cursor-based pagination</td>
</tr>
<tr>
<td>Run multiple API calls efficiently</td>
<td>Batch API (<code>/batch</code> endpoint)</td>
</tr>
<tr>
<td>Process large exports offline</td>
<td>Async job + polling (<code>202 Accepted</code>)</td>
</tr>
<tr>
<td>Upload a small file</td>
<td>Multipart form-data</td>
</tr>
<tr>
<td>Upload a large file reliably</td>
<td>Chunked / resumable upload</td>
</tr>
<tr>
<td>Serve file downloads securely</td>
<td>Pre-signed URLs</td>
</tr>
<tr>
<td>Notify external system of events</td>
<td>Webhooks</td>
</tr>
<tr>
<td>Push live updates to browser</td>
<td>Server-Sent Events (SSE)</td>
</tr>
<tr>
<td>Full two-way real-time comms</td>
<td>WebSockets</td>
</tr>
<tr>
<td>Standardize events across services</td>
<td>CloudEvents spec</td>
</tr>
<tr>
<td>Document async/event-driven APIs</td>
<td>AsyncAPI</td>
</tr>
</tbody></table>
<hr>
<p><em>Last updated: March 2026</em></p>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = apiFeaturesBeyondOdataContentData;
}
