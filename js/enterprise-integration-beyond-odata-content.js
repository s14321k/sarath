// Enterprise Integration Beyond Odata - Content Data
const enterpriseIntegrationBeyondOdataContentData = `<h1 id="beyond-odata-enterprise-integration-technology-guide">Beyond OData — Enterprise Integration Technology Guide</h1>
<p>A focused guide on GraphQL, REST API best practices, gRPC, and SQL querying in the context of SAP, Microsoft Dynamics, and enterprise integrations.</p>
<hr>
<h2 id="1-graphql">1. GraphQL</h2>
<h3 id="what-is-graphql">What is GraphQL?</h3>
<p>GraphQL is a query language for APIs and a runtime for executing those queries. Developed by Facebook (2015), it gives clients precise control over what data they request — no over-fetching, no under-fetching.</p>
<h3 id="odata-vs-graphql-key-differences">OData vs GraphQL — Key Differences</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>OData</th>
<th>GraphQL</th>
</tr></thead><tbody>
<tr>
<td>Protocol</td>
<td>REST-based</td>
<td>HTTP POST (single endpoint)</td>
</tr>
<tr>
<td>Schema</td>
<td>EDM (XML metadata)</td>
<td>SDL (Schema Definition Language)</td>
</tr>
<tr>
<td>Filtering</td>
<td>URL query params (<code>$filter</code>)</td>
<td>Query arguments</td>
</tr>
<tr>
<td>Typed schema</td>
<td>Yes</td>
<td>Yes (strongly typed)</td>
</tr>
<tr>
<td>Real-time</td>
<td>No (polling only)</td>
<td>Yes (Subscriptions)</td>
</tr>
<tr>
<td>Tooling in SAP/MS</td>
<td>Native (SAP Gateway, Dynamics)</td>
<td>Via custom middleware</td>
</tr>
<tr>
<td>Versioning</td>
<td><code>v1/</code>, <code>v2/</code> in URL</td>
<td>Schema evolution (no versioning)</td>
</tr>
</tbody></table>
<hr>
<h3 id="graphql-query-forms">GraphQL Query Forms</h3>
<h4 id="basic-query">Basic Query</h4>
<pre><code class="language-graphql">
query {
  employees {
    id
    name
    department
    salary
  }
}
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;data&quot;: {
    &quot;employees&quot;: [
      { &quot;id&quot;: 1, &quot;name&quot;: &quot;Alice&quot;, &quot;department&quot;: &quot;IT&quot;, &quot;salary&quot;: 95000 }
    ]
  }
}
</code></pre>
<h4 id="query-with-arguments-filtering">Query with Arguments (Filtering)</h4>
<pre><code class="language-graphql">
query {
  employees(department: &quot;IT&quot;, isActive: true) {
    id
    name
    salary
  }
}
</code></pre>
<h4 id="query-with-variables">Query with Variables</h4>
<pre><code class="language-graphql">
query GetEmployee($id: ID!) {
  employee(id: $id) {
    name
    email
    manager {
      name
    }
  }
}
</code></pre>
<pre><code class="language-json">
{ &quot;id&quot;: &quot;42&quot; }
</code></pre>
<h4 id="nested-relational-query-replaces-expand">Nested / Relational Query (replaces <code>$expand</code>)</h4>
<pre><code class="language-graphql">
query {
  orders(status: &quot;Pending&quot;) {
    orderId
    totalAmount
    customer {
      name
      email
      address {
        city
        country
      }
    }
    items {
      productName
      quantity
      unitPrice
    }
  }
}
</code></pre>
<h4 id="mutations-create-update-delete">Mutations (Create / Update / Delete)</h4>
<pre><code class="language-graphql">
mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    orderId
    status
    createdAt
  }
}
</code></pre>
<h4 id="subscriptions-real-time">Subscriptions (Real-time)</h4>
<pre><code class="language-graphql">
subscription {
  orderStatusChanged(customerId: &quot;C001&quot;) {
    orderId
    newStatus
    updatedAt
  }
}
</code></pre>
<h4 id="fragments-reusable-field-sets">Fragments (Reusable field sets)</h4>
<pre><code class="language-graphql">
fragment EmployeeFields on Employee {
  id
  name
  email
  department
}

query {
  activeEmployees: employees(isActive: true) { ...EmployeeFields }
  newHires: employees(hiredAfter: &quot;2024-01-01&quot;) { ...EmployeeFields }
}
</code></pre>
<h4 id="pagination-in-graphql-cursor-based">Pagination in GraphQL (Cursor-based)</h4>
<pre><code class="language-graphql">
query {
  orders(first: 100, after: &quot;cursor_abc123&quot;) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        orderId
        totalAmount
      }
    }
  }
}
</code></pre>
<hr>
<h3 id="graphql-in-enterprise">GraphQL in Enterprise</h3>
<table>
<thead><tr>
<th>Platform</th>
<th>GraphQL Support</th>
</tr></thead><tbody>
<tr>
<td><strong>SAP</strong></td>
<td>SAP Graph (beta) — unified GraphQL over S/4HANA, SuccessFactors, etc.</td>
</tr>
<tr>
<td><strong>Microsoft</strong></td>
<td>Azure API Management can expose GraphQL; Dynamics via custom layer</td>
</tr>
<tr>
<td><strong>Salesforce</strong></td>
<td>Native GraphQL API (GA since 2022)</td>
</tr>
<tr>
<td><strong>AWS AppSync</strong></td>
<td>Managed GraphQL service</td>
</tr>
</tbody></table>
<blockquote><strong>When to use GraphQL over OData in enterprise:</strong></blockquote>
<blockquote>- Mobile/frontend apps that need flexible, minimal payloads</blockquote>
<blockquote>- Aggregating multiple SAP/Dynamics services behind a single API layer</blockquote>
<blockquote>- Real-time dashboards (via subscriptions)</blockquote>
<hr>
<h2 id="2-rest-api-best-practices">2. REST API Best Practices</h2>
<h3 id="core-rest-principles">Core REST Principles</h3>
<p>REST (Representational State Transfer) is the foundation OData and most enterprise APIs are built on. Understanding REST deeply is critical for SAP/Dynamics integrations.</p>
<h4 id="http-methods">HTTP Methods</h4>
<table>
<thead><tr>
<th>Method</th>
<th>Use</th>
<th>Idempotent</th>
<th>Safe</th>
</tr></thead><tbody>
<tr>
<td><code>GET</code></td>
<td>Read data</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>POST</code></td>
<td>Create resource</td>
<td>❌</td>
<td>❌</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td>Replace full resource</td>
<td>✅</td>
<td>❌</td>
</tr>
<tr>
<td><code>PATCH</code></td>
<td>Partial update</td>
<td>✅</td>
<td>❌</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td>Remove resource</td>
<td>✅</td>
<td>❌</td>
</tr>
</tbody></table>
<hr>
<h3 id="url-design">URL Design</h3>
<pre><code class="language-">
# Good — noun-based, hierarchical
GET    /api/v1/customers
GET    /api/v1/customers/{id}
GET    /api/v1/customers/{id}/orders
POST   /api/v1/customers
PUT    /api/v1/customers/{id}
PATCH  /api/v1/customers/{id}
DELETE /api/v1/customers/{id}

# Bad — verb-based (not REST)
GET    /api/getCustomers
POST   /api/createCustomer
GET    /api/fetchOrdersByCustomer?customerId=5
</code></pre>
<hr>
<h3 id="http-status-codes-enterprise-must-knows">HTTP Status Codes — Enterprise Must-Knows</h3>
<table>
<thead><tr>
<th>Code</th>
<th>Meaning</th>
<th>Use Case</th>
</tr></thead><tbody>
<tr>
<td><code>200</code></td>
<td>OK</td>
<td>Successful GET, PUT, PATCH</td>
</tr>
<tr>
<td><code>201</code></td>
<td>Created</td>
<td>Successful POST</td>
</tr>
<tr>
<td><code>204</code></td>
<td>No Content</td>
<td>Successful DELETE</td>
</tr>
<tr>
<td><code>400</code></td>
<td>Bad Request</td>
<td>Validation error, malformed input</td>
</tr>
<tr>
<td><code>401</code></td>
<td>Unauthorized</td>
<td>Missing/invalid auth token</td>
</tr>
<tr>
<td><code>403</code></td>
<td>Forbidden</td>
<td>Valid token but insufficient permission</td>
</tr>
<tr>
<td><code>404</code></td>
<td>Not Found</td>
<td>Resource doesn&#x27;t exist</td>
</tr>
<tr>
<td><code>409</code></td>
<td>Conflict</td>
<td>Duplicate record, optimistic lock conflict</td>
</tr>
<tr>
<td><code>422</code></td>
<td>Unprocessable Entity</td>
<td>Business rule violation</td>
</tr>
<tr>
<td><code>429</code></td>
<td>Too Many Requests</td>
<td>Rate limit exceeded</td>
</tr>
<tr>
<td><code>500</code></td>
<td>Internal Server Error</td>
<td>Server-side failure</td>
</tr>
<tr>
<td><code>503</code></td>
<td>Service Unavailable</td>
<td>SAP/backend system down</td>
</tr>
</tbody></table>
<hr>
<h3 id="pagination-patterns">Pagination Patterns</h3>
<h4 id="offset-based">Offset-based</h4>
<pre><code class="language-">
GET /orders?page=3&amp;pageSize=50
GET /orders?offset=100&amp;limit=50
</code></pre>
<h4 id="cursor-based-recommended-for-large-data">Cursor-based (recommended for large data)</h4>
<pre><code class="language-">
GET /orders?cursor=eyJpZCI6MjAwfQ==&amp;limit=100
</code></pre>
<p><strong>Response:</strong></p>
<pre><code class="language-json">
{
  &quot;data&quot;: [...],
  &quot;pagination&quot;: {
    &quot;nextCursor&quot;: &quot;eyJpZCI6MzAwfQ==&quot;,
    &quot;hasMore&quot;: true,
    &quot;totalCount&quot;: 15000
  }
}
</code></pre>
<hr>
<h3 id="versioning-strategies">Versioning Strategies</h3>
<table>
<thead><tr>
<th>Strategy</th>
<th>Example</th>
<th>Recommendation</th>
</tr></thead><tbody>
<tr>
<td>URL path</td>
<td><code>/api/v1/orders</code></td>
<td>✅ Most common, easy to test</td>
</tr>
<tr>
<td>Header</td>
<td><code>API-Version: 2024-01-01</code></td>
<td>Used by Azure, Stripe</td>
</tr>
<tr>
<td>Query param</td>
<td><code>/orders?version=2</code></td>
<td>Avoid — pollutes query string</td>
</tr>
<tr>
<td>Content negotiation</td>
<td><code>Accept: application/vnd.api.v2+json</code></td>
<td>Advanced use</td>
</tr>
</tbody></table>
<hr>
<h3 id="authentication-in-enterprise-rest-apis">Authentication in Enterprise REST APIs</h3>
<pre><code class="language-">
# Bearer Token (OAuth 2.0 — most common in SAP/MS)
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...

# API Key
x-api-key: sk-abc123def456

# Basic Auth (legacy, avoid)
Authorization: Basic dXNlcjpwYXNz

# SAP-specific
x-csrf-token: &lt;fetch from HEAD request&gt;
</code></pre>
<p><strong>SAP CSRF Token Flow (required for POST/PUT/DELETE):</strong></p>
<pre><code class="language-">
# Step 1 — Fetch token
HEAD /sap/opu/odata/sap/API_SALES_ORDER_SRV/$metadata
x-csrf-token: Fetch

# Step 2 — Use token in mutation
POST /sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder
x-csrf-token: &lt;returned token&gt;
Cookie: &lt;session cookie from step 1&gt;
</code></pre>
<hr>
<h3 id="idempotency-keys">Idempotency Keys</h3>
<p>For POST requests that should not be duplicated (critical in enterprise):</p>
<pre><code class="language-">
POST /api/v1/payments
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  &quot;amount&quot;: 5000,
  &quot;currency&quot;: &quot;USD&quot;,
  &quot;orderId&quot;: &quot;ORD-789&quot;
}
</code></pre>
<p>If the same <code>Idempotency-Key</code> is sent again, the server returns the original response without creating a duplicate.</p>
<hr>
<h3 id="error-response-standard-rfc-7807-problem-details">Error Response Standard (RFC 7807 — Problem Details)</h3>
<pre><code class="language-json">
{
  &quot;type&quot;: &quot;https://api.example.com/errors/validation-failed&quot;,
  &quot;title&quot;: &quot;Validation Failed&quot;,
  &quot;status&quot;: 422,
  &quot;detail&quot;: &quot;The field &#x27;email&#x27; must be a valid email address.&quot;,
  &quot;instance&quot;: &quot;/api/v1/customers/create&quot;,
  &quot;errors&quot;: {
    &quot;email&quot;: [&quot;Invalid format&quot;],
    &quot;phone&quot;: [&quot;Required field missing&quot;]
  }
}
</code></pre>
<hr>
<h3 id="rate-limiting-headers">Rate Limiting Headers</h3>
<pre><code class="language-">
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 450
X-RateLimit-Reset: 1704067200
Retry-After: 60
</code></pre>
<hr>
<h2 id="3-grpc">3. gRPC</h2>
<h3 id="what-is-grpc">What is gRPC?</h3>
<p>gRPC (Google Remote Procedure Call) is a high-performance, open-source RPC framework using <strong>Protocol Buffers (protobuf)</strong> for serialization and <strong>HTTP/2</strong> for transport. It is significantly faster than REST/OData for internal service-to-service communication.</p>
<h3 id="grpc-vs-odata-vs-rest">gRPC vs OData vs REST</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>gRPC</th>
<th>OData</th>
<th>REST</th>
</tr></thead><tbody>
<tr>
<td>Protocol</td>
<td>HTTP/2</td>
<td>HTTP/1.1 or 2</td>
<td>HTTP/1.1 or 2</td>
</tr>
<tr>
<td>Format</td>
<td>Binary (protobuf)</td>
<td>JSON / XML</td>
<td>JSON / XML</td>
</tr>
<tr>
<td>Schema</td>
<td><code>.proto</code> file</td>
<td><code>$metadata</code> (EDM)</td>
<td>OpenAPI/Swagger</td>
</tr>
<tr>
<td>Streaming</td>
<td>Bi-directional</td>
<td>No</td>
<td>No (SSE only)</td>
</tr>
<tr>
<td>Browser support</td>
<td>Limited (gRPC-Web)</td>
<td>✅ Full</td>
<td>✅ Full</td>
</tr>
<tr>
<td>Speed</td>
<td>⚡ Very fast</td>
<td>Moderate</td>
<td>Moderate</td>
</tr>
<tr>
<td>Human-readable</td>
<td>❌ Binary</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>Code generation</td>
<td>✅ Auto-generated</td>
<td>Partial</td>
<td>Via OpenAPI gen</td>
</tr>
<tr>
<td>Best for</td>
<td>Internal microservices</td>
<td>External/enterprise data APIs</td>
<td>Public APIs</td>
</tr>
</tbody></table>
<hr>
<h3 id="protocol-buffer-definition-proto">Protocol Buffer Definition (<code>.proto</code>)</h3>
<pre><code class="language-protobuf">
syntax = &quot;proto3&quot;;

package enterprise;

service CustomerService {
  rpc GetCustomer (CustomerRequest) returns (CustomerResponse);
  rpc ListCustomers (ListRequest) returns (stream CustomerResponse);
  rpc CreateCustomer (CreateCustomerRequest) returns (CustomerResponse);
  rpc UpdateCustomer (UpdateCustomerRequest) returns (CustomerResponse);
  rpc DeleteCustomer (DeleteCustomerRequest) returns (DeleteResponse);
}

message CustomerRequest {
  string customer_id = 1;
}

message CustomerResponse {
  string customer_id = 1;
  string name = 2;
  string email = 3;
  string department = 4;
  double credit_limit = 5;
}

message ListRequest {
  int32 page_size = 1;
  string page_token = 2;
  string filter = 3;
}

message CreateCustomerRequest {
  string name = 1;
  string email = 2;
  string department = 3;
}

message DeleteRequest {
  string customer_id = 1;
}

message DeleteResponse {
  bool success = 1;
}
</code></pre>
<hr>
<h3 id="grpc-communication-patterns">gRPC Communication Patterns</h3>
<h4 id="1-unary-request-response">1. Unary (Request → Response)</h4>
<pre><code class="language-">
Client ──── request ────► Server
Client ◄─── response ─── Server
</code></pre>
<pre><code class="language-protobuf">
rpc GetCustomer (CustomerRequest) returns (CustomerResponse);
</code></pre>
<h4 id="2-server-side-streaming-one-request-stream-of-responses">2. Server-Side Streaming (one request → stream of responses)</h4>
<pre><code class="language-">
Client ──── request ────► Server
Client ◄─── stream ────── Server (multiple messages)
</code></pre>
<pre><code class="language-protobuf">
rpc ListOrders (ListRequest) returns (stream OrderResponse);
</code></pre>
<p>Best for: <strong>large data export</strong>, real-time feeds, event streams.</p>
<h4 id="3-client-side-streaming-stream-of-requests-one-response">3. Client-Side Streaming (stream of requests → one response)</h4>
<pre><code class="language-">
Client ──── stream ────► Server (multiple messages)
Client ◄─── response ─── Server
</code></pre>
<pre><code class="language-protobuf">
rpc BulkCreateOrders (stream CreateOrderRequest) returns (BulkResponse);
</code></pre>
<p>Best for: <strong>bulk inserts</strong>, file uploads.</p>
<h4 id="4-bidirectional-streaming">4. Bidirectional Streaming</h4>
<pre><code class="language-">
Client ◄──── stream ────► Server (both directions simultaneously)
</code></pre>
<pre><code class="language-protobuf">
rpc SyncInventory (stream InventoryUpdate) returns (stream SyncAck);
</code></pre>
<p>Best for: <strong>real-time sync</strong>, chat, live collaboration.</p>
<hr>
<h3 id="grpc-java-example-spring-boot-grpc">gRPC Java Example (Spring Boot + gRPC)</h3>
<pre><code class="language-java">
// Server implementation
@GrpcService
public class CustomerServiceImpl extends CustomerServiceGrpc.CustomerServiceImplBase {

    @Override
    public void getCustomer(CustomerRequest request, StreamObserver&lt;CustomerResponse&gt; observer) {
        CustomerResponse response = CustomerResponse.newBuilder()
            .setCustomerId(request.getCustomerId())
            .setName(&quot;Alice&quot;)
            .setEmail(&quot;alice@company.com&quot;)
            .setCreditLimit(50000.0)
            .build();

        observer.onNext(response);
        observer.onCompleted();
    }

    // Server streaming for large data
    @Override
    public void listCustomers(ListRequest request, StreamObserver&lt;CustomerResponse&gt; observer) {
        customerRepository.streamAll().forEach(customer -&gt; {
            observer.onNext(toProto(customer));
        });
        observer.onCompleted();
    }
}
</code></pre>
<hr>
<h3 id="grpc-in-enterprise">gRPC in Enterprise</h3>
<table>
<thead><tr>
<th>Platform</th>
<th>gRPC Use</th>
</tr></thead><tbody>
<tr>
<td><strong>SAP BTP</strong></td>
<td>gRPC supported for microservice-to-microservice on Kyma</td>
</tr>
<tr>
<td><strong>Azure</strong></td>
<td>Azure API Management supports gRPC (GA since 2024)</td>
</tr>
<tr>
<td><strong>Google Cloud</strong></td>
<td>Native gRPC support across all services</td>
</tr>
<tr>
<td><strong>Kubernetes</strong></td>
<td>gRPC health checks natively supported</td>
</tr>
</tbody></table>
<blockquote><strong>Use gRPC for:</strong> Internal microservice communication, high-throughput data pipelines, real-time sync between enterprise systems.</blockquote>
<blockquote><strong>Use OData/REST for:</strong> External-facing APIs, browser clients, SAP Gateway, Dynamics Web API.</blockquote>
<hr>
<h2 id="4-sql-query-patterns-for-large-enterprise-data">4. SQL Query Patterns for Large Enterprise Data</h2>
<h3 id="window-functions-analytics-without-group-by-data-loss">Window Functions (Analytics without GROUP BY data loss)</h3>
<pre><code class="language-sql">
-- Running total
SELECT
    OrderId,
    CustomerId,
    Amount,
    SUM(Amount) OVER (PARTITION BY CustomerId ORDER BY OrderDate) AS RunningTotal
FROM Orders;

-- Rank employees by salary within department
SELECT
    Name,
    Department,
    Salary,
    RANK()       OVER (PARTITION BY Department ORDER BY Salary DESC) AS SalaryRank,
    DENSE_RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) AS DenseRank,
    ROW_NUMBER() OVER (PARTITION BY Department ORDER BY Salary DESC) AS RowNum
FROM Employees;

-- Moving average (last 3 months)
SELECT
    Month,
    Revenue,
    AVG(Revenue) OVER (ORDER BY Month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MovingAvg3M
FROM MonthlySales;

-- LAG / LEAD for period-over-period comparison
SELECT
    Month,
    Revenue,
    LAG(Revenue, 1)  OVER (ORDER BY Month) AS PrevMonthRevenue,
    LEAD(Revenue, 1) OVER (ORDER BY Month) AS NextMonthRevenue,
    Revenue - LAG(Revenue, 1) OVER (ORDER BY Month) AS MoMChange
FROM MonthlySales;
</code></pre>
<hr>
<h3 id="ctes-common-table-expressions-readable-complex-queries">CTEs (Common Table Expressions) — Readable Complex Queries</h3>
<pre><code class="language-sql">
WITH
ActiveCustomers AS (
    SELECT CustomerId, Name, Region
    FROM Customers
    WHERE IsActive = 1
),
CustomerOrders AS (
    SELECT CustomerId, COUNT(*) AS OrderCount, SUM(Amount) AS TotalSpend
    FROM Orders
    WHERE YEAR(OrderDate) = 2024
    GROUP BY CustomerId
),
RankedCustomers AS (
    SELECT
        ac.Name,
        ac.Region,
        co.OrderCount,
        co.TotalSpend,
        RANK() OVER (PARTITION BY ac.Region ORDER BY co.TotalSpend DESC) AS RegionRank
    FROM ActiveCustomers ac
    JOIN CustomerOrders co ON ac.CustomerId = co.CustomerId
)
SELECT * FROM RankedCustomers WHERE RegionRank &lt;= 10;
</code></pre>
<hr>
<h3 id="pagination-in-sql">Pagination in SQL</h3>
<pre><code class="language-sql">
-- Offset-based (simple, slow on large tables)
SELECT * FROM Orders
ORDER BY OrderId
OFFSET 10000 ROWS FETCH NEXT 100 ROWS ONLY;

-- Keyset / Cursor pagination (fast, scalable)
SELECT TOP 100 *
FROM Orders
WHERE OrderId &gt; 10000          -- last seen ID
ORDER BY OrderId ASC;

-- For OData $skiptoken — same pattern
-- Store last OrderId, pass as next token
</code></pre>
<hr>
<h3 id="bulk-operations">Bulk Operations</h3>
<pre><code class="language-sql">
-- Bulk insert with VALUES
INSERT INTO StagingOrders (OrderId, CustomerId, Amount, Status)
VALUES
    (1001, &#x27;C01&#x27;, 500.00, &#x27;Pending&#x27;),
    (1002, &#x27;C02&#x27;, 750.00, &#x27;Completed&#x27;),
    (1003, &#x27;C03&#x27;, 300.00, &#x27;Pending&#x27;);

-- INSERT from SELECT (ETL pattern)
INSERT INTO ArchiveOrders
SELECT * FROM Orders
WHERE OrderDate &lt; &#x27;2023-01-01&#x27;;

-- MERGE (Upsert) — critical for SAP/Dynamics sync
MERGE INTO Customers AS target
USING StagingCustomers AS source
    ON target.CustomerId = source.CustomerId
WHEN MATCHED THEN
    UPDATE SET
        target.Name = source.Name,
        target.Email = source.Email,
        target.UpdatedAt = GETDATE()
WHEN NOT MATCHED BY TARGET THEN
    INSERT (CustomerId, Name, Email, CreatedAt)
    VALUES (source.CustomerId, source.Name, source.Email, GETDATE())
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
</code></pre>
<hr>
<h3 id="query-optimization-for-large-data">Query Optimization for Large Data</h3>
<pre><code class="language-sql">
-- Use covering indexes
CREATE INDEX IX_Orders_Status_Date
ON Orders (Status, OrderDate)
INCLUDE (CustomerId, Amount);

-- Avoid SELECT * — always name columns
SELECT OrderId, CustomerId, Amount FROM Orders;  -- Good
SELECT * FROM Orders;                             -- Bad

-- EXISTS is faster than IN for subqueries
SELECT * FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o WHERE o.CustomerId = c.CustomerId
);

-- Partition large tables by date
CREATE PARTITION FUNCTION pf_OrderDate (DATE)
AS RANGE RIGHT FOR VALUES (&#x27;2022-01-01&#x27;, &#x27;2023-01-01&#x27;, &#x27;2024-01-01&#x27;);

-- Query specific partition only
SELECT * FROM Orders
WHERE OrderDate &gt;= &#x27;2024-01-01&#x27; AND OrderDate &lt; &#x27;2025-01-01&#x27;;

-- Batch deletes to avoid log bloat
WHILE 1 = 1
BEGIN
    DELETE TOP (1000) FROM AuditLog WHERE CreatedAt &lt; &#x27;2022-01-01&#x27;;
    IF @@ROWCOUNT = 0 BREAK;
    WAITFOR DELAY &#x27;00:00:01&#x27;;
END
</code></pre>
<hr>
<h2 id="5-enterprise-integration-patterns-eip">5. Enterprise Integration Patterns (EIP)</h2>
<p>Beyond query languages, these patterns are essential for SAP/Dynamics integrations:</p>
<h3 id="key-patterns">Key Patterns</h3>
<table>
<thead><tr>
<th>Pattern</th>
<th>Description</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td><strong>Message Queue</strong></td>
<td>Decouple systems via async messaging</td>
<td>SAP → Azure Service Bus → Dynamics</td>
</tr>
<tr>
<td><strong>Event-Driven</strong></td>
<td>React to state changes</td>
<td>SAP BAPI → Event → downstream sync</td>
</tr>
<tr>
<td><strong>Saga</strong></td>
<td>Distributed transaction across services</td>
<td>Order → Payment → Inventory</td>
</tr>
<tr>
<td><strong>Outbox Pattern</strong></td>
<td>Reliable event publishing with DB</td>
<td>Write to DB + outbox table atomically</td>
</tr>
<tr>
<td><strong>Retry + DLQ</strong></td>
<td>Handle transient failures</td>
<td>Failed messages → Dead Letter Queue</td>
</tr>
<tr>
<td><strong>Circuit Breaker</strong></td>
<td>Stop cascading failures</td>
<td>If SAP is down, fail fast</td>
</tr>
<tr>
<td><strong>API Gateway</strong></td>
<td>Single entry point, auth, rate limiting</td>
<td>Azure APIM, SAP API Management</td>
</tr>
<tr>
<td><strong>Data Mapper</strong></td>
<td>Transform between schemas</td>
<td>SAP IDoc ↔ Dynamics JSON</td>
</tr>
</tbody></table>
<hr>
<h3 id="integration-technology-stack-comparison">Integration Technology Stack Comparison</h3>
<table>
<thead><tr>
<th>Technology</th>
<th>Best For</th>
<th>SAP</th>
<th>Microsoft</th>
</tr></thead><tbody>
<tr>
<td><strong>OData</strong></td>
<td>CRUD APIs, standard queries</td>
<td>✅ Native (Gateway)</td>
<td>✅ Native (Dynamics)</td>
</tr>
<tr>
<td><strong>GraphQL</strong></td>
<td>Flexible queries, frontend</td>
<td>SAP Graph (beta)</td>
<td>Custom layer</td>
</tr>
<tr>
<td><strong>REST</strong></td>
<td>General APIs, public interfaces</td>
<td>✅ SAP BTP APIs</td>
<td>✅ Graph API</td>
</tr>
<tr>
<td><strong>gRPC</strong></td>
<td>Internal microservices, streaming</td>
<td>SAP Kyma</td>
<td>Azure services</td>
</tr>
<tr>
<td><strong>SOAP/WSDL</strong></td>
<td>Legacy ERP integrations</td>
<td>✅ RFC/BAPIs</td>
<td>✅ Legacy Dynamics</td>
</tr>
<tr>
<td><strong>EDI</strong></td>
<td>B2B supply chain</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><strong>Kafka/Event Hub</strong></td>
<td>Real-time event streaming</td>
<td>SAP Event Mesh</td>
<td>Azure Event Hub</td>
</tr>
<tr>
<td><strong>IDOC</strong></td>
<td>SAP-to-SAP native messaging</td>
<td>✅ Native</td>
<td>Via middleware</td>
</tr>
</tbody></table>
<hr>
<h2 id="quick-decision-guide">Quick Decision Guide</h2>
<pre><code class="language-">
Exposing SAP/Dynamics data to a browser app?
  → OData (native support, standardized)

Need flexible queries from a React/mobile app?
  → GraphQL (precise field selection, single endpoint)

Building a public-facing API?
  → REST + OpenAPI spec + versioning

Internal microservice calling another microservice?
  → gRPC (binary, fast, streaming capable)

Real-time data sync between two enterprise systems?
  → gRPC bidirectional streaming OR Kafka/Event Hub

Heavy analytics / reporting on enterprise data?
  → SQL with window functions + $apply in OData

Legacy SAP system integration?
  → SOAP/RFC/BAPI → wrap in REST adapter on SAP BTP
</code></pre>
<hr>
<p><em>Last updated: March 2026</em></p>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = enterpriseIntegrationBeyondOdataContentData;
}
