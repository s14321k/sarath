// Api - Content Data
const apiContentData = `<h1 id="mastering-apis">🧠 Mastering APIs</h1>
<p><img src="pdf/API testing.pdf" alt="API"></p>
<details>
<summary><strong>1. Introduction to APIs</strong></summary>
<p>💡 <strong>Definition of API:</strong>  </p>
<p>An API is a set of rules and protocols that allows different software applications to communicate with each other.</p>
<p>✅️ <strong>Types of APIs:</strong></p>
<ul>
<li><strong>Public:</strong> Openly available for any developers.</li>
<li><strong>Private:</strong> Restricted for internal use within an organization.</li>
<li><strong>Partner:</strong> Shared with specific partners.</li>
<li><strong>Composite APIs:</strong> Combine multiple APIs into one, allowing complex operations to be executed with a single call.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>2. API Architectures</strong></summary>
<p>💡 <strong>Describes different architectural styles for designing APIs:</strong></p>
<ul>
<li><strong>REST:</strong> Representational State Transfer, a widely used architectural style leveraging standard HTTP methods.</li>
<li><strong>GraphQL:</strong> A query language for APIs allowing clients to specify exactly what data they need.</li>
<li><strong>SOAP:</strong> Simple Object Access Protocol, a protocol for exchanging structured information.</li>
<li><strong>gRPC:</strong> A high-performance RPC framework using HTTP/2.</li>
<li><strong>WebSockets:</strong> Enables real-time, two-way communication between client and server.</li>
<li><strong>Webhooks:</strong> Allow servers to send callbacks to clients when events occur.</li>
<li><strong>AMQP:</strong> Advanced Message Queuing Protocol for messaging.</li>
<li><strong>MQTT:</strong> Lightweight messaging protocol for small sensors and devices.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>3. API Security</strong></summary>
<p><img src="../images/SpringBoot/APISecurity.gif" alt="APISecurity"></p>
<p>💡 <strong>Focuses on securing APIs to prevent unauthorized access:</strong></p>
<ul>
<li><strong>Authentication:</strong> Verifies the identity of a user or application.</li>
<li><strong>OAuth:</strong> Standard for token-based authorization.</li>
<li><strong>JWT:</strong> JSON Web Tokens for secure data transmission.</li>
<li><strong>Basic Authentication:</strong> Uses username and password.</li>
<li><strong>Rate Limiting:</strong> Controls the number of API calls a client can make in a certain time.</li>
<li><strong>Encryption:</strong> Secures data in transit using protocols like TLS/SSL.</li>
<li><strong>Authorization:</strong> Ensures that authenticated users have permission to perform specific actions.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>4. API Design Best Practices</strong></summary>
<p>🔧 <strong>Principles to create robust APIs:</strong></p>
<ul>
<li><strong>RESTful Conventions:</strong> Following REST principles for resource design.</li>
<li><strong>Versioning:</strong> Managing API updates without breaking existing clients.</li>
<li><strong>Pagination:</strong> Handling large data sets efficiently.</li>
<li><strong>HATEOAS:</strong> Hypermedia as the engine of application state, guiding clients through available actions.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>5. API Documentation</strong></summary>
<p>💡 <strong>Guides developers on how to use APIs:</strong></p>
<ul>
<li><strong>Swagger:</strong> OpenAPI specification, a powerful tool for API documentation.</li>
<li><strong>Postman:</strong> Platform for testing APIs.</li>
<li><strong>OpenAPI Specification:</strong> Standard that defines how APIs should be described.</li>
<li><strong>Redoc:</strong> API documentation generator.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>6. API Testing</strong></summary>
<p>💡 <strong>Tools and frameworks to test APIs:</strong></p>
<ul>
<li><strong>Postman:</strong> For manual and automated testing.</li>
<li><strong>SoapUI:</strong> Testing SOAP and REST APIs.</li>
<li><strong>Katalon Studio:</strong> Automation testing.</li>
<li><strong>Insomnia:</strong> REST client for debugging APIs.</li>
<li><strong>JMeter:</strong> Performance testing.</li>
<li><strong>Pact:</strong> Consumer-driven contract testing.</li>
<li><strong>Karate:</strong> API testing automation.</li>
<li><strong>Rest-Assured:</strong> Java library for testing REST services.</li>
<li><strong>Newman:</strong> CLI agent for Postman collections.</li>
<li><strong>Cypress:</strong> End-to-end testing.</li>
</ul>
</details>
<p><img src="../images/SpringBoot/Mastering%20API.gif" alt="Mastering API"></p>
<p><img src="../images/SpringBoot/EncodingVsEncryVsTokerniz.gif" alt="images/SpringBoot/EncodingVsEncryVsTokerniz.gif"></p>
<p><img src="images/API/cookiVSsession.jpg" alt="cookyVsSession"></p>
<h1 id="rest-api-rules-principles-guidelines">🌐 REST API – Rules, Principles &amp; Guidelines</h1>
<h2 id="1-core-rest-principles-architectural-constraints">1️⃣ Core REST Principles (Architectural Constraints)</h2>
<p>These are <strong>mandatory rules</strong> for an API to be truly RESTful.</p>
<h3 id="1-clientserver-separation">1. Client–Server Separation</h3>
<ul>
<li>Client UI and server logic are <strong>independent</strong></li>
<li>Improves scalability and portability</li>
</ul>
<p>✅ Example</p>
<p>Frontend → React</p>
<p>Backend → Spring Boot REST API</p>
<hr>
<h3 id="2-statelessness-most-important">2. Statelessness (MOST IMPORTANT)</h3>
<ul>
<li>Each request must contain <strong>all required information</strong></li>
<li>Server <strong>must not store client session</strong></li>
</ul>
<p>❌ Bad</p>
<pre><code class="language-http">
GET /orders
</code></pre>
<p>✅ Good</p>
<pre><code class="language-http">
GET /orders
Authorization: Bearer &lt;token&gt;
</code></pre>
<hr>
<h3 id="3-cacheability">3. Cacheability</h3>
<ul>
<li>Responses must define whether they are cacheable</li>
<li>Improves performance and reduces server load</li>
</ul>
<pre><code class="language-http">
Cache-Control: max-age=3600
ETag: &quot;v3&quot;
</code></pre>
<hr>
<h3 id="4-uniform-interface">4. Uniform Interface</h3>
<p>Consistent rules across all APIs:</p>
<ul>
<li>Resource identification</li>
<li>HTTP methods</li>
<li>Status codes</li>
<li>Media types (JSON)</li>
</ul>
<hr>
<h3 id="5-layered-system">5. Layered System</h3>
<ul>
<li>Client doesn’t know if it talks to:</li>
</ul>
<ul>
<li>API Gateway</li>
<li>Load Balancer</li>
<li>Microservice</li>
</ul>
<hr>
<h3 id="6-code-on-demand-optional">6. Code on Demand (Optional)</h3>
<ul>
<li>Server can send executable code (JS)</li>
<li>Rarely used</li>
</ul>
<hr>
<h2 id="2-resource-design-rules">2️⃣ Resource Design Rules</h2>
<h3 id="1-use-nouns-not-verbs">1. Use <strong>Nouns</strong>, Not Verbs</h3>
<p>❌ Bad</p>
<pre><code class="language-">
/getUsers
/createOrder
</code></pre>
<p>✅ Good</p>
<pre><code class="language-">
/users
/orders
</code></pre>
<hr>
<h3 id="2-use-plural-resource-names">2. Use Plural Resource Names</h3>
<pre><code class="language-">
/users
/orders
/products
</code></pre>
<hr>
<h3 id="3-hierarchical-resources">3. Hierarchical Resources</h3>
<pre><code class="language-">
/users/{userId}/orders/{orderId}
</code></pre>
<hr>
<h2 id="3-http-method-rules-idempotency-included">3️⃣ HTTP Method Rules (Idempotency Included)</h2>
<ul>
<li><strong>Safe</strong> → Does <strong>not change server state</strong></li>
<li><strong>Idempotent</strong> → Multiple identical requests have <strong>same effect as one</strong></li>
</ul>
<p>Here is the <strong>refactored, clean, exam-ready version</strong> with an added <strong>“Purpose”</strong> column, keeping everything <strong>accurate, non-repetitive, and clear</strong>.</p>
<hr>
<h2 id="http-methods-safety-idempotency-purpose">🧭 HTTP Methods – Safety, Idempotency &amp; Purpose</h2>
<p><strong>Definitions (read once):</strong></p>
<ul>
<li><strong>Safe</strong> → Does <strong>not change server state</strong></li>
<li><strong>Idempotent</strong> → Multiple identical requests have the <strong>same effect as one</strong></li>
</ul>
<hr>
<h3 id="http-methods-comparison-table">📋 HTTP Methods Comparison Table</h3>
<table>
<thead><tr>
<th>HTTP Method</th>
<th>Safe</th>
<th>Idempotent</th>
<th>Purpose</th>
<th>Why</th>
</tr></thead><tbody>
<tr>
<td><strong>GET</strong></td>
<td>✅ Yes</td>
<td>✅ Yes</td>
<td>Retrieve resource data</td>
<td>Only reads data</td>
</tr>
<tr>
<td><strong>HEAD</strong></td>
<td>✅ Yes</td>
<td>✅ Yes</td>
<td>Retrieve headers only</td>
<td>Same as GET, without body</td>
</tr>
<tr>
<td><strong>OPTIONS</strong></td>
<td>✅ Yes</td>
<td>✅ Yes</td>
<td>Discover supported operations</td>
<td>Metadata only</td>
</tr>
<tr>
<td><strong>PUT</strong></td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>Create or fully replace a resource</td>
<td>Same request results in same state</td>
</tr>
<tr>
<td><strong>DELETE</strong></td>
<td>❌ No</td>
<td>✅ Yes</td>
<td>Remove a resource</td>
<td>Repeated deletes have no additional effect</td>
</tr>
<tr>
<td><strong>POST</strong></td>
<td>❌ No</td>
<td>❌ No</td>
<td>Create a new resource or trigger processing</td>
<td>Each request creates a new outcome</td>
</tr>
<tr>
<td><strong>PATCH</strong></td>
<td>❌ No</td>
<td>❌ No</td>
<td>Partially update a resource</td>
<td>Repeating may produce different results</td>
</tr>
</tbody></table>
<hr>
<h3 id="key-exam-interview-notes">🧠 Key Exam &amp; Interview Notes</h3>
<ul>
<li><strong>All Safe methods are Idempotent</strong></li>
<li><strong>POST is neither Safe nor Idempotent</strong></li>
<li><strong>PUT vs PATCH</strong></li>
</ul>
<ul>
<li><code>PUT</code> → Full replacement (Idempotent)</li>
<li><code>PATCH</code> → Partial update (Not guaranteed Idempotent)</li>
</ul>
<ul>
<li><strong>DELETE is Idempotent but not Safe</strong></li>
</ul>
<hr>
<h3 id="one-line-memory-trick">🎯 One-Line Memory Trick</h3>
<blockquote><strong>GET / HEAD / OPTIONS → Safe + Idempotent</strong></blockquote>
<blockquote><strong>PUT / DELETE → Not Safe, but Idempotent</strong></blockquote>
<blockquote><strong>POST / PATCH → Neither Safe nor Idempotent</strong></blockquote>
<hr>
<h3 id="real-world-usage-tip">📌 Real-World Usage Tip</h3>
<ul>
<li>Use <strong>GET</strong> for reads</li>
<li>Use <strong>PUT</strong> when client knows full resource</li>
<li>Use <strong>PATCH</strong> for partial updates</li>
<li>Use <strong>POST</strong> for creation or actions</li>
<li>Use <strong>Idempotency-Key</strong> for POST (payments, orders)</li>
</ul>
<h2 id="one-line-memory-trick">🧠 One-Line Memory Trick</h2>
<blockquote><strong>Safe = Read only</strong></blockquote>
<blockquote><strong>Idempotent = Repeat without side effects</strong></blockquote>
<hr>
<h2 id="visual-ascii-summary">🔁 Visual ASCII Summary</h2>
<pre><code class="language-">
            SAFE?
              |
     YES ---------------- NO
      |                   |
 GET, HEAD, OPTIONS     PUT, DELETE
                          |
                    Idempotent
                          |
                   POST, PATCH ❌
</code></pre>
<p><img src="../images/API/PaymentAPI.png" alt="Payment Idempotency"></p>
<h1 id="idempotency-in-microservices-why-it-matters-more-than-you-think">🔁 Idempotency in Microservices — Why It Matters More Than You Think</h1>
<p>In <strong>microservices architectures</strong>, failures are normal.</p>
<p>Networks fail.  </p>
<p>Services retry.  </p>
<p>Users click buttons twice.</p>
<p>That’s exactly why <strong>idempotency</strong> is not a “nice to have” — it’s <strong>critical</strong>.</p>
<hr>
<h2 id="what-is-idempotency">🧠 What Is Idempotency?</h2>
<details>
<summary><strong>Click to expand</strong></summary>
<p><strong>Idempotency</strong> means:</p>
<blockquote>If the same request is sent multiple times, the outcome should be the same as if it were sent only once.</blockquote>
<p>No duplicate side effects.  </p>
<p>No unexpected behavior.</p>
</details>
<hr>
<h2 id="why-idempotency-matters-in-real-systems">❓ Why Idempotency Matters in Real Systems</h2>
<details>
<summary><strong>Real-world failure scenarios</strong></summary>
<p>In production systems:</p>
<ul>
<li>APIs are retried automatically</li>
<li>Clients may resend requests</li>
<li>API gateways may timeout and retry</li>
<li>Messages can be delivered more than once</li>
<li>Distributed systems are <em>eventually consistent</em></li>
</ul>
<p>❌ Without idempotency → <strong>duplicate actions happen</strong></p>
</details>
<hr>
<h2 id="real-time-example-payment-service">💳 Real-Time Example: Payment Service</h2>
<details>
<summary><strong>What can go wrong?</strong></summary>
<h3 id="scenario">Scenario:</h3>
<ul>
<li>User clicks <strong>“Pay ₹5,000”</strong></li>
<li>Payment service processes the request</li>
<li>Network timeout occurs</li>
<li>Client retries the same request</li>
</ul>
<p>👉 If the service is <strong>not idempotent</strong>:</p>
<ul>
<li>Payment is processed <strong>twice</strong></li>
<li>User is charged <strong>₹10,000 😨</strong></li>
</ul>
<p>This is one of the most common and dangerous production bugs.</p>
</details>
<hr>
<h2 id="how-idempotency-solves-this-problem">✅ How Idempotency Solves This Problem</h2>
<details>
<summary><strong>Idempotency in action</strong></summary>
<h3 id="step-by-step-solution">Step-by-step solution:</h3>
<ul>
<li>Client sends a <strong>unique Idempotency Key</strong>  </li>
</ul>
<p>  <em>(example: <code>txn-123</code>)</em></p>
<ul>
<li>Payment service stores:</li>
<li>Idempotency key</li>
<li>Request result</li>
<li>When the same request arrives again:</li>
<li>Service detects the duplicate key</li>
<li>Returns the <strong>previous response</strong></li>
<li>❌ Does NOT charge again</li>
</ul>
</details>
<hr>
<h2 id="result">🎯 Result</h2>
<details>
<summary><strong>What you gain</strong></summary>
<ul>
<li>✅ One payment</li>
<li>✅ Safe retries</li>
<li>✅ No duplicate charges</li>
<li>✅ Happy customers</li>
</ul>
</details>
<hr>
<h2 id="apis-that-must-be-idempotent">📌 APIs That MUST Be Idempotent</h2>
<details>
<summary><strong>Critical use cases</strong></summary>
<p>Idempotency is mandatory for:</p>
<ul>
<li>Payments</li>
<li>Order creation</li>
<li>Inventory updates</li>
<li>Refunds</li>
<li>Message processing (Kafka, SQS, RabbitMQ, etc.)</li>
</ul>
<p>Anywhere retries can happen → idempotency is required.</p>
</details>
<hr>
<h2 id="key-takeaway">🧩 Key Takeaway</h2>
<details>
<summary><strong>Final thoughts</strong></summary>
<p>Retries are unavoidable in microservices.  </p>
<p>Duplicate side effects are <strong>not</strong>.</p>
<p>If your API can be retried:</p>
<p><strong>Idempotency is not optional — it’s mandatory.</strong></p>
</details>
<h1 id="idempotency-in-microservices-why-it-matters-more-than-you-think">🔁 Idempotency in Microservices — Why It Matters More Than You Think</h1>
<p>In microservices, failures are normal.  </p>
<p>Networks fail. Services retry. Clients double-click.</p>
<p>That’s why <strong>idempotency is mandatory, not optional</strong>.</p>
<hr>
<h2 id="what-is-idempotency">🧠 What Is Idempotency?</h2>
<details>
<summary><strong>Concept</strong></summary>
<p><strong>Idempotency</strong> means:</p>
<blockquote>Sending the same request multiple times produces the same result as sending it once.</blockquote>
<p>No duplicate side effects.  </p>
<p>No inconsistent state.</p>
</details>
<hr>
<h2 id="why-idempotency-is-critical">🔄 Why Idempotency Is Critical</h2>
<details>
<summary><strong>Real-world realities</strong></summary>
<ul>
<li>APIs retry automatically  </li>
<li>Clients resend requests  </li>
<li>Gateways timeout and retry  </li>
<li>Messages can be delivered more than once  </li>
<li>Distributed systems are unreliable by nature  </li>
</ul>
<p>❌ Without idempotency → <strong>duplicate actions happen</strong></p>
</details>
<hr>
<h2 id="payment-service-example-problem">💳 Payment Service Example (Problem)</h2>
<details>
<summary><strong>Failure scenario</strong></summary>
<ul>
<li>User clicks <strong>Pay ₹5,000</strong></li>
<li>Payment service processes the request</li>
<li>Network timeout occurs</li>
<li>Client retries the same request</li>
</ul>
<p>👉 Without idempotency → <strong>₹10,000 charged</strong></p>
</details>
<hr>
<h2 id="sequence-diagram-without-idempotency">🧭 Sequence Diagram — Without Idempotency</h2>
<details>
<summary><strong>Duplicate payment flow</strong></summary>
<div class="mermaid">
sequenceDiagram
    participant Client
    participant PaymentService
    participant Bank

    Client-&gt;&gt;PaymentService: Pay ₹5000
    PaymentService-&gt;&gt;Bank: Charge ₹5000
    Bank--&gt;&gt;PaymentService: Success
    PaymentService--&gt;&gt;Client: Timeout

    Client-&gt;&gt;PaymentService: Retry Pay ₹5000
    PaymentService-&gt;&gt;Bank: Charge ₹5000
    Bank--&gt;&gt;PaymentService: Success
    PaymentService--&gt;&gt;Client: Success
</div>
<p>❌ Result: <strong>Two charges</strong></p>
</details>
<hr>
<h2 id="how-idempotency-fixes-this">✅ How Idempotency Fixes This</h2>
<details>
<summary><strong>Key idea</strong></summary>
<ul>
<li>Client sends an <strong>Idempotency Key</strong></li>
<li>Service stores the key + response</li>
<li>Duplicate request → return cached response</li>
<li>No duplicate side effects</li>
</ul>
</details>
<hr>
<h2 id="sequence-diagram-with-idempotency">🧭 Sequence Diagram — With Idempotency</h2>
<details>
<summary><strong>Safe retry flow</strong></summary>
<div class="mermaid">
sequenceDiagram
    participant Client
    participant PaymentService
    participant DB
    participant Bank

    Client-&gt;&gt;PaymentService: Pay ₹5000 (key=txn-123)
    PaymentService-&gt;&gt;DB: Check key txn-123
    DB--&gt;&gt;PaymentService: Not found
    PaymentService-&gt;&gt;Bank: Charge ₹5000
    Bank--&gt;&gt;PaymentService: Success
    PaymentService-&gt;&gt;DB: Store key + result
    PaymentService--&gt;&gt;Client: Success

    Client-&gt;&gt;PaymentService: Retry Pay ₹5000 (key=txn-123)
    PaymentService-&gt;&gt;DB: Check key txn-123
    DB--&gt;&gt;PaymentService: Found
    PaymentService--&gt;&gt;Client: Previous success response
</div>
<p>✅ Result: <strong>One charge, safe retry</strong></p>
</details>
<hr>
<h2 id="rest-api-idempotent-payment-example">🧩 REST API — Idempotent Payment Example</h2>
<details>
<summary><strong>REST API implementation</strong></summary>
<h3 id="request">Request</h3>
<pre><code class="language-http">
POST /payments
Idempotency-Key: txn-123
Content-Type: application/json

{
  &quot;amount&quot;: 5000,
  &quot;currency&quot;: &quot;INR&quot;,
  &quot;userId&quot;: &quot;u-101&quot;
}
</code></pre>
<h3 id="backend-logic-pseudo-code">Backend Logic (Pseudo-Code)</h3>
<pre><code class="language-java">
public PaymentResponse createPayment(Request request, String key) {
    Optional&lt;PaymentRecord&gt; existing = repo.findByKey(key);

    if (existing.isPresent()) {
        return existing.get().getResponse();
    }

    PaymentResult result = bank.charge(request);
    repo.save(key, result);

    return result;
}
</code></pre>
<h3 id="database-table-example">Database Table (Example)</h3>
<pre><code class="language-text">
idempotency_key | response | created_at
--------------------------------------
txn-123         | SUCCESS  | 2026-01-18
</code></pre>
</details>
<hr>
<h2 id="kafka-message-queue-idempotent-consumer">📦 Kafka / Message Queue — Idempotent Consumer</h2>
<details>
<summary><strong>Kafka consumer example</strong></summary>
<h3 id="problem">Problem</h3>
<p>Kafka guarantees <strong>at-least-once delivery</strong></p>
<p>→ Messages <strong>can be processed more than once</strong></p>
<h3 id="solution-idempotent-consumer">Solution: Idempotent Consumer</h3>
<pre><code class="language-java">
@KafkaListener(topics = &quot;payments&quot;)
public void processPayment(PaymentEvent event) {

    if (processedEventRepo.exists(event.getEventId())) {
        return; // duplicate message
    }

    process(event);
    processedEventRepo.save(event.getEventId());
}
</code></pre>
<h3 id="storage-for-deduplication">Storage for Deduplication</h3>
<ul>
<li>Database table</li>
<li>Redis</li>
<li>DynamoDB</li>
</ul>
<pre><code class="language-text">
event_id     | processed_at
----------------------------
evt-789      | 2026-01-18
</code></pre>
</details>
<hr>
<h2 id="apis-that-must-be-idempotent">📌 APIs That MUST Be Idempotent</h2>
<details>
<summary><strong>Non-negotiable use cases</strong></summary>
<ul>
<li>Payments</li>
<li>Order creation</li>
<li>Inventory updates</li>
<li>Refunds</li>
<li>Kafka / queue consumers</li>
<li>Webhooks</li>
</ul>
<p>Anywhere retries exist → idempotency is required.</p>
</details>
<hr>
<h2 id="final-takeaway">🏁 Final Takeaway</h2>
<details>
<summary><strong>Key lesson</strong></summary>
<p>Retries are unavoidable in microservices.</p>
<p>Duplicate side effects are <strong>not</strong>.</p>
<p>If your API can be retried,</p>
<p><strong>Idempotency is mandatory — not optional.</strong></p>
</details>
<h2 id="ttl-strategies-for-idempotency-keys-production-grade">⏳ TTL Strategies for Idempotency Keys (Production-Grade)</h2>
<p>Idempotency keys <strong>cannot live forever</strong>.</p>
<p>Without proper TTL (Time-To-Live), systems become slower, costlier, and harder to maintain.</p>
<p>The goal:</p>
<blockquote>Keep idempotency data <strong>long enough to handle retries</strong>, but <strong>not forever</strong>.</blockquote>
<hr>
<h2 id="why-ttl-is-important">🎯 Why TTL Is Important</h2>
<details>
<summary><strong>Problems without TTL</strong></summary>
<ul>
<li>Infinite growth of idempotency tables</li>
<li>Higher storage and query costs</li>
<li>Slower lookups</li>
<li>Harder operational cleanup</li>
<li>Compliance &amp; data retention issues</li>
</ul>
<p>TTL keeps idempotency <strong>safe, efficient, and scalable</strong>.</p>
</details>
<hr>
<h2 id="core-ttl-design-principles">🧠 Core TTL Design Principles</h2>
<details>
<summary><strong>Golden rules</strong></summary>
<ul>
<li>TTL must be <strong>longer than the maximum retry window</strong></li>
<li>TTL depends on <strong>business criticality</strong></li>
<li>High-risk actions → longer TTL</li>
<li>Low-risk actions → shorter TTL</li>
<li>TTL should be <strong>configurable</strong>, not hardcoded</li>
</ul>
</details>
<hr>
<h2 id="common-ttl-strategies">⏱️ Common TTL Strategies</h2>
<h3 id="1-fixed-ttl-most-common">1️⃣ Fixed TTL (Most Common)</h3>
<details>
<summary><strong>Simple & effective</strong></summary>
<ul>
<li>Assign a fixed expiration time to idempotency keys</li>
<li>Example:</li>
<li>Payments → 24 hours</li>
<li>Orders → 12 hours</li>
<li>Inventory updates → 1 hour</li>
</ul>
<p><strong>Pros</strong></p>
<ul>
<li>Simple implementation</li>
<li>Easy to reason about</li>
</ul>
<p><strong>Cons</strong></p>
<ul>
<li>May keep data longer than needed</li>
</ul>
</details>
<hr>
<h3 id="2-retry-window-based-ttl-best-practice">2️⃣ Retry-Window-Based TTL (Best Practice)</h3>
<details>
<summary><strong>TTL tied to retry behavior</strong></summary>
<p>TTL = <strong>Max retry duration + safety buffer</strong></p>
<p>Example:</p>
<ul>
<li>Client retries for 30 minutes</li>
<li>Gateway retries for 10 minutes</li>
<li>Add 2× buffer</li>
</ul>
<p>➡ TTL ≈ <strong>2 hours</strong></p>
<p><strong>Pros</strong></p>
<ul>
<li>Efficient storage</li>
<li>Aligns with real retry patterns</li>
</ul>
<p><strong>Cons</strong></p>
<ul>
<li>Requires understanding retry policies</li>
</ul>
</details>
<hr>
<h3 id="3-state-based-ttl-advanced">3️⃣ State-Based TTL (Advanced)</h3>
<details>
<summary><strong>Different TTL per state</strong></summary>
<p>TTL varies based on request outcome:</p>
<table>
<thead><tr>
<th>State</th>
<th>TTL Example</th>
</tr></thead><tbody>
<tr>
<td>SUCCESS</td>
<td>24 hours</td>
</tr>
<tr>
<td>FAILED</td>
<td>5 minutes</td>
</tr>
<tr>
<td>PENDING</td>
<td>1 hour</td>
</tr>
</tbody></table>
<p><strong>Why?</strong></p>
<ul>
<li>Failures retry quickly</li>
<li>Success needs longer protection</li>
</ul>
<p><strong>Pros</strong></p>
<ul>
<li>Optimized storage</li>
<li>Business-aware logic</li>
</ul>
<p><strong>Cons</strong></p>
<ul>
<li>More complex implementation</li>
</ul>
</details>
<hr>
<h3 id="4-sliding-ttl-rare-but-useful">4️⃣ Sliding TTL (Rare but Useful)</h3>
<details>
<summary><strong>TTL extends on retry</strong></summary>
<ul>
<li>TTL resets every time the same idempotency key is received</li>
<li>Useful for long-running or async workflows</li>
</ul>
<p><strong>Pros</strong></p>
<ul>
<li>Handles delayed retries well</li>
</ul>
<p><strong>Cons</strong></p>
<ul>
<li>Risk of keys never expiring</li>
<li>Requires max TTL cap</li>
</ul>
</details>
<hr>
<h3 id="5-permanent-archival-high-risk-systems">5️⃣ Permanent + Archival (High-Risk Systems)</h3>
<details>
<summary><strong>Financial-grade systems</strong></summary>
<ul>
<li>Store idempotency records permanently</li>
<li>Move older records to cold storage (S3)</li>
</ul>
<p>Used for:</p>
<ul>
<li>Banking</li>
<li>Ledger systems</li>
<li>Regulatory compliance</li>
</ul>
<p><strong>Pros</strong></p>
<ul>
<li>Full audit trail</li>
<li>Zero risk of duplicate financial actions</li>
</ul>
<p><strong>Cons</strong></p>
<ul>
<li>Higher storage cost</li>
<li>Requires archival strategy</li>
</ul>
</details>
<hr>
<h2 id="ttl-by-storage-type">🗄️ TTL by Storage Type</h2>
<details>
<summary><strong>Where TTL is enforced</strong></summary>
<h3 id="redis">Redis</h3>
<ul>
<li>Native TTL support</li>
<li>Ideal for short-lived keys (minutes → hours)</li>
</ul>
<pre><code class="language-text">
SET txn-123 response EX 7200
</code></pre>
<h3 id="dynamodb">DynamoDB</h3>
<ul>
<li>Native TTL attribute</li>
<li>Auto cleanup by AWS</li>
</ul>
<pre><code class="language-text">
ttl = epoch_timestamp
</code></pre>
<h3 id="sql-databases">SQL Databases</h3>
<ul>
<li>Scheduled cleanup jobs</li>
<li>Index on <code>created_at</code></li>
</ul>
<pre><code class="language-sql">
DELETE FROM idempotency_keys
WHERE created_at &lt; NOW() - INTERVAL &#x27;24 hours&#x27;;
</code></pre>
<h2 id="recommended-ttls-real-world-defaults">🧭 Recommended TTLs (Real-World Defaults)</h2>
<summary><strong>Production-ready guidance</strong></summary>
<table>
<thead><tr>
<th>Use Case</th>
<th>Recommended TTL</th>
</tr></thead><tbody>
<tr>
<td>Payments</td>
<td>24–72 hours</td>
</tr>
<tr>
<td>Orders</td>
<td>12–24 hours</td>
</tr>
<tr>
<td>Refunds</td>
<td>48–72 hours</td>
</tr>
<tr>
<td>Inventory updates</td>
<td>1–6 hours</td>
</tr>
<tr>
<td>Webhooks</td>
<td>24 hours</td>
</tr>
<tr>
<td>Kafka consumers</td>
<td>1–7 days</td>
</tr>
</tbody></table>
<h2 id="common-ttl-mistakes">⚠️ Common TTL Mistakes</h2>
<summary><strong>What to avoid</strong></summary>
<ul>
<li>TTL shorter than retry window ❌</li>
<li>No TTL at all ❌</li>
<li>Hardcoded TTL values ❌</li>
<li>Same TTL for all APIs ❌</li>
<li>Not monitoring TTL cleanup ❌</li>
</ul>
<hr>
<h2 id="final-rule-of-thumb">🏁 Final Rule of Thumb</h2>
<blockquote>TTL should outlive retries — not business records.</blockquote>
<p>Retries are temporary.</p>
<p>Idempotency protection should be too.</p>
<p>Design TTLs deliberately, and your microservices will scale safely.</p>
</details>
<hr>
<h2 id="4-http-status-code-guidelines">4️⃣ HTTP Status Code Guidelines</h2>
<h2 id="1xx-informational">🔵 1xx — Informational</h2>
<table>
<thead><tr>
<th>Status Code</th>
<th>Name</th>
<th>Purpose / Meaning</th>
</tr></thead><tbody>
<tr>
<td><strong>100</strong></td>
<td>Continue</td>
<td>Initial part of request received; client may continue</td>
</tr>
<tr>
<td><strong>101</strong></td>
<td>Switching Protocols</td>
<td>Server is switching protocols (HTTP → WebSocket)</td>
</tr>
<tr>
<td><strong>102</strong></td>
<td>Processing</td>
<td>Request accepted but processing not completed (WebDAV)</td>
</tr>
<tr>
<td><strong>103</strong></td>
<td>Early Hints</td>
<td>Preload resources before final response (performance)</td>
</tr>
</tbody></table>
<hr>
<h2 id="2xx-success">🟢 2xx — Success</h2>
<table>
<thead><tr>
<th>Status Code</th>
<th>Name</th>
<th>Purpose / Meaning</th>
</tr></thead><tbody>
<tr>
<td><strong>200</strong></td>
<td>OK</td>
<td>Request succeeded</td>
</tr>
<tr>
<td><strong>201</strong></td>
<td>Created</td>
<td>Resource successfully created</td>
</tr>
<tr>
<td><strong>202</strong></td>
<td>Accepted</td>
<td>Request accepted but processed asynchronously</td>
</tr>
<tr>
<td><strong>203</strong></td>
<td>Non-Authoritative Information</td>
<td>Metadata modified by proxy</td>
</tr>
<tr>
<td><strong>204</strong></td>
<td>No Content</td>
<td>Success with no response body</td>
</tr>
<tr>
<td><strong>205</strong></td>
<td>Reset Content</td>
<td>Client should reset the view/form</td>
</tr>
<tr>
<td><strong>206</strong></td>
<td>Partial Content</td>
<td>Partial response (range requests, streaming)</td>
</tr>
<tr>
<td><strong>207</strong></td>
<td>Multi-Status</td>
<td>Multiple independent status codes (WebDAV)</td>
</tr>
<tr>
<td><strong>208</strong></td>
<td>Already Reported</td>
<td>Resource already included in response (WebDAV)</td>
</tr>
<tr>
<td><strong>226</strong></td>
<td>IM Used</td>
<td>Delta encoding / instance manipulation (rare)</td>
</tr>
</tbody></table>
<hr>
<h2 id="3xx-redirection">🟡 3xx — Redirection</h2>
<table>
<thead><tr>
<th>Status Code</th>
<th>Name</th>
<th>Purpose / Meaning</th>
</tr></thead><tbody>
<tr>
<td><strong>300</strong></td>
<td>Multiple Choices</td>
<td>Multiple representations available</td>
</tr>
<tr>
<td><strong>301</strong></td>
<td>Moved Permanently</td>
<td>Permanent redirect (SEO friendly)</td>
</tr>
<tr>
<td><strong>302</strong></td>
<td>Found</td>
<td>Temporary redirect</td>
</tr>
<tr>
<td><strong>303</strong></td>
<td>See Other</td>
<td>Redirect after POST → GET</td>
</tr>
<tr>
<td><strong>304</strong></td>
<td>Not Modified</td>
<td>Cached version still valid</td>
</tr>
<tr>
<td><strong>305</strong></td>
<td>Use Proxy</td>
<td>Must use proxy (deprecated)</td>
</tr>
<tr>
<td><strong>306</strong></td>
<td>Unused</td>
<td>Reserved</td>
</tr>
<tr>
<td><strong>307</strong></td>
<td>Temporary Redirect</td>
<td>Redirect without changing HTTP method</td>
</tr>
<tr>
<td><strong>308</strong></td>
<td>Permanent Redirect</td>
<td>Permanent redirect without changing method</td>
</tr>
</tbody></table>
<hr>
<h2 id="4xx-client-errors">🟠 4xx — Client Errors</h2>
<table>
<thead><tr>
<th>Status Code</th>
<th>Name</th>
<th>Purpose / Meaning</th>
</tr></thead><tbody>
<tr>
<td><strong>400</strong></td>
<td>Bad Request</td>
<td>Invalid request syntax or validation error</td>
</tr>
<tr>
<td><strong>401</strong></td>
<td>Unauthorized</td>
<td>Authentication required or failed</td>
</tr>
<tr>
<td><strong>402</strong></td>
<td>Payment Required</td>
<td>Reserved (sometimes billing/quota APIs)</td>
</tr>
<tr>
<td><strong>403</strong></td>
<td>Forbidden</td>
<td>Access denied</td>
</tr>
<tr>
<td><strong>404</strong></td>
<td>Not Found</td>
<td>Resource not found</td>
</tr>
<tr>
<td><strong>405</strong></td>
<td>Method Not Allowed</td>
<td>HTTP method not supported</td>
</tr>
<tr>
<td><strong>406</strong></td>
<td>Not Acceptable</td>
<td>Requested format not supported</td>
</tr>
<tr>
<td><strong>407</strong></td>
<td>Proxy Authentication Required</td>
<td>Proxy authentication required</td>
</tr>
<tr>
<td><strong>408</strong></td>
<td>Request Timeout</td>
<td>Client took too long</td>
</tr>
<tr>
<td><strong>409</strong></td>
<td>Conflict</td>
<td>Request conflicts with current state</td>
</tr>
<tr>
<td><strong>410</strong></td>
<td>Gone</td>
<td>Resource permanently removed</td>
</tr>
<tr>
<td><strong>411</strong></td>
<td>Length Required</td>
<td>Missing <code>Content-Length</code></td>
</tr>
<tr>
<td><strong>412</strong></td>
<td>Precondition Failed</td>
<td>Conditional headers failed</td>
</tr>
<tr>
<td><strong>413</strong></td>
<td>Payload Too Large</td>
<td>Request body too large</td>
</tr>
<tr>
<td><strong>414</strong></td>
<td>URI Too Long</td>
<td>URL too long</td>
</tr>
<tr>
<td><strong>415</strong></td>
<td>Unsupported Media Type</td>
<td>Unsupported content type</td>
</tr>
<tr>
<td><strong>416</strong></td>
<td>Range Not Satisfiable</td>
<td>Invalid range request</td>
</tr>
<tr>
<td><strong>417</strong></td>
<td>Expectation Failed</td>
<td>Cannot meet <code>Expect</code> header</td>
</tr>
<tr>
<td><strong>418</strong></td>
<td>I’m a teapot</td>
<td>Joke status (RFC 2324 😂)</td>
</tr>
<tr>
<td><strong>421</strong></td>
<td>Misdirected Request</td>
<td>Wrong server</td>
</tr>
<tr>
<td><strong>422</strong></td>
<td>Unprocessable Entity</td>
<td>Validation error</td>
</tr>
<tr>
<td><strong>423</strong></td>
<td>Locked</td>
<td>Resource locked (WebDAV)</td>
</tr>
<tr>
<td><strong>424</strong></td>
<td>Failed Dependency</td>
<td>Previous request failure (WebDAV)</td>
</tr>
<tr>
<td><strong>425</strong></td>
<td>Too Early</td>
<td>Replay request risk</td>
</tr>
<tr>
<td><strong>426</strong></td>
<td>Upgrade Required</td>
<td>Protocol upgrade required</td>
</tr>
<tr>
<td><strong>428</strong></td>
<td>Precondition Required</td>
<td>Prevent race conditions</td>
</tr>
<tr>
<td><strong>429</strong></td>
<td>Too Many Requests</td>
<td>Rate limiting</td>
</tr>
<tr>
<td><strong>431</strong></td>
<td>Request Header Fields Too Large</td>
<td>Headers too large</td>
</tr>
<tr>
<td><strong>451</strong></td>
<td>Unavailable For Legal Reasons</td>
<td>Legal restriction</td>
</tr>
</tbody></table>
<hr>
<h2 id="5xx-server-errors">🔴 5xx — Server Errors</h2>
<table>
<thead><tr>
<th>Status Code</th>
<th>Name</th>
<th>Purpose / Meaning</th>
</tr></thead><tbody>
<tr>
<td><strong>500</strong></td>
<td>Internal Server Error</td>
<td>Generic server failure</td>
</tr>
<tr>
<td><strong>501</strong></td>
<td>Not Implemented</td>
<td>Feature not supported</td>
</tr>
<tr>
<td><strong>502</strong></td>
<td>Bad Gateway</td>
<td>Invalid upstream response</td>
</tr>
<tr>
<td><strong>503</strong></td>
<td>Service Unavailable</td>
<td>Server overloaded/down</td>
</tr>
<tr>
<td><strong>504</strong></td>
<td>Gateway Timeout</td>
<td>Upstream timeout</td>
</tr>
<tr>
<td><strong>505</strong></td>
<td>HTTP Version Not Supported</td>
<td>Unsupported HTTP version</td>
</tr>
<tr>
<td><strong>506</strong></td>
<td>Variant Also Negotiates</td>
<td>Content negotiation error</td>
</tr>
<tr>
<td><strong>507</strong></td>
<td>Insufficient Storage</td>
<td>Storage exhausted (WebDAV)</td>
</tr>
<tr>
<td><strong>508</strong></td>
<td>Loop Detected</td>
<td>Infinite loop detected</td>
</tr>
<tr>
<td><strong>510</strong></td>
<td>Not Extended</td>
<td>Extension required</td>
</tr>
<tr>
<td><strong>511</strong></td>
<td>Network Authentication Required</td>
<td>Network login required</td>
</tr>
</tbody></table>
<hr>
<h2 id="5-request-response-design">5️⃣ Request &amp; Response Design</h2>
<h3 id="use-json-standard">Use JSON (Standard)</h3>
<pre><code class="language-http">
Content-Type: application/json
</code></pre>
<hr>
<h3 id="consistent-response-structure">Consistent Response Structure</h3>
<pre><code class="language-json">
{
  &quot;success&quot;: true,
  &quot;data&quot;: {},
  &quot;error&quot;: null,
  &quot;timestamp&quot;: &quot;2026-01-12T10:30:00Z&quot;
}
</code></pre>
<hr>
<h3 id="use-meaningful-error-responses">Use Meaningful Error Responses</h3>
<pre><code class="language-json">
{
  &quot;errorCode&quot;: &quot;ORDER_NOT_FOUND&quot;,
  &quot;message&quot;: &quot;Order 123 does not exist&quot;
}
</code></pre>
<hr>
<h2 id="6-versioning-rules">6️⃣ Versioning Rules</h2>
<h3 id="preferred-url-versioning">Preferred (URL Versioning)</h3>
<pre><code class="language-">
/api/v1/orders
/api/v2/orders
</code></pre>
<p>Other options:</p>
<ul>
<li>Header-based</li>
<li>Media type versioning</li>
</ul>
<hr>
<h2 id="7-pagination-sorting-filtering">7️⃣ Pagination, Sorting &amp; Filtering</h2>
<h3 id="pagination">Pagination</h3>
<pre><code class="language-">
GET /orders?page=1&amp;size=20
</code></pre>
<h3 id="sorting">Sorting</h3>
<pre><code class="language-">
GET /orders?sort=createdAt,desc
</code></pre>
<h3 id="filtering">Filtering</h3>
<pre><code class="language-">
GET /orders?status=PAID&amp;amount&gt;1000
</code></pre>
<hr>
<h2 id="8-security-guidelines">8️⃣ Security Guidelines</h2>
<h3 id="authentication">Authentication</h3>
<ul>
<li>OAuth2 / JWT / API Keys</li>
</ul>
<pre><code class="language-http">
Authorization: Bearer &lt;token&gt;
</code></pre>
<hr>
<h3 id="authorization">Authorization</h3>
<ul>
<li>Role-based access (RBAC)</li>
<li>Scope-based access</li>
</ul>
<hr>
<h3 id="https-mandatory">HTTPS Mandatory</h3>
<p>❌ HTTP</p>
<p>✅ HTTPS</p>
<hr>
<h2 id="9-idempotency-reliability">9️⃣ Idempotency &amp; Reliability</h2>
<h3 id="use-idempotency-keys-for-post">Use Idempotency Keys for POST</h3>
<pre><code class="language-http">
Idempotency-Key: uuid
</code></pre>
<p>Prevents duplicate operations (payments, orders)</p>
<hr>
<h3 id="use-timeouts-retries">Use Timeouts &amp; Retries</h3>
<ul>
<li>Client retries</li>
<li>Server handles duplicates safely</li>
</ul>
<hr>
<h2 id="concurrency-consistency">🔟 Concurrency &amp; Consistency</h2>
<h3 id="optimistic-locking-with-etag">Optimistic Locking with ETag</h3>
<pre><code class="language-http">
If-Match: &quot;v3&quot;
</code></pre>
<p>Prevents lost updates</p>
<hr>
<h2 id="11-naming-formatting-rules">1️⃣1️⃣ Naming &amp; Formatting Rules</h2>
<ul>
<li>camelCase for JSON fields</li>
<li>kebab-case for URLs</li>
<li>ISO-8601 for dates</li>
</ul>
<pre><code class="language-json">
&quot;createdAt&quot;: &quot;2026-01-12T10:30:00Z&quot;
</code></pre>
<hr>
<h2 id="12-logging-tracing-monitoring">1️⃣2️⃣ Logging, Tracing &amp; Monitoring</h2>
<h3 id="request-id">Request ID</h3>
<pre><code class="language-http">
X-Request-ID: abc-123
</code></pre>
<p>Used for distributed tracing</p>
<hr>
<h2 id="13-documentation-rules">1️⃣3️⃣ Documentation Rules</h2>
<ul>
<li>OpenAPI / Swagger</li>
<li>Examples for each API</li>
<li>Clear error definitions</li>
</ul>
<hr>
<h2 id="14-common-rest-anti-patterns">1️⃣4️⃣ Common REST Anti-Patterns ❌</h2>
<table>
<thead><tr>
<th>Anti-Pattern</th>
<th>Why Bad</th>
</tr></thead><tbody>
<tr>
<td>Using verbs in URLs</td>
<td>Breaks REST</td>
</tr>
<tr>
<td>Returning 200 for errors</td>
<td>Confusing</td>
</tr>
<tr>
<td>Chatty APIs</td>
<td>Performance issues</td>
</tr>
<tr>
<td>Breaking statelessness</td>
<td>Scalability issues</td>
</tr>
</tbody></table>
<hr>
<h2 id="rest-api-golden-rules-interview-favorite">✅ REST API GOLDEN RULES (Interview Favorite)</h2>
<blockquote>✔ Stateless</blockquote>
<blockquote>✔ Resource-based</blockquote>
<blockquote>✔ Proper HTTP methods</blockquote>
<blockquote>✔ Correct status codes</blockquote>
<blockquote>✔ Consistent responses</blockquote>
<blockquote>✔ Secure by default</blockquote>
<hr>
<h2 id="one-line-summary">🧠 One-Line Summary</h2>
<blockquote><strong>REST is not just JSON over HTTP — it is a disciplined contract using HTTP semantics correctly.</strong></blockquote>
<hr>
<h1 id="top-6-api-styles-choosing-the-best-fit-for-your-project">Top 6 API Styles: Choosing the Best Fit for Your Project</h1>
<p>APIs are the backbone of modern software, enabling smooth integration and communication between systems. Here’s a look at the top six API architecture styles and when to use each:</p>
<p><a href="../images/SpringBoot/TOP6API.gif">Top6Api</a></p>
<hr>
<h3 id="1-soap-simple-object-access-protocol">1. <strong>SOAP (Simple Object Access Protocol)</strong></h3>
<p><strong>Best for:</strong> Enterprise applications needing a standardized, secure protocol.  </p>
<p>SOAP offers strong typing and robust security features, making it ideal for complex and regulated environments.</p>
<hr>
<h3 id="2-restful-representational-state-transfer">2. <strong>RESTful (Representational State Transfer)</strong></h3>
<p><strong>Best for:</strong> Web services, especially public-facing applications.  </p>
<p>It prioritizes simplicity and scalability with a stateless, resource-oriented design that enables efficient client-server communication.</p>
<hr>
<h3 id="3-graphql">3. <strong>GraphQL</strong></h3>
<p><strong>Best for:</strong> Scenarios requiring flexible, client-driven data retrieval.  </p>
<p>Clients can specify exactly what data they need, reducing over-fetching and under-fetching, and optimizing performance.</p>
<hr>
<h3 id="4-grpc">4. <strong>gRPC</strong></h3>
<p><strong>Best for:</strong> High-performance, low-latency communication in microservices architectures.  </p>
<p>It supports efficient serialization and bi-directional streaming, making it ideal for real-time apps and distributed systems.</p>
<hr>
<h3 id="5-websockets">5. <strong>WebSockets</strong></h3>
<p><strong>Best for:</strong> Real-time, bidirectional communication (e.g., chat apps, online gaming).  </p>
<p>Persistent connections allow instant data updates and seamless user interaction.</p>
<hr>
<h3 id="6-webhooks">6. <strong>Webhooks</strong></h3>
<p><strong>Best for:</strong> Event-driven systems.  </p>
<p>They let applications react to events in real time, making them perfect for notifications and automated actions.</p>
<hr>
<h3 id="conclusion">🧭 <strong>Conclusion</strong></h3>
<p>Choosing the right API style enhances <strong>performance</strong>, <strong>scalability</strong>, and <strong>user experience</strong> by aligning architectural strengths with project needs.</p>
<hr>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = apiContentData;
}
