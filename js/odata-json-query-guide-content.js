// Odata Json Query Guide - Content Data
const odataJsonQueryGuideContentData = `<h1 id="odata-json-query-complete-guide">OData JSON Query — Complete Guide</h1>
<p>A comprehensive reference for all OData query forms using JSON format, including strategies for handling large datasets efficiently.</p>
<hr>
<h2 id="what-is-odata">What is OData?</h2>
<p><strong>OData (Open Data Protocol)</strong> is a standardized REST-based protocol for querying and manipulating data. It defines URL conventions, query options, and JSON/XML response formats. OData is widely used in SAP, Microsoft (Azure, Dynamics, Power BI), and enterprise APIs.</p>
<ul>
<li>Current version: <strong>OData v4.0</strong> (ISO/IEC 20802)</li>
<li>Default format: <strong>JSON</strong> (<code>application/json</code>)</li>
<li>Base URL pattern: <code>https://api.example.com/v1/EntitySet</code></li>
</ul>
<hr>
<h2 id="odata-json-response-structure">OData JSON Response Structure</h2>
<p>Every OData JSON response follows this envelope:</p>
<pre><code class="language-json">
{
  &quot;@odata.context&quot;: &quot;https://api.example.com/v1/$metadata#EntitySet&quot;,
  &quot;@odata.count&quot;: 1500,
  &quot;@odata.nextLink&quot;: &quot;https://api.example.com/v1/EntitySet?$skip=100&quot;,
  &quot;value&quot;: [
    {
      &quot;Id&quot;: 1,
      &quot;Name&quot;: &quot;Alice&quot;,
      &quot;Age&quot;: 30
    }
  ]
}
</code></pre>
<table>
<thead><tr>
<th>Property</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>@odata.context</code></td>
<td>Metadata URL describing the entity type</td>
</tr>
<tr>
<td><code>@odata.count</code></td>
<td>Total record count (when <code>$count=true</code>)</td>
</tr>
<tr>
<td><code>@odata.nextLink</code></td>
<td>URL to fetch the next page of results</td>
</tr>
<tr>
<td><code>@odata.etag</code></td>
<td>Optimistic concurrency token</td>
</tr>
<tr>
<td><code>value</code></td>
<td>Array of result entities</td>
</tr>
</tbody></table>
<hr>
<h2 id="all-odata-query-options">All OData Query Options</h2>
<hr>
<h3 id="1-filter-filter-records">1. <code>$filter</code> — Filter Records</h3>
<p>Restricts the set of returned records based on conditions.</p>
<h4 id="basic-operators">Basic Operators</h4>
<pre><code class="language-">
GET /Employees?$filter=Department eq &#x27;HR&#x27;
GET /Employees?$filter=Age gt 30
GET /Employees?$filter=Salary le 80000
GET /Employees?$filter=IsActive ne false
</code></pre>
<h4 id="logical-operators">Logical Operators</h4>
<pre><code class="language-">
GET /Employees?$filter=Age gt 25 and Department eq &#x27;IT&#x27;
GET /Employees?$filter=Department eq &#x27;HR&#x27; or Department eq &#x27;Finance&#x27;
GET /Employees?$filter=not (IsActive eq false)
</code></pre>
<h4 id="string-functions">String Functions</h4>
<pre><code class="language-">
GET /Employees?$filter=startswith(Name, &#x27;Al&#x27;)
GET /Employees?$filter=endswith(Email, &#x27;@company.com&#x27;)
GET /Employees?$filter=contains(Description, &#x27;senior&#x27;)
GET /Employees?$filter=toupper(Name) eq &#x27;ALICE&#x27;
GET /Employees?$filter=tolower(City) eq &#x27;london&#x27;
GET /Employees?$filter=length(Name) gt 5
GET /Employees?$filter=indexof(Name, &#x27;ice&#x27;) eq 2
GET /Employees?$filter=substring(Name, 0, 3) eq &#x27;Ali&#x27;
GET /Employees?$filter=trim(Name) eq &#x27;Alice&#x27;
GET /Employees?$filter=concat(FirstName, LastName) eq &#x27;AliceSmith&#x27;
</code></pre>
<h4 id="date-time-functions">Date &amp; Time Functions</h4>
<pre><code class="language-">
GET /Orders?$filter=year(OrderDate) eq 2024
GET /Orders?$filter=month(OrderDate) eq 6
GET /Orders?$filter=day(OrderDate) eq 15
GET /Orders?$filter=hour(CreatedAt) ge 9
GET /Orders?$filter=minute(CreatedAt) lt 30
GET /Orders?$filter=now() gt DeliveryDate
GET /Orders?$filter=date(CreatedAt) eq 2024-01-15
GET /Orders?$filter=time(CreatedAt) ge 08:00:00
</code></pre>
<h4 id="math-functions">Math Functions</h4>
<pre><code class="language-">
GET /Products?$filter=round(Price) eq 100
GET /Products?$filter=floor(Price) eq 99
GET /Products?$filter=ceiling(Price) eq 100
GET /Products?$filter=abs(Discount) gt 5
</code></pre>
<h4 id="collection-functions-odata-v4">Collection Functions (OData v4)</h4>
<pre><code class="language-">
# any() - at least one item matches
GET /Orders?$filter=Items/any(i: i/Price gt 100)

# all() - all items must match
GET /Orders?$filter=Items/all(i: i/Quantity gt 0)

# Nested any with condition
GET /Customers?$filter=Orders/any(o: o/Status eq &#x27;Pending&#x27;)
</code></pre>
<h4 id="in-operator-odata-v401"><code>in</code> Operator (OData v4.01)</h4>
<pre><code class="language-">
GET /Employees?$filter=Department in (&#x27;HR&#x27;, &#x27;IT&#x27;, &#x27;Finance&#x27;)
GET /Products?$filter=Id in (1, 2, 3, 5, 8)
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;@odata.context&quot;: &quot;...$metadata#Employees&quot;,
  &quot;value&quot;: [
    { &quot;Id&quot;: 1, &quot;Name&quot;: &quot;Alice&quot;, &quot;Department&quot;: &quot;HR&quot; },
    { &quot;Id&quot;: 3, &quot;Name&quot;: &quot;Bob&quot;, &quot;Department&quot;: &quot;IT&quot; }
  ]
}
</code></pre>
<hr>
<h3 id="2-select-select-specific-fields">2. <code>$select</code> — Select Specific Fields</h3>
<p>Returns only specified properties, reducing payload size.</p>
<pre><code class="language-">
GET /Employees?$select=Id,Name,Email
GET /Products?$select=Id,Name,Price,Category
GET /Orders?$select=OrderId,CustomerName,TotalAmount,Status
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;@odata.context&quot;: &quot;...$metadata#Employees(Id,Name,Email)&quot;,
  &quot;value&quot;: [
    { &quot;Id&quot;: 1, &quot;Name&quot;: &quot;Alice&quot;, &quot;Email&quot;: &quot;alice@company.com&quot; },
    { &quot;Id&quot;: 2, &quot;Name&quot;: &quot;Bob&quot;,   &quot;Email&quot;: &quot;bob@company.com&quot; }
  ]
}
</code></pre>
<blockquote><strong>Best Practice for Large Data:</strong> Always use <code>$select</code> to avoid over-fetching unused fields.</blockquote>
<hr>
<h3 id="3-orderby-sort-results">3. <code>$orderby</code> — Sort Results</h3>
<p>Sorts the result set by one or more fields.</p>
<pre><code class="language-">
# Ascending (default)
GET /Employees?$orderby=Name

# Descending
GET /Employees?$orderby=Salary desc

# Multiple fields
GET /Employees?$orderby=Department asc, Salary desc

# Order by nested property
GET /Orders?$orderby=Customer/Name asc
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;value&quot;: [
    { &quot;Id&quot;: 3, &quot;Name&quot;: &quot;Alice&quot;, &quot;Salary&quot;: 95000 },
    { &quot;Id&quot;: 1, &quot;Name&quot;: &quot;Bob&quot;,   &quot;Salary&quot;: 85000 }
  ]
}
</code></pre>
<hr>
<h3 id="4-top-limit-results">4. <code>$top</code> — Limit Results</h3>
<p>Returns only the first N records.</p>
<pre><code class="language-">
GET /Products?$top=10
GET /Employees?$top=5&amp;$orderby=Salary desc
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;@odata.context&quot;: &quot;...$metadata#Products&quot;,
  &quot;value&quot;: [
    { &quot;Id&quot;: 1, &quot;Name&quot;: &quot;Laptop&quot;,  &quot;Price&quot;: 1200 },
    { &quot;Id&quot;: 2, &quot;Name&quot;: &quot;Monitor&quot;, &quot;Price&quot;: 400 }
  ]
}
</code></pre>
<hr>
<h3 id="5-skip-skip-records-offset">5. <code>$skip</code> — Skip Records (Offset)</h3>
<p>Skips the first N records. Used with <code>$top</code> for pagination.</p>
<pre><code class="language-">
GET /Products?$skip=20&amp;$top=10     → Page 3 (records 21–30)
GET /Products?$skip=0&amp;$top=10      → Page 1
GET /Products?$skip=10&amp;$top=10     → Page 2
</code></pre>
<hr>
<h3 id="6-count-total-record-count">6. <code>$count</code> — Total Record Count</h3>
<p>Returns the total number of matching records.</p>
<pre><code class="language-">
# Inline count with results
GET /Employees?$count=true

# Count only (no data)
GET /Employees/$count
</code></pre>
<p><strong>JSON Response (inline):</strong></p>
<pre><code class="language-json">
{
  &quot;@odata.context&quot;: &quot;...$metadata#Employees&quot;,
  &quot;@odata.count&quot;: 1523,
  &quot;value&quot;: [
    { &quot;Id&quot;: 1, &quot;Name&quot;: &quot;Alice&quot; }
  ]
}
</code></pre>
<p><strong>JSON Response (count only):</strong></p>
<pre><code class="language-">
1523
</code></pre>
<hr>
<h3 id="7-expand-expand-related-entities">7. <code>$expand</code> — Expand Related Entities</h3>
<p>Fetches related entities inline (like SQL JOIN).</p>
<pre><code class="language-">
# Expand single navigation property
GET /Orders?$expand=Customer

# Expand multiple
GET /Orders?$expand=Customer,Items

# Nested expand
GET /Orders?$expand=Customer($expand=Address)

# Expand with select
GET /Orders?$expand=Customer($select=Name,Email)

# Expand with filter
GET /Orders?$expand=Items($filter=Price gt 50)

# Expand with orderby and top
GET /Orders?$expand=Items($orderby=Price desc;$top=3)
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;value&quot;: [
    {
      &quot;OrderId&quot;: 101,
      &quot;Total&quot;: 500,
      &quot;Customer&quot;: {
        &quot;CustomerId&quot;: 1,
        &quot;Name&quot;: &quot;Alice&quot;,
        &quot;Email&quot;: &quot;alice@example.com&quot;
      },
      &quot;Items&quot;: [
        { &quot;ItemId&quot;: 1, &quot;Product&quot;: &quot;Laptop&quot;, &quot;Price&quot;: 450 },
        { &quot;ItemId&quot;: 2, &quot;Product&quot;: &quot;Mouse&quot;,  &quot;Price&quot;: 50  }
      ]
    }
  ]
}
</code></pre>
<hr>
<h3 id="8-search-full-text-search">8. <code>$search</code> — Full-Text Search</h3>
<p>Performs a free-text search across searchable properties.</p>
<pre><code class="language-">
GET /Products?$search=laptop
GET /Articles?$search=&quot;machine learning&quot;
GET /Employees?$search=Alice AND developer
GET /Employees?$search=Alice OR Bob
GET /Employees?$search=NOT intern
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;value&quot;: [
    { &quot;Id&quot;: 5, &quot;Name&quot;: &quot;MacBook Laptop Pro&quot;, &quot;Category&quot;: &quot;Electronics&quot; },
    { &quot;Id&quot;: 9, &quot;Name&quot;: &quot;Gaming Laptop&quot;,      &quot;Category&quot;: &quot;Electronics&quot; }
  ]
}
</code></pre>
<blockquote>Note: <code>$search</code> support depends on the OData service implementation. Not all servers support it.</blockquote>
<hr>
<h3 id="9-apply-aggregation-transformation">9. <code>$apply</code> — Aggregation &amp; Transformation</h3>
<p>Applies transformations like grouping, aggregation, and filtering on result sets (OData v4).</p>
<h4 id="groupby"><code>groupby</code></h4>
<pre><code class="language-">
GET /Sales?$apply=groupby((Region), aggregate(Amount with sum as TotalSales))
GET /Orders?$apply=groupby((Status), aggregate($count as OrderCount))
GET /Products?$apply=groupby((Category), aggregate(Price with average as AvgPrice))
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;value&quot;: [
    { &quot;Region&quot;: &quot;North&quot;, &quot;TotalSales&quot;: 150000 },
    { &quot;Region&quot;: &quot;South&quot;, &quot;TotalSales&quot;: 98000  },
    { &quot;Region&quot;: &quot;East&quot;,  &quot;TotalSales&quot;: 210000 }
  ]
}
</code></pre>
<h4 id="aggregate"><code>aggregate</code></h4>
<pre><code class="language-">
GET /Orders?$apply=aggregate(Amount with sum as Total)
GET /Products?$apply=aggregate(Price with min as MinPrice, Price with max as MaxPrice)
GET /Employees?$apply=aggregate($count as TotalEmployees)
</code></pre>
<h4 id="filter-inside-apply"><code>filter</code> inside <code>$apply</code></h4>
<pre><code class="language-">
GET /Orders?$apply=filter(Status eq &#x27;Completed&#x27;)/aggregate(Amount with sum as Total)
</code></pre>
<h4 id="chaining-transformations">Chaining transformations</h4>
<pre><code class="language-">
GET /Sales?$apply=
  filter(Year eq 2024)/
  groupby((Region,Quarter), aggregate(Revenue with sum as TotalRevenue))/
  orderby(TotalRevenue desc)
</code></pre>
<h4 id="aggregate-functions">Aggregate functions</h4>
<table>
<thead><tr>
<th>Function</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>sum</code></td>
<td>Sum of values</td>
</tr>
<tr>
<td><code>min</code></td>
<td>Minimum value</td>
</tr>
<tr>
<td><code>max</code></td>
<td>Maximum value</td>
</tr>
<tr>
<td><code>average</code></td>
<td>Average value</td>
</tr>
<tr>
<td><code>countdistinct</code></td>
<td>Count of distinct values</td>
</tr>
<tr>
<td><code>$count</code></td>
<td>Total row count</td>
</tr>
</tbody></table>
<hr>
<h3 id="10-format-response-format">10. <code>$format</code> — Response Format</h3>
<p>Specifies the response content type.</p>
<pre><code class="language-">
GET /Employees?$format=json
GET /Employees?$format=application/json
GET /Employees?$format=xml
GET /Employees?$format=application/json;odata.metadata=minimal
GET /Employees?$format=application/json;odata.metadata=full
GET /Employees?$format=application/json;odata.metadata=none
</code></pre>
<table>
<thead><tr>
<th>Metadata Level</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>minimal</code></td>
<td>Default — only essential metadata</td>
</tr>
<tr>
<td><code>full</code></td>
<td>All type info, navigation links, etc.</td>
</tr>
<tr>
<td><code>none</code></td>
<td>No metadata, smallest payload</td>
</tr>
</tbody></table>
<blockquote><strong>Best Practice for Large Data:</strong> Use <code>odata.metadata=none</code> to reduce response size.</blockquote>
<hr>
<h3 id="11-combining-query-options">11. Combining Query Options</h3>
<p>All query options can be combined using <code>&amp;</code>.</p>
<pre><code class="language-">
GET /Employees
  ?$filter=Department eq &#x27;IT&#x27; and IsActive eq true
  &amp;$select=Id,Name,Salary,HireDate
  &amp;$orderby=Salary desc
  &amp;$top=20
  &amp;$skip=0
  &amp;$count=true
  &amp;$expand=Manager($select=Name)
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;@odata.context&quot;: &quot;...$metadata#Employees(Id,Name,Salary,HireDate,Manager(Name))&quot;,
  &quot;@odata.count&quot;: 87,
  &quot;value&quot;: [
    {
      &quot;Id&quot;: 42,
      &quot;Name&quot;: &quot;Carol&quot;,
      &quot;Salary&quot;: 120000,
      &quot;HireDate&quot;: &quot;2019-03-15&quot;,
      &quot;Manager&quot;: { &quot;Name&quot;: &quot;David&quot; }
    }
  ]
}
</code></pre>
<hr>
<h2 id="handling-large-data-with-odata">Handling Large Data with OData</h2>
<hr>
<h3 id="strategy-1-server-side-pagination-with-top-skip">Strategy 1: Server-Side Pagination with <code>$top</code> + <code>$skip</code></h3>
<p>The most common approach — request data in pages.</p>
<pre><code class="language-">
# Page 1
GET /Orders?$top=100&amp;$skip=0&amp;$count=true

# Page 2
GET /Orders?$top=100&amp;$skip=100

# Page N
GET /Orders?$top=100&amp;$skip={(N-1)*100}
</code></pre>
<p><strong>JavaScript Example:</strong></p>
<pre><code class="language-javascript">
async function fetchAllOrders() {
  const pageSize = 100;
  let skip = 0;
  let allOrders = [];
  let totalCount = Infinity;

  while (skip &lt; totalCount) {
    const response = await fetch(
      &#96;/api/Orders?$top=${pageSize}&amp;$skip=${skip}&amp;$count=true&#96;
    );
    const data = await response.json();

    totalCount = data[&quot;@odata.count&quot;];
    allOrders = allOrders.concat(data.value);
    skip += pageSize;

    console.log(&#96;Fetched ${allOrders.length} of ${totalCount}&#96;);
  }

  return allOrders;
}
</code></pre>
<blockquote><strong>Limitation:</strong> Deep <code>$skip</code> (e.g., <code>$skip=100000</code>) can be slow on large tables due to full scans. Prefer cursor-based pagination for massive datasets.</blockquote>
<hr>
<h3 id="strategy-2-server-driven-pagination-with-odatanextlink">Strategy 2: Server-Driven Pagination with <code>@odata.nextLink</code></h3>
<p>The server controls page size and returns a <code>nextLink</code> for the next page. This is the preferred approach.</p>
<pre><code class="language-">
# Initial request (no skip/top)
GET /Orders?$filter=Status eq &#x27;Pending&#x27;
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;@odata.count&quot;: 50000,
  &quot;@odata.nextLink&quot;: &quot;https://api.example.com/Orders?$skiptoken=Id%3D200&quot;,
  &quot;value&quot;: [ ... ]
}
</code></pre>
<p><strong>JavaScript — Follow nextLink:</strong></p>
<pre><code class="language-javascript">
async function fetchWithNextLink(initialUrl) {
  let url = initialUrl;
  let allResults = [];

  while (url) {
    const response = await fetch(url);
    const data = await response.json();

    allResults = allResults.concat(data.value);
    url = data[&quot;@odata.nextLink&quot;] || null;

    console.log(&#96;Total fetched so far: ${allResults.length}&#96;);
  }

  return allResults;
}

fetchWithNextLink(&quot;/api/Orders?$filter=Status eq &#x27;Pending&#x27;&quot;);
</code></pre>
<blockquote><strong>Best Practice:</strong> Always follow <code>@odata.nextLink</code> instead of manually incrementing <code>$skip</code>, especially for large data sets.</blockquote>
<hr>
<h3 id="strategy-3-skiptoken-cursor-based-pagination">Strategy 3: <code>$skiptoken</code> — Cursor-Based Pagination</h3>
<p>More efficient than <code>$skip</code> for large datasets. Uses a server-generated token instead of numeric offset.</p>
<pre><code class="language-">
# First page
GET /Orders?$top=200

# Response includes:
# &quot;@odata.nextLink&quot;: &quot;/Orders?$skiptoken=Id%3D200&quot;

# Next page using token
GET /Orders?$skiptoken=Id%3D200
</code></pre>
<blockquote>The <code>$skiptoken</code> value is opaque and server-defined. Do not construct it manually — always use the value from <code>@odata.nextLink</code>.</blockquote>
<hr>
<h3 id="strategy-4-reduce-payload-with-select-odatametadatanone">Strategy 4: Reduce Payload with <code>$select</code> + <code>odata.metadata=none</code></h3>
<pre><code class="language-">
GET /Orders
  ?$select=OrderId,Amount,Status,CreatedDate
  &amp;$format=application/json;odata.metadata=none
  &amp;$top=500
</code></pre>
<p>This removes unused fields and all metadata annotations, significantly shrinking response size.</p>
<hr>
<h3 id="strategy-5-filter-before-fetching-with-filter">Strategy 5: Filter Before Fetching with <code>$filter</code></h3>
<p>Always push filtering to the server. Never fetch all data and filter client-side.</p>
<pre><code class="language-">
# BAD — fetches everything
GET /Orders

# GOOD — fetches only what you need
GET /Orders
  ?$filter=CreatedDate ge 2024-01-01 and Status eq &#x27;Completed&#x27;
  &amp;$select=OrderId,Amount,CustomerName
</code></pre>
<hr>
<h3 id="strategy-6-use-apply-for-server-side-aggregation">Strategy 6: Use <code>$apply</code> for Server-Side Aggregation</h3>
<p>For reporting and analytics on large tables, aggregate on the server rather than fetching raw rows.</p>
<pre><code class="language-">
# BAD — fetch 1 million rows and sum in code
GET /Sales?$select=Amount

# GOOD — aggregate on server
GET /Sales?$apply=groupby((Region,Year), aggregate(Amount with sum as Total))
</code></pre>
<p><strong>JSON Response:</strong></p>
<pre><code class="language-json">
{
  &quot;value&quot;: [
    { &quot;Region&quot;: &quot;North&quot;, &quot;Year&quot;: 2024, &quot;Total&quot;: 4500000 },
    { &quot;Region&quot;: &quot;South&quot;, &quot;Year&quot;: 2024, &quot;Total&quot;: 3200000 }
  ]
}
</code></pre>
<hr>
<h3 id="strategy-7-parallel-partitioned-requests">Strategy 7: Parallel Partitioned Requests</h3>
<p>Split large data into partitions and fetch them in parallel.</p>
<pre><code class="language-javascript">
async function fetchPartitioned(totalCount, pageSize = 1000) {
  const pages = Math.ceil(totalCount / pageSize);

  const requests = Array.from({ length: pages }, (_, i) =&gt;
    fetch(&#96;/api/Orders?$top=${pageSize}&amp;$skip=${i * pageSize}&amp;$select=OrderId,Amount&#96;)
      .then(r =&gt; r.json())
      .then(d =&gt; d.value)
  );

  const results = await Promise.all(requests);
  return results.flat();
}
</code></pre>
<blockquote>Use with caution — parallel requests can overload the server. Add concurrency limits (e.g., max 5 parallel requests).</blockquote>
<hr>
<h3 id="strategy-8-batch-requests-with-batch">Strategy 8: Batch Requests with <code>$batch</code></h3>
<p>OData supports <code>$batch</code> to send multiple requests in a single HTTP call, reducing round trips.</p>
<pre><code class="language-">
POST /api/$batch
Content-Type: multipart/mixed; boundary=batch_1

--batch_1
Content-Type: application/http

GET /Employees?$top=100 HTTP/1.1

--batch_1
Content-Type: application/http

GET /Departments?$select=Id,Name HTTP/1.1

--batch_1--
</code></pre>
<p><strong>JSON Batch (OData v4):</strong></p>
<pre><code class="language-json">
POST /api/$batch
Content-Type: application/json

{
  &quot;requests&quot;: [
    {
      &quot;id&quot;: &quot;1&quot;,
      &quot;method&quot;: &quot;GET&quot;,
      &quot;url&quot;: &quot;Employees?$top=100&amp;$select=Id,Name&quot;
    },
    {
      &quot;id&quot;: &quot;2&quot;,
      &quot;method&quot;: &quot;GET&quot;,
      &quot;url&quot;: &quot;Departments?$select=Id,Name&quot;
    }
  ]
}
</code></pre>
<p><strong>Batch Response:</strong></p>
<pre><code class="language-json">
{
  &quot;responses&quot;: [
    {
      &quot;id&quot;: &quot;1&quot;,
      &quot;status&quot;: 200,
      &quot;body&quot;: {
        &quot;value&quot;: [ { &quot;Id&quot;: 1, &quot;Name&quot;: &quot;Alice&quot; } ]
      }
    },
    {
      &quot;id&quot;: &quot;2&quot;,
      &quot;status&quot;: 200,
      &quot;body&quot;: {
        &quot;value&quot;: [ { &quot;Id&quot;: 10, &quot;Name&quot;: &quot;Engineering&quot; } ]
      }
    }
  ]
}
</code></pre>
<hr>
<h3 id="strategy-9-asynchronous-requests-prefer-header">Strategy 9: Asynchronous Requests (Prefer Header)</h3>
<p>For very large exports, request async processing.</p>
<pre><code class="language-">
GET /Orders?$filter=Year eq 2024
Prefer: respond-async, wait=120
</code></pre>
<p><strong>Response (202 Accepted):</strong></p>
<pre><code class="language-">
HTTP/1.1 202 Accepted
Location: /api/async-monitor/job-456
Retry-After: 30
</code></pre>
<p><strong>Poll for completion:</strong></p>
<pre><code class="language-">
GET /api/async-monitor/job-456
</code></pre>
<p><strong>When ready:</strong></p>
<pre><code class="language-json">
{
  &quot;status&quot;: &quot;succeeded&quot;,
  &quot;result&quot;: &quot;/api/async-results/job-456&quot;
}
</code></pre>
<hr>
<h2 id="large-data-best-practices-summary">Large Data Best Practices — Summary</h2>
<table>
<thead><tr>
<th>Strategy</th>
<th>When to Use</th>
</tr></thead><tbody>
<tr>
<td><code>$select</code></td>
<td>Always — remove unused fields</td>
</tr>
<tr>
<td><code>$filter</code></td>
<td>Always — push filtering to server</td>
</tr>
<tr>
<td><code>$top</code> + <code>$skip</code></td>
<td>Simple pagination on moderate datasets</td>
</tr>
<tr>
<td><code>@odata.nextLink</code></td>
<td>Preferred for server-driven pagination</td>
</tr>
<tr>
<td><code>$skiptoken</code></td>
<td>Cursor-based paging for large tables</td>
</tr>
<tr>
<td><code>$apply</code> aggregation</td>
<td>Analytics/reporting — avoid raw row fetching</td>
</tr>
<tr>
<td><code>metadata=none</code></td>
<td>When metadata is not needed</td>
</tr>
<tr>
<td><code>$batch</code></td>
<td>Reduce HTTP round trips for multi-requests</td>
</tr>
<tr>
<td>Parallel partitions</td>
<td>Bulk export with controlled concurrency</td>
</tr>
<tr>
<td><code>Prefer: respond-async</code></td>
<td>Very large exports or long-running queries</td>
</tr>
</tbody></table>
<hr>
<h2 id="odata-v4-vs-v2-key-json-differences">OData v4 vs v2 — Key JSON Differences</h2>
<table>
<thead><tr>
<th>Feature</th>
<th>OData v2</th>
<th>OData v4</th>
</tr></thead><tbody>
<tr>
<td>Response wrapper</td>
<td><code>{ &quot;d&quot;: { &quot;results&quot;: [] } }</code></td>
<td><code>{ &quot;value&quot;: [] }</code></td>
</tr>
<tr>
<td>Count property</td>
<td><code>__count</code></td>
<td><code>@odata.count</code></td>
</tr>
<tr>
<td>Next link</td>
<td><code>__next</code></td>
<td><code>@odata.nextLink</code></td>
</tr>
<tr>
<td>Metadata</td>
<td><code>__metadata</code> per entity</td>
<td><code>@odata.context</code> at top</td>
</tr>
<tr>
<td><code>$apply</code></td>
<td>Not supported</td>
<td>Supported</td>
</tr>
<tr>
<td><code>in</code> operator</td>
<td>Not supported</td>
<td>Supported (v4.01)</td>
</tr>
<tr>
<td>Batch format</td>
<td>Multipart only</td>
<td>JSON batch supported</td>
</tr>
</tbody></table>
<hr>
<h2 id="quick-reference-card">Quick Reference Card</h2>
<pre><code class="language-">
$filter    → WHERE clause          /Products?$filter=Price gt 100
$select    → SELECT columns        /Products?$select=Id,Name,Price
$orderby   → ORDER BY              /Products?$orderby=Price desc
$top       → LIMIT                 /Products?$top=50
$skip      → OFFSET                /Products?$skip=100
$count     → COUNT(*)              /Products?$count=true
$expand    → JOIN related entity   /Orders?$expand=Customer
$search    → Full-text search      /Products?$search=laptop
$apply     → GROUP BY + aggregate  /Sales?$apply=groupby((Region),aggregate(...))
$format    → Response format       /Products?$format=json
$skiptoken → Cursor pagination     /Products?$skiptoken=Id%3D500
$batch     → Multi-request POST    POST /api/$batch
</code></pre>
<hr>
<table>
<tr>
<td>*OData Specification: <a href="https://www.odata.org">https://www.odata.org</a></td>
<td>Version: OData v4.0 / v4.01*</td>
</tr>
</tbody></table>
<p><em>Last updated: March 2026</em></p>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = odataJsonQueryGuideContentData;
}
