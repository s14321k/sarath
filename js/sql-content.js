// Sql - Content Data
const sqlContentData = `<h1 id="sql-interview-prep">📘 SQL Interview Prep</h1>
<blockquote>✅ Bookmark: <a href="https://www.educba.com/mysql-query-commands/">All SQL Commands</a></blockquote>
<hr>
<p><img src="../images/SQL/SQLorder.gif" alt="SQLorder"></p>
<details open>
<summary><strong>🔢 1. Max & Nth Max Salary</strong></summary>
<h3 id="query-to-get-max-or-nth-max-salary">❓ Query to Get Max or Nth Max Salary</h3>
<table>
<thead><tr>
<th>Description</th>
<th>Query Example</th>
</tr></thead><tbody>
<tr>
<td>Nth Highest Salary</td>
<td><code>SELECT DISTINCT(Salary) FROM table ORDER BY Salary DESC LIMIT n,1;</code></td>
</tr>
<tr>
<td>3rd Highest Salary</td>
<td><code>SELECT DISTINCT(column_name) FROM table_name ORDER BY column_name DESC LIMIT 2,1;</code></td>
</tr>
</tbody></table>
<p>🔗 <a href="https://stackoverflow.com/a/21520159/11962586">Reference</a></p>
</details>
<hr>
<details open>
<summary><strong>🏢 2. Highest Salary in Each Department</strong></summary>
<h3 id="queries">🔍 Queries</h3>
<pre><code class="language-sql">
-- Get max salary per department
SELECT DeptID, MAX(Salary) FROM EmpDetails GROUP BY DeptID;

-- Get employee details with max salary per department
SELECT DeptID, EmpName, Salary 
FROM EmpDetails 
WHERE (DeptID, Salary) IN (
  SELECT DeptID, MAX(Salary) 
  FROM EmpDetails 
  GROUP BY DeptID
);
</code></pre>
<p><strong>Highest Salary from each Department</strong></p>
<pre><code class="language-">
  SELECT dep, MAX(salary) AS highest_salary
  FROM employee
  GROUP BY dep;
</code></pre>
<p>🔗 <a href="https://stackoverflow.com/a/8477093/11962586">Reference</a></p>
<p>We want: <strong>employees whose salary is greater than their manager’s salary</strong>.</p>
<p>That means we need a <strong>self-join</strong> on the same employee table.</p>
<hr>
<h3 id="example-table-employee">Example table: <code>employee</code></h3>
<table>
<thead><tr>
<th>emp\_id</th>
<th>emp\_name</th>
<th>salary</th>
<th>manager\_id</th>
</tr></thead><tbody>
<tr>
<td>123</td>
<td>abc</td>
<td>10</td>
<td>0</td>
</tr>
<tr>
<td>0</td>
<td>cde</td>
<td>9</td>
<td>231</td>
</tr>
</tbody></table>
<hr>
<h3 id="sql-query">SQL Query</h3>
<pre><code class="language-sql">
SELECT e.emp_id,
       e.emp_name,
       e.salary,
       m.emp_name AS manager_name,
       m.salary AS manager_salary
FROM employee e
JOIN employee m
  ON e.manager_id = m.emp_id
WHERE e.salary &gt; m.salary;
</code></pre>
<hr>
<h3 id="what-this-does">✅ What this does:</h3>
<ul>
<li><code>employee e</code> → employees</li>
<li><code>employee m</code> → managers (same table, self-join)</li>
<li><code>e.manager_id = m.emp_id</code> → link employee to their manager</li>
<li><code>e.salary &gt; m.salary</code> → filter only employees earning more than their manager</li>
</ul>
<hr>
<h3 id="output-for-your-sample-data">Output (for your sample data):</h3>
<table>
<thead><tr>
<th>emp\_id</th>
<th>emp\_name</th>
<th>salary</th>
<th>manager\_name</th>
<th>manager\_salary</th>
</tr></thead><tbody>
<tr>
<td>123</td>
<td>abc</td>
<td>10</td>
<td>cde</td>
<td>9</td>
</tr>
</tbody></table>
</details>
<hr>
<details open>
<summary><strong>🔗 3. Types of Relationships in DBMS</strong></summary>
<table>
<thead><tr>
<th>Type</th>
<th>Description</th>
<th>Image</th>
</tr></thead><tbody>
<tr>
<td>One to One</td>
<td>1 record ↔ 1 record</td>
<td><img src="../images/oneToOneRelation.png" alt="img\_2"></td>
</tr>
<tr>
<td>One to Many / Many to One</td>
<td>1 record ↔ many</td>
<td><img src="../images/oneToManyRelation.png" alt="img\<em>3">&lt;br&gt;<img src="../images/ManyToOneRelation.png" alt="img\</em>4"></td>
</tr>
<tr>
<td>Many to Many</td>
<td>many ↔ many</td>
<td><img src="../images/ManyToManyRelation.png" alt="img\_5"></td>
</tr>
</tbody></table>
<p>🔗 <a href="https://www.javatpoint.com/types-of-relationship-in-database-table">Javatpoint Article</a></p>
</details>
<hr>
<details open>
<summary><strong>👓 4. Views in SQL</strong></summary>
<h3 id="what-is-a-view">📄 What is a View?</h3>
<ul>
<li>A virtual table based on SQL result-set.</li>
<li>Can join multiple tables and abstract data.</li>
<li>Created using <code>CREATE VIEW</code>.</li>
</ul>
<h3 id="syntax">🛠️ Syntax</h3>
<pre><code class="language-sql">
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
</code></pre>
</details>
<hr>
<details open>
<summary><strong>⚖️ 5. Predicates in SQL</strong></summary>
<h3 id="predicates-expressions-that-evaluate-to-true-false-unknown">📌 Predicates = Expressions that evaluate to TRUE / FALSE / UNKNOWN</h3>
<table>
<thead><tr>
<th>Predicate</th>
<th>Use Case</th>
</tr></thead><tbody>
<tr>
<td><code>=</code> <code>&lt;</code> <code>&gt;</code></td>
<td>Comparison</td>
</tr>
<tr>
<td><code>LIKE</code></td>
<td>Pattern match</td>
</tr>
<tr>
<td><code>BETWEEN</code></td>
<td>Range check</td>
</tr>
<tr>
<td><code>IN</code></td>
<td>Check value in list</td>
</tr>
<tr>
<td><code>EXISTS</code></td>
<td>Subquery check</td>
</tr>
<tr>
<td><code>IS NULL</code></td>
<td>Null check</td>
</tr>
</tbody></table>
<p>🔗 <a href="https://www3.navicat.com/en/company/aboutus/blog/1895-predicates-in-sql#">Predicates Explained</a></p>
</details>
<hr>
<details open>
<summary><strong>🧱 6. SQL Constraints</strong></summary>
<h3 id="what-are-constraints">✅ What Are Constraints?</h3>
<p>Constraints enforce rules at the column level for data integrity.</p>
<table>
<thead><tr>
<th>Constraint</th>
<th>Purpose</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td>Primary Key</td>
<td>Uniquely identifies each row</td>
<td>Only one allowed per table</td>
</tr>
<tr>
<td>Foreign Key</td>
<td>Enforces referential integrity</td>
<td>Refers to a PK in another table</td>
</tr>
<tr>
<td>Unique</td>
<td>Ensures all values are unique</td>
<td>Multiple allowed per table</td>
</tr>
<tr>
<td>Not Null</td>
<td>Prevents null values</td>
<td>Mandatory values</td>
</tr>
<tr>
<td>Check</td>
<td>Validates data using a condition</td>
<td>e.g. <code>Age &gt;= 18</code></td>
</tr>
<tr>
<td>Default</td>
<td>Provides default value</td>
<td>Reduces NULLs</td>
</tr>
</tbody></table>
<hr>
<h3 id="examples">🔍 Examples</h3>
<h4 id="1-primary-key">1. <strong>Primary Key</strong></h4>
<pre><code class="language-sql">
CREATE TABLE Employees (
  EmployeeID INT PRIMARY KEY,
  FirstName VARCHAR(50)
);
</code></pre>
<h4 id="2-foreign-key">2. <strong>Foreign Key</strong></h4>
<pre><code class="language-sql">
CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  EmployeeID INT,
  FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
</code></pre>
<h4 id="3-unique">3. <strong>Unique</strong></h4>
<pre><code class="language-sql">
CREATE TABLE Customers (
  CustomerID INT PRIMARY KEY,
  Email VARCHAR(100) UNIQUE
);
</code></pre>
<h4 id="4-not-null">4. <strong>Not Null</strong></h4>
<pre><code class="language-sql">
CREATE TABLE Products (
  ProductID INT PRIMARY KEY,
  ProductName VARCHAR(100) NOT NULL
);
</code></pre>
<h4 id="5-check">5. <strong>Check</strong></h4>
<pre><code class="language-sql">
CREATE TABLE Employees (
  EmployeeID INT PRIMARY KEY,
  Age INT CHECK (Age &gt;= 18)
);
</code></pre>
<h4 id="6-default">6. <strong>Default</strong></h4>
<pre><code class="language-sql">
CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  OrderDate DATE DEFAULT GETDATE()
);
</code></pre>
</details>
<hr>
<details open>
<summary><strong>🔗 7. SQL Joins</strong></summary>
<h3 id="types-of-joins">📌 Types of Joins</h3>
<p><img src="../images/SQL/Joins.gif" alt="Joins"></p>
<p><img src="../images/SQL/impJoins.jpg" alt="Joins2"></p>
<table>
<thead><tr>
<th>Join Type</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>INNER JOIN</code></td>
<td>Returns only matching records from both tables</td>
</tr>
<tr>
<td><code>LEFT OUTER JOIN</code></td>
<td>Returns all records from the left table, and matched records from the right</td>
</tr>
<tr>
<td><code>RIGHT OUTER JOIN</code></td>
<td>Returns all records from the right table, and matched from the left</td>
</tr>
<tr>
<td><code>FULL OUTER JOIN</code></td>
<td>Returns all records where there is a match in either left or right table</td>
</tr>
</tbody></table>
<p><strong>Example Tables</strong>: <code>Products</code>, <code>Categories</code></p>
<pre><code class="language-sql">
SELECT productId, productName, categoryName 
FROM Products 
INNER JOIN Categories 
ON Products.CategoryID = Categories.CategoryID;
</code></pre>
</details>
<hr>
<details open>
<summary><strong>🔑 8. SQL Keywords</strong></summary>
<p>🔗 <a href="https://www.w3schools.com/sql/sql<em>ref</em>keywords.asp">W3Schools SQL Keywords Reference</a></p>
<p>Examples include:</p>
<ul>
<li><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></li>
<li><code>SELECT</code>, <code>DISTINCT</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code></li>
<li><code>AND</code>, <code>OR</code>, <code>NOT</code>, <code>NULL</code>, <code>IN</code>, <code>EXISTS</code>, <code>BETWEEN</code>, <code>LIKE</code></li>
</ul>
</details>
<hr>
<details open>
<summary><strong>🔧 9. SQL Functions</strong></summary>
<p>🔗 <a href="https://www.w3schools.com/sql/sql<em>ref</em>mysql.asp">Function Reference - MySQL</a></p>
<h3 id="types-of-functions">Types of Functions</h3>
<table>
<thead><tr>
<th>Type</th>
<th>Examples</th>
</tr></thead><tbody>
<tr>
<td>Numeric</td>
<td><code>ABS()</code>, <code>CEIL()</code>, <code>FLOOR()</code>, <code>ROUND()</code></td>
</tr>
<tr>
<td>String</td>
<td><code>CONCAT()</code>, <code>LENGTH()</code>, <code>UPPER()</code>, <code>LOWER()</code></td>
</tr>
<tr>
<td>Date &amp; Time</td>
<td><code>NOW()</code>, <code>CURDATE()</code>, <code>DATEDIFF()</code></td>
</tr>
<tr>
<td>Aggregate</td>
<td><code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MAX()</code>, <code>MIN()</code></td>
</tr>
</tbody></table>
</details>
<hr>
<details open>
<summary><strong>⚡ 10. Indexing in SQL</strong></summary>
<h3 id="what-is-indexing">🔍 What is Indexing?</h3>
<p>Indexing improves data retrieval performance by creating a fast lookup reference for certain columns.</p>
<table>
<thead><tr>
<th>Benefit</th>
<th>Trade-off</th>
</tr></thead><tbody>
<tr>
<td>Faster SELECTs</td>
<td>Slower INSERT/UPDATE/DELETE ops</td>
</tr>
<tr>
<td>Better JOIN/WHERE</td>
<td>Extra storage required</td>
</tr>
</tbody></table>
<blockquote>Index only when queries frequently filter or sort by the column.</blockquote>
<h3 id="example">Example</h3>
<pre><code class="language-sql">
CREATE INDEX idx_employee_name
ON Employees (FirstName, LastName);
</code></pre>
</details>
<hr>
<details open>
<summary><strong>🔐 11. Primary Key vs Foreign Key</strong></summary>
<h3 id="definitions">📌 Definitions</h3>
<table>
<thead><tr>
<th>Key Type</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Primary</strong></td>
<td>Uniquely identifies each row, cannot be NULL</td>
</tr>
<tr>
<td><strong>Foreign</strong></td>
<td>References a primary key in another table, can be NULL</td>
</tr>
</tbody></table>
<h3 id="primary-key-example">✅ Primary Key Example</h3>
<pre><code class="language-sql">
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50)
);
</code></pre>
<h3 id="foreign-key-example">🔗 Foreign Key Example</h3>
<pre><code class="language-sql">
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    EmployeeID INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
</code></pre>
<h3 id="differences">🔄 Differences</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Primary Key</th>
<th>Foreign Key</th>
</tr></thead><tbody>
<tr>
<td>Uniqueness</td>
<td>Must be unique</td>
<td>Can have duplicates</td>
</tr>
<tr>
<td>Nullability</td>
<td>Cannot be NULL</td>
<td>Can be NULL</td>
</tr>
<tr>
<td>Auto Indexed</td>
<td>Yes</td>
<td>Not by default</td>
</tr>
<tr>
<td>Purpose</td>
<td>Identifies a row</td>
<td>Links to another table</td>
</tr>
</tbody></table>
</details>
<hr>
<details open>
<summary><strong>📦 12. Stored Procedures</strong></summary>
<h3 id="what-is-a-stored-procedure">📘 What is a Stored Procedure?</h3>
<p>A <strong>stored procedure</strong> is a saved set of SQL commands, stored in the DB and executed as needed. Helps enforce business logic and reduce duplication.</p>
<h3 id="benefits">✅ Benefits</h3>
<ul>
<li>Faster via <strong>precompiled execution</strong></li>
<li>Improves <strong>security &amp; maintainability</strong></li>
<li>Allows <strong>input/output parameters</strong></li>
<li>Supports <strong>transactions (BEGIN/COMMIT/ROLLBACK)</strong></li>
</ul>
<hr>
<h3 id="example-input-parameter">🔨 Example: Input Parameter</h3>
<pre><code class="language-sql">
CREATE PROCEDURE GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SELECT EmployeeID, FirstName, LastName
    FROM Employees
    WHERE DepartmentID = @DepartmentID;
END;
</code></pre>
<pre><code class="language-sql">
EXEC GetEmployeesByDepartment @DepartmentID = 5;
</code></pre>
<hr>
<h3 id="example-output-parameter">📤 Example: Output Parameter</h3>
<pre><code class="language-sql">
CREATE PROCEDURE GetEmployeeCountByDepartment
    @DepartmentID INT,
    @EmployeeCount INT OUTPUT
AS
BEGIN
    SELECT @EmployeeCount = COUNT(*)
    FROM Employees
    WHERE DepartmentID = @DepartmentID;
END;
</code></pre>
<pre><code class="language-sql">
DECLARE @Count INT;
EXEC GetEmployeeCountByDepartment @DepartmentID = 5, @EmployeeCount = @Count OUTPUT;
PRINT @Count;
</code></pre>
</details>
<hr>
<details open>
<summary><strong>🧑‍💼 13. Query: Employees with Age > 40</strong></summary>
<h3 id="sql-query">📌 SQL Query</h3>
<pre><code class="language-sql">
SELECT * FROM Employees
WHERE Age &gt; 40;
</code></pre>
<p>🧠 Assumes a column named <code>Age</code> exists in the <code>Employees</code> table.</p>
</details>
<hr>
<details open>
<summary><strong>🔁 14. Referential Constraint</strong></summary>
<h3 id="what-is-a-referential-constraint">📘 What Is a Referential Constraint?</h3>
<p>A <strong>referential constraint</strong> enforces a link between two tables using a <strong>foreign key</strong>, ensuring consistency and <strong>referential integrity</strong>.</p>
<table>
<thead><tr>
<th>Component</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Parent Table</strong></td>
<td>Has a primary key</td>
</tr>
<tr>
<td><strong>Child Table</strong></td>
<td>Has a foreign key that references the parent&#x27;s PK</td>
</tr>
<tr>
<td><strong>Purpose</strong></td>
<td>Prevents orphan records, maintains valid relationships</td>
</tr>
</tbody></table>
<h3 id="example">🔗 Example</h3>
<pre><code class="language-sql">
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
</code></pre>
</details>
<hr>
<details open>
<summary><strong>🔑 15. Composite Key vs Foreign Key</strong></summary>
<h3 id="composite-key">🧩 Composite Key</h3>
<p>A <strong>composite key</strong> is made up of two or more columns that together uniquely identify a record.</p>
<pre><code class="language-sql">
CREATE TABLE ProjectAssignments (
    EmployeeID INT,
    ProjectID INT,
    PRIMARY KEY (EmployeeID, ProjectID)
);
</code></pre>
<hr>
<h3 id="foreign-key">🔗 Foreign Key</h3>
<p>A <strong>foreign key</strong> is used to reference a column in another table, establishing a relationship.</p>
<pre><code class="language-sql">
FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
</code></pre>
<hr>
<h3 id="summary-table">🧠 Summary Table</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Composite Key</th>
<th>Foreign Key</th>
</tr></thead><tbody>
<tr>
<td>Definition</td>
<td>Combination of columns as primary key</td>
<td>Column(s) referencing a primary key</td>
</tr>
<tr>
<td>Purpose</td>
<td>Uniquely identifies rows</td>
<td>Maintains referential integrity</td>
</tr>
<tr>
<td>Can Be Combined</td>
<td>Yes (2+ columns)</td>
<td>Often references single column</td>
</tr>
<tr>
<td>Used In</td>
<td>Many-to-many join tables</td>
<td>Parent-child relationships</td>
</tr>
</tbody></table>
</details>
<hr>
<details open>
<summary><strong>🧮 16. Database Normalization</strong></summary>
<h3 id="what-is-normalization">✅ What Is Normalization?</h3>
<p>Normalization minimizes redundancy and organizes data efficiently by splitting tables and defining relationships between them.</p>
<hr>
<h3 id="normal-forms-overview">🔢 Normal Forms Overview</h3>
<table>
<thead><tr>
<th>Form</th>
<th>Rule Summary</th>
<th>Focus Area</th>
</tr></thead><tbody>
<tr>
<td>1NF</td>
<td>Atomic columns (no arrays or repeated groups)</td>
<td>Column structure</td>
</tr>
<tr>
<td>2NF</td>
<td>Full functional dependency on primary key</td>
<td>Remove partial dependency</td>
</tr>
<tr>
<td>3NF</td>
<td>No transitive dependency (non-key ➝ non-key)</td>
<td>Data independence</td>
</tr>
<tr>
<td>BCNF</td>
<td>Every determinant is a candidate key</td>
<td>Stronger 3NF</td>
</tr>
<tr>
<td>4NF</td>
<td>No multi-valued dependencies</td>
<td>Eliminate MVDs</td>
</tr>
<tr>
<td>5NF</td>
<td>No join dependency without loss</td>
<td>Table decomposition</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-1nf-to-5nf-progression">📊 Example: 1NF to 5NF Progression</h3>
<pre><code class="language-sql">
-- 1NF: Atomic columns
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    ContactNumber VARCHAR(15)
);

-- 2NF: Split into Departments
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

-- 3NF: Remove indirect dependency
CREATE TABLE DepartmentLocations (
    DepartmentID INT PRIMARY KEY,
    Location VARCHAR(50),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
</code></pre>
<hr>
<h3 id="benefits-of-normalization">✅ Benefits of Normalization</h3>
<ul>
<li>✅ Eliminates redundant data</li>
<li>✅ Ensures consistency and integrity</li>
<li>✅ Improves query performance</li>
</ul>
</details>
<hr>
<details open>
<summary><strong>⚙️ 17. Ways to Reduce Database Load</strong></summary>
<p><img src="../images/SQL/scallingDB.jpg" alt="Joins2"></p>
<h3 id="key-techniques">💡 Key Techniques</h3>
<table>
<thead><tr>
<th>Strategy</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Query Optimization</strong></td>
<td>Write efficient SQL using indexes, limits, and filters</td>
</tr>
<tr>
<td><strong>Indexing</strong></td>
<td>Create indexes on frequently filtered/joined columns</td>
</tr>
<tr>
<td><strong>Caching</strong></td>
<td>Store frequent results in memory (e.g., Redis, memcached)</td>
</tr>
<tr>
<td><strong>Sharding</strong></td>
<td>Split large DB into smaller ones by key (e.g., user ID)</td>
</tr>
<tr>
<td><strong>Load Balancing</strong></td>
<td>Distribute DB traffic across multiple servers</td>
</tr>
<tr>
<td><strong>Vertical Scaling</strong></td>
<td>Upgrade hardware (CPU, RAM, SSD)</td>
</tr>
<tr>
<td><strong>Horizontal Scaling</strong></td>
<td>Add more servers (DB clustering, read replicas)</td>
</tr>
<tr>
<td><strong>Data Archiving</strong></td>
<td>Move old/inactive data to archive tables or cold storage</td>
</tr>
<tr>
<td><strong>Connection Pooling</strong></td>
<td>Reuse connections for efficiency</td>
</tr>
<tr>
<td><strong>Schema Optimization</strong></td>
<td>Normalize or denormalize as per performance needs</td>
</tr>
</tbody></table>
<p>⚠️ Balance read vs write performance based on use case.</p>
</details>
<hr>
<details open>
<summary><strong>🔐 18. Primary Key vs Unique Key</strong></summary>
<h3 id="purpose">🧠 Purpose</h3>
<p>Both enforce <strong>uniqueness</strong> but differ in <strong>nullability, count per table</strong>, and <strong>intended role</strong>.</p>
<hr>
<h3 id="key-differences">🧬 Key Differences</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Primary Key</th>
<th>Unique Key</th>
</tr></thead><tbody>
<tr>
<td><strong>Purpose</strong></td>
<td>Main identifier for table rows</td>
<td>Enforce uniqueness in specific columns</td>
</tr>
<tr>
<td><strong>Uniqueness</strong></td>
<td>Must be unique</td>
<td>Must be unique</td>
</tr>
<tr>
<td><strong>NULLs Allowed</strong></td>
<td>❌ Not allowed</td>
<td>✅ Allowed (usually one)</td>
</tr>
<tr>
<td><strong>How Many per Table</strong></td>
<td>Only one</td>
<td>Multiple allowed</td>
</tr>
<tr>
<td><strong>Index Type</strong></td>
<td>Auto unique index</td>
<td>Auto unique index</td>
</tr>
<tr>
<td><strong>Composite Allowed</strong></td>
<td>✅ Yes (multi-column)</td>
<td>✅ Yes</td>
</tr>
</tbody></table>
<hr>
<h3 id="primary-key-example">✅ Primary Key Example</h3>
<pre><code class="language-sql">
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50)
);
</code></pre>
<ul>
<li><code>EmployeeID</code> is the main identifier for each employee.</li>
</ul>
<hr>
<h3 id="unique-key-example">🔁 Unique Key Example</h3>
<pre><code class="language-sql">
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,
    PhoneNumber VARCHAR(15) UNIQUE
);
</code></pre>
<ul>
<li>Ensures no two employees share the same email or phone number.</li>
<li>You <strong>can have multiple</strong> unique keys in one table.</li>
</ul>
<hr>
<h3 id="summary">📌 Summary</h3>
<table>
<thead><tr>
<th>Key Type</th>
<th>Enforces Uniqueness</th>
<th>Allows NULL</th>
<th>Only One?</th>
<th>Composite Allowed</th>
</tr></thead><tbody>
<tr>
<td>Primary Key</td>
<td>✅</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>Unique Key</td>
<td>✅</td>
<td>✅ (usually 1)</td>
<td>❌</td>
<td>✅</td>
</tr>
</tbody></table>
<hr>
<p>Understanding when and where to use <strong>primary</strong> vs <strong>unique</strong> keys helps enforce clean data design and maintain integrity across your database schema.</p>
</details>
<hr>
<details open>
<summary><strong>🔍 19. Find Duplicate Records by Email</strong></summary>
<h3 id="why-check-for-duplicate-emails">📧 Why Check for Duplicate Emails?</h3>
<p>Email is often expected to be <strong>unique</strong> in employee records. Detecting duplicates helps:</p>
<ul>
<li>Ensure data accuracy</li>
<li>Prevent login issues</li>
<li>Maintain referential integrity</li>
</ul>
<hr>
<h3 id="table-structure">🧾 Table Structure</h3>
<pre><code class="language-sql">
CREATE TABLE Employee (
    ID INT PRIMARY KEY,
    EmployeeName VARCHAR(100),
    Email VARCHAR(100),
    Department VARCHAR(50),
    Salary DECIMAL(10, 2),
    HireDate DATE
);
</code></pre>
<hr>
<h3 id="query-to-identify-duplicates-by-email">🧠 Query to Identify Duplicates by Email</h3>
<pre><code class="language-sql">
SELECT Email, COUNT(*) AS Occurrences
FROM Employee
GROUP BY Email
HAVING COUNT(*) &gt; 1;
</code></pre>
<ul>
<li><strong><code>GROUP BY Email</code></strong>: Groups records with the same email</li>
<li><strong><code>HAVING COUNT(*) &gt; 1</code></strong>: Filters only those emails that appear more than once</li>
</ul>
<hr>
<h3 id="fetch-all-duplicate-rows">📥 Fetch All Duplicate Rows</h3>
<p>To get full employee details where email is duplicated:</p>
<pre><code class="language-sql">
SELECT *
FROM Employee
WHERE Email IN (
    SELECT Email
    FROM Employee
    GROUP BY Email
    HAVING COUNT(*) &gt; 1
);
</code></pre>
<hr>
<h3 id="sample-output">🧪 Sample Output</h3>
<table>
<thead><tr>
<th>ID</th>
<th>EmployeeName</th>
<th>Email</th>
<th>Department</th>
<th>Salary</th>
<th>HireDate</th>
</tr></thead><tbody>
<tr>
<td>101</td>
<td>Alice</td>
<td><a href="mailto:alice@example.com">alice@example.com</a></td>
<td>HR</td>
<td>50000.00</td>
<td>2020-01-10</td>
</tr>
<tr>
<td>108</td>
<td>A. Smith</td>
<td><a href="mailto:alice@example.com">alice@example.com</a></td>
<td>Finance</td>
<td>52000.00</td>
<td>2021-04-22</td>
</tr>
</tbody></table>
<hr>
<h3 id="use-case">✅ Use Case</h3>
<ul>
<li>Detect accidental duplicates in data entry</li>
<li>Audit external imports for conflicts</li>
<li>Prepare for applying a <strong><code>UNIQUE</code> constraint</strong> on <code>Email</code></li>
</ul>
</details>
<hr>
<details open>
<summary><strong>20. 📊 Count Male and Female Students in Grade 5</strong></summary>
<p>To get the <strong>count of male and female students</strong> in <strong>grade 5</strong>, your SQL query should be properly structured.</p>
<h3 id="1-using-group-by-recommended">✅ 1. Using <code>GROUP BY</code> (Recommended)</h3>
<pre><code class="language-sql">
SELECT gender, COUNT(*) AS count
FROM student
WHERE grade = &#x27;5&#x27;
GROUP BY gender;
</code></pre>
<p>🧾 <strong>Output Example:</strong></p>
<table>
<thead><tr>
<th>gender</th>
<th>count</th>
</tr></thead><tbody>
<tr>
<td>Male</td>
<td>10</td>
</tr>
<tr>
<td>Female</td>
<td>8</td>
</tr>
</tbody></table>
<hr>
<h3 id="2-using-conditional-aggregation-pivot-style">✅ 2. Using Conditional Aggregation (Pivot Style)</h3>
<pre><code class="language-sql">
SELECT
    COUNT(CASE WHEN gender = &#x27;Male&#x27; THEN 1 END) AS male_count,
    COUNT(CASE WHEN gender = &#x27;Female&#x27; THEN 1 END) AS female_count
FROM student
WHERE grade = &#x27;5&#x27;;
</code></pre>
<p>🧾 <strong>Output Example:</strong></p>
<table>
<thead><tr>
<th>male\_count</th>
<th>female\_count</th>
</tr></thead><tbody>
<tr>
<td>10</td>
<td>8</td>
</tr>
</tbody></table>
<hr>
<h3 id="invalid-version-for-comparison">❌ Invalid Version (for comparison)</h3>
<pre><code class="language-sql">
-- Incorrect syntax and logic
SELECT gender FROM student WHERE grade = &#x27;5&#x27; COUNT(gender) = Male AND COUNT(gender) = Female;
</code></pre>
<p>That won&#x27;t work because:</p>
<ul>
<li><code>COUNT()</code> is an aggregate function and cannot be used directly in a <code>WHERE</code> clause.</li>
<li>String comparison (<code>Male</code>, <code>Female</code>) needs quotes.</li>
<li><code>COUNT(gender) = Male</code> is not valid SQL syntax.</li>
</ul>
<hr>
<h3 id="summary">🧠 Summary</h3>
<table>
<thead><tr>
<th>Task</th>
<th>Query Type</th>
<th>Output Format</th>
</tr></thead><tbody>
<tr>
<td>Count by gender</td>
<td><code>GROUP BY</code></td>
<td>Rows by gender</td>
</tr>
<tr>
<td>Count male/female as columns</td>
<td>Conditional <code>COUNT</code></td>
<td>Pivot-style one row</td>
</tr>
</tbody></table>
<p>Use whichever output format fits your application/reporting need.</p>
</details>
<hr>
<details>
<summary>🐢 How do you optimize a slow login query using email?</summary>
<p>👉 If the login query using <strong>email</strong> is slow, I would optimize it using a combination of <strong>indexing, query tuning, and caching</strong>.</p>
<hr>
<details>
<summary>1️⃣ Add Index on Email Column</summary>
<ul>
<li>Create an <strong>index</strong> on the <code>email</code> column.</li>
<li>Ensures lookups like <code>WHERE email = ?</code> are <strong>faster</strong>.</li>
</ul>
<pre><code class="language-sql">
CREATE INDEX idx_users_email ON users(email);
</code></pre>
</details>
<hr>
<details>
<summary>2️⃣ Check Execution Plan</summary>
<ul>
<li>Use <code>EXPLAIN</code> (MySQL/Postgres) to verify the query <strong>uses the index</strong>.</li>
<li>If not, adjust schema or query hints.</li>
</ul>
<pre><code class="language-sql">
EXPLAIN SELECT id, password FROM users WHERE email = &#x27;test@example.com&#x27;;
</code></pre>
</details>
<hr>
<details>
<summary>3️⃣ Optimize Schema</summary>
<ul>
<li>Keep <code>email</code> column in proper format (e.g., <code>VARCHAR(255)</code>).</li>
<li>Ensure correct <strong>collation</strong> for case-insensitive search if needed.</li>
</ul>
</details>
<hr>
<details>
<summary>4️⃣ Avoid SELECT *</summary>
<ul>
<li>Fetch only required columns (e.g., <code>id, password</code>).</li>
<li>Reduces <strong>I/O load</strong> and speeds up query execution.</li>
</ul>
</details>
<hr>
<details>
<summary>5️⃣ Introduce Caching</summary>
<ul>
<li>Use <strong>Redis or in-memory cache</strong> for frequently accessed login data.</li>
<li>Reduces database hits for repeated logins.</li>
</ul>
</details>
<hr>
<p>✅ <strong>In short:</strong></p>
<p><strong>Indexing + Query Optimization + Caching = Faster Login Queries</strong> 🚀</p>
<hr>
<pre><code class="language-text">
🙋 User Login Request (email, password)
                |
                v
🧠 Check Cache (Redis/Memcached)
      ├── Hit? → ✅ Return User Data (fast)
      |
      └── Miss → Query Database
                     |
                     v
             🔍 Indexed Lookup on Email
                     |
                     v
          📦 Fetch Required Columns (id, password)
                     |
                     v
        📝 Store Result in Cache (for next time)
                     |
                     v
        🔑 Validate Password &amp; Return Response
</code></pre>
</details>
<h1 id="top-ways-to-improve-database-performance">Top Ways to Improve Database Performance</h1>
<p><img src="../DBPerformance/dbPerformance.gif" alt="dbPerformance"></p>
<h2 id="1-indexing">1. Indexing</h2>
<p>Create the right indexes based on query patterns to speed up data retrieval.</p>
<h2 id="2-materialized-views">2. Materialized Views</h2>
<p>Store pre-computed query results for quick access, reducing the need to process complex queries repeatedly.</p>
<h2 id="3-vertical-scaling">3. Vertical Scaling</h2>
<p>Increase the capacity of the database server by adding more CPU, RAM, or storage.</p>
<h2 id="4-denormalization">4. Denormalization</h2>
<p>Reduce complex joins by restructuring data, which can improve query performance.</p>
<h2 id="5-database-caching">5. Database Caching</h2>
<p>Store frequently accessed data in a faster storage layer to reduce load on the database.</p>
<h2 id="6-replication">6. Replication</h2>
<p>Create copies of the primary database on different servers to distribute read load and enhance availability.</p>
<h2 id="7-sharding">7. Sharding</h2>
<p>Divide the database into smaller, manageable pieces, or shards, to distribute load and improve performance.</p>
<h2 id="8-partitioning">8. Partitioning</h2>
<p>Split large tables into smaller, more manageable pieces to improve query performance and maintenance.</p>
<h2 id="9-query-optimization">9. Query Optimization</h2>
<p>Rewrite and fine-tune queries to execute more efficiently.</p>
<h2 id="10-use-of-appropriate-data-types">10. Use of Appropriate Data Types</h2>
<p>Select the most efficient data types for each column to save space and speed up processing.</p>
<h2 id="11-limiting-indexes">11. Limiting Indexes</h2>
<p>Avoid excessive indexing, which can slow down write operations; use indexes judiciously.</p>
<h2 id="12-archiving-old-data">12. Archiving Old Data</h2>
<p>Move infrequently accessed data to an archive to keep the active database smaller and faster.</p>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = sqlContentData;
}
