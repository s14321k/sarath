// Javascript Core Concepts - Content Data
const javascriptCoreConceptsContentData = `<h1 id="javascript-core-concepts-deep-dive">JavaScript Core Concepts — Deep Dive</h1>
<p>Comprehensive explanations of 7 essential JavaScript concepts with ASCII flow diagrams and code examples.</p>
<hr>
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#1-destructuring-assignment">Destructuring Assignment</a></li>
<li><a href="#2-spread-syntax">Spread Syntax</a></li>
<li><a href="#3-closures">Closures</a></li>
<li><a href="#4-function-composition">Function Composition</a></li>
<li><a href="#5-event-delegation">Event Delegation</a></li>
<li><a href="#6-web-workers">Web Workers</a></li>
<li><a href="#7-event-loop">Event Loop</a></li>
</ul>
<hr>
<p><img src="../images/HTMLjs/FEPerformance.gif" alt="FEPerformance"></p>
<h2 id="1-destructuring-assignment">1. Destructuring Assignment</h2>
<p>Destructuring lets you unpack values from arrays or properties from objects into distinct variables — a cleaner alternative to manual indexing.</p>
<h3 id="how-it-works">How It Works</h3>
<pre><code class="language-">
Source (Array / Object)
        │
        ▼
┌───────────────────────┐
│   Destructuring       │
│   Pattern on Left     │
│   side of  =          │
└───────────┬───────────┘
            │
     ┌──────┴──────┐
     ▼             ▼
Variable A    Variable B  ...
</code></pre>
<hr>
<h3 id="array-destructuring">Array Destructuring</h3>
<pre><code class="language-javascript">
// Basic
const [a, b, c] = [10, 20, 30];
// a = 10, b = 20, c = 30

// Skip elements
const [first, , third] = [1, 2, 3];
// first = 1, third = 3

// Default values
const [x = 5, y = 7] = [1];
// x = 1, y = 7 (default used)

// Swap variables
let p = 1, q = 2;
[p, q] = [q, p];
// p = 2, q = 1

// Rest element
const [head, ...tail] = [1, 2, 3, 4, 5];
// head = 1, tail = [2, 3, 4, 5]
</code></pre>
<hr>
<h3 id="object-destructuring">Object Destructuring</h3>
<pre><code class="language-javascript">
const user = { id: 1, name: &#x27;Alice&#x27;, age: 30, city: &#x27;London&#x27; };

// Basic
const { name, age } = user;
// name = &#x27;Alice&#x27;, age = 30

// Rename while destructuring
const { name: fullName, age: years } = user;
// fullName = &#x27;Alice&#x27;, years = 30

// Default values
const { role = &#x27;viewer&#x27;, name: uName } = user;
// role = &#x27;viewer&#x27; (default), uName = &#x27;Alice&#x27;

// Rest properties
const { id, ...rest } = user;
// id = 1, rest = { name: &#x27;Alice&#x27;, age: 30, city: &#x27;London&#x27; }

// Nested object destructuring
const { address: { street, zip } } = {
  address: { street: &#x27;10 Baker St&#x27;, zip: &#x27;W1U 3BW&#x27; }
};
</code></pre>
<hr>
<h3 id="function-parameter-destructuring">Function Parameter Destructuring</h3>
<pre><code class="language-javascript">
// Without destructuring
function greet(user) {
  console.log(user.name, user.age);
}

// With destructuring
function greet({ name, age = 25, role = &#x27;user&#x27; }) {
  console.log(&#96;${name} (${age}) — ${role}&#96;);
}

greet({ name: &#x27;Alice&#x27;, age: 30 });
// Alice (30) — user
</code></pre>
<hr>
<h3 id="nested-mixed-destructuring">Nested + Mixed Destructuring</h3>
<pre><code class="language-javascript">
const response = {
  status: 200,
  data: {
    users: [
      { id: 1, name: &#x27;Alice&#x27; },
      { id: 2, name: &#x27;Bob&#x27;   }
    ]
  }
};

const { status, data: { users: [firstUser, secondUser] } } = response;
// status    = 200
// firstUser = { id: 1, name: &#x27;Alice&#x27; }
</code></pre>
<hr>
<h3 id="ascii-flow-object-destructuring">ASCII Flow — Object Destructuring</h3>
<pre><code class="language-">
const { a, b: renamed, c = default } = obj

         obj
          │
    ┌─────┼──────────┐
    ▼     ▼          ▼
  obj.a  obj.b    obj.c
    │     │          │
    ▼     ▼     exists? ──No──► default value
    a  renamed        │
                      ▼Yes
                   obj.c value
</code></pre>
<hr>
<h2 id="2-spread-syntax">2. Spread Syntax</h2>
<p>The spread operator (<code>...</code>) expands an iterable (array, object, string) into individual elements.</p>
<h3 id="core-concept">Core Concept</h3>
<pre><code class="language-">
[...iterable]  or  { ...object }

┌─────────────────┐
│  [1, 2, 3]      │   ← packed
└────────┬────────┘
         │  ... spread
         ▼
    1 ,  2 ,  3       ← individual elements
</code></pre>
<hr>
<h3 id="array-spread">Array Spread</h3>
<pre><code class="language-javascript">
// Combine arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b];
// [1, 2, 3, 4, 5, 6]

// Clone array (shallow)
const original = [1, 2, 3];
const copy = [...original];

// Insert in middle
const withMiddle = [...a, 99, ...b];
// [1, 2, 3, 99, 4, 5, 6]

// Convert string to chars
const chars = [...&quot;hello&quot;];
// [&#x27;h&#x27;,&#x27;e&#x27;,&#x27;l&#x27;,&#x27;l&#x27;,&#x27;o&#x27;]

// Convert Set to array (remove duplicates)
const unique = [...new Set([1, 2, 2, 3, 3])];
// [1, 2, 3]
</code></pre>
<hr>
<h3 id="object-spread">Object Spread</h3>
<pre><code class="language-javascript">
const defaults = { theme: &#x27;light&#x27;, lang: &#x27;en&#x27;, fontSize: 14 };
const userPrefs = { theme: &#x27;dark&#x27;, fontSize: 16 };

// Merge (later keys win)
const config = { ...defaults, ...userPrefs };
// { theme: &#x27;dark&#x27;, lang: &#x27;en&#x27;, fontSize: 16 }

// Shallow clone
const cloned = { ...original };

// Add/override properties immutably
const updated = { ...user, age: 31, role: &#x27;admin&#x27; };
</code></pre>
<hr>
<h3 id="spread-in-function-calls">Spread in Function Calls</h3>
<pre><code class="language-javascript">
const nums = [5, 1, 8, 3, 9];

Math.max(...nums);      // 9  — instead of Math.max(5,1,8,3,9)
Math.min(...nums);      // 1

function sum(x, y, z) { return x + y + z; }
const args = [1, 2, 3];
sum(...args);           // 6
</code></pre>
<hr>
<h3 id="spread-vs-rest">Spread vs Rest</h3>
<pre><code class="language-">
SPREAD  →  expands  (outside parameter list)
REST    →  collects (inside parameter list)

Spread:   const arr = [...existingArr]     expand →  [1, 2, 3]
Rest:     function fn(...args)            collect →  args = [1, 2, 3]
</code></pre>
<pre><code class="language-javascript">
// Spread — expand array into function args
console.log(...[1, 2, 3]);     // 1 2 3

// Rest — collect args into array
function sum(...nums) {
  return nums.reduce((a, b) =&gt; a + b, 0);
}
sum(1, 2, 3, 4);               // 10
</code></pre>
<hr>
<h3 id="ascii-flow-object-spread-merge">ASCII Flow — Object Spread Merge</h3>
<pre><code class="language-">
{ ...obj1, ...obj2, newKey: val }

 obj1             obj2          override
┌──────┐        ┌──────┐       ┌──────┐
│ a: 1 │        │ a: 9 │       │ c: 5 │
│ b: 2 │        │ d: 4 │       └──┬───┘
└──┬───┘        └──┬───┘          │
   │  spread       │  spread      │
   ▼               ▼              ▼
 a:1, b:2  +  a:9, d:4  +  c:5
                 │
                 ▼  (later keys overwrite earlier)
        { a:9, b:2, d:4, c:5 }
</code></pre>
<hr>
<h2 id="3-closures">3. Closures</h2>
<p>A closure is a function that <strong>remembers</strong> the variables from its outer (lexical) scope even after that outer function has returned.</p>
<h3 id="lexical-scope-chain">Lexical Scope Chain</h3>
<pre><code class="language-">
Global Scope
│
├── outerFunction()
│     │
│     ├── local variables  ◄─────────────────┐
│     │                                       │
│     └── innerFunction()  ── has access to ──┘
│               │
│               └── (returned to outside)
│                   still holds reference to
│                   outer scope variables
▼
Global
</code></pre>
<hr>
<h3 id="basic-closure">Basic Closure</h3>
<pre><code class="language-javascript">
function outer() {
  let count = 0;              // ← lives in outer&#x27;s scope

  function inner() {
    count++;                  // ← inner &quot;closes over&quot; count
    console.log(count);
  }

  return inner;
}

const counter = outer();     // outer() has returned
counter();                   // 1 — count still accessible!
counter();                   // 2
counter();                   // 3
</code></pre>
<hr>
<h3 id="closure-memory-model">Closure Memory Model</h3>
<pre><code class="language-">
outer() called → Stack frame created
                 count = 0 in heap
                 inner() defined
outer() returns → Stack frame removed
                  BUT count stays in heap
                  because inner() holds
                  a reference to it

counter ──────► inner() ──────► [[scope]] ──► { count: 0 }
                                               (lives on heap)

counter()  →  count becomes 1
counter()  →  count becomes 2
</code></pre>
<hr>
<h3 id="practical-use-cases">Practical Use Cases</h3>
<h4 id="1-data-privacy-encapsulation">1. Data Privacy / Encapsulation</h4>
<pre><code class="language-javascript">
function createBankAccount(initialBalance) {
  let balance = initialBalance;            // private — inaccessible outside

  return {
    deposit:  (amt) =&gt; { balance += amt; },
    withdraw: (amt) =&gt; { balance -= amt; },
    getBalance: ()  =&gt; balance
  };
}

const account = createBankAccount(1000);
account.deposit(500);
account.getBalance();    // 1500
console.log(balance);   // ReferenceError — truly private
</code></pre>
<h4 id="2-function-factories">2. Function Factories</h4>
<pre><code class="language-javascript">
function multiplier(factor) {
  return (number) =&gt; number * factor;    // closes over factor
}

const double = multiplier(2);
const triple = multiplier(3);

double(5);   // 10
triple(5);   // 15
</code></pre>
<h4 id="3-memoization">3. Memoization</h4>
<pre><code class="language-javascript">
function memoize(fn) {
  const cache = {};                       // closes over cache

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log(&#x27;cache hit&#x27;);
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveCalc = memoize((n) =&gt; n * n);
expensiveCalc(10);   // computed: 100
expensiveCalc(10);   // cache hit: 100
</code></pre>
<hr>
<h3 id="common-pitfall-loop-closure">Common Pitfall — Loop + Closure</h3>
<pre><code class="language-javascript">
// Bug: all log 3
for (var i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 100);
}
// 3, 3, 3 — var is shared across all closures

// Fix 1: use let (block-scoped — new binding per iteration)
for (let i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 100);
}
// 0, 1, 2 ✓

// Fix 2: IIFE to capture i
for (var i = 0; i &lt; 3; i++) {
  ((j) =&gt; setTimeout(() =&gt; console.log(j), 100))(i);
}
// 0, 1, 2 ✓
</code></pre>
<hr>
<h2 id="4-function-composition">4. Function Composition</h2>
<p>Function composition is the process of combining multiple functions so the <strong>output of one becomes the input of the next</strong> — building complex logic from small, reusable pieces.</p>
<h3 id="core-concept">Core Concept</h3>
<pre><code class="language-">
Input ──► f(x) ──► g(x) ──► h(x) ──► Output

compose(h, g, f)(x)  =  h(g(f(x)))
pipe(f, g, h)(x)     =  h(g(f(x)))   ← same, left-to-right order
</code></pre>
<hr>
<h3 id="ascii-flow">ASCII Flow</h3>
<pre><code class="language-">
         pipe(f, g, h)

  x ──► [ f ] ──► [ g ] ──► [ h ] ──► result
         │         │         │
       f(x)     g(f(x))   h(g(f(x)))


         compose(h, g, f)   ← reversed order, same result

  x ──► [ f ] ──► [ g ] ──► [ h ] ──► result
  (right-to-left in code, left-to-right in execution)
</code></pre>
<hr>
<h3 id="manual-composition">Manual Composition</h3>
<pre><code class="language-javascript">
const double  = x =&gt; x * 2;
const addTen  = x =&gt; x + 10;
const square  = x =&gt; x * x;

// Manual nesting — hard to read
const result = square(addTen(double(3)));
// double(3) = 6 → addTen(6) = 16 → square(16) = 256
</code></pre>
<hr>
<h3 id="compose-right-to-left"><code>compose</code> — Right to Left</h3>
<pre><code class="language-javascript">
const compose = (...fns) =&gt; x =&gt; fns.reduceRight((acc, fn) =&gt; fn(acc), x);

const transform = compose(square, addTen, double);
transform(3);
// double(3) → 6
// addTen(6) → 16
// square(16)→ 256
</code></pre>
<hr>
<h3 id="pipe-left-to-right-more-readable"><code>pipe</code> — Left to Right (More Readable)</h3>
<pre><code class="language-javascript">
const pipe = (...fns) =&gt; x =&gt; fns.reduce((acc, fn) =&gt; fn(acc), x);

const transform = pipe(double, addTen, square);
transform(3);
// 3 → double → 6 → addTen → 16 → square → 256
</code></pre>
<hr>
<h3 id="real-world-example-data-pipeline">Real-World Example — Data Pipeline</h3>
<pre><code class="language-javascript">
// Individual pure functions
const parseJSON        = str  =&gt; JSON.parse(str);
const extractUsers     = data =&gt; data.users;
const filterActive     = users =&gt; users.filter(u =&gt; u.isActive);
const sortByName       = users =&gt; [...users].sort((a,b) =&gt; a.name.localeCompare(b.name));
const toNameList       = users =&gt; users.map(u =&gt; u.name);

// Compose into a pipeline
const getUserNames = pipe(
  parseJSON,
  extractUsers,
  filterActive,
  sortByName,
  toNameList
);

const rawData = &#x27;{&quot;users&quot;:[{&quot;name&quot;:&quot;Carol&quot;,&quot;isActive&quot;:true},{&quot;name&quot;:&quot;Alice&quot;,&quot;isActive&quot;:true},{&quot;name&quot;:&quot;Bob&quot;,&quot;isActive&quot;:false}]}&#x27;;

getUserNames(rawData);
// [&#x27;Alice&#x27;, &#x27;Carol&#x27;]
</code></pre>
<hr>
<h3 id="ascii-flow-data-pipeline">ASCII Flow — Data Pipeline</h3>
<pre><code class="language-">
rawJSON
   │
   ▼
[ parseJSON ]
   │  { users: [...] }
   ▼
[ extractUsers ]
   │  [{ name, isActive }, ...]
   ▼
[ filterActive ]
   │  only isActive === true
   ▼
[ sortByName ]
   │  alphabetically sorted
   ▼
[ toNameList ]
   │
   ▼
[&#x27;Alice&#x27;, &#x27;Carol&#x27;]
</code></pre>
<hr>
<h3 id="partial-application-currying-enables-composition">Partial Application &amp; Currying (Enables Composition)</h3>
<pre><code class="language-javascript">
// Curried function — one arg at a time
const add = a =&gt; b =&gt; a + b;
const multiply = a =&gt; b =&gt; a * b;

const add5     = add(5);        // partially applied
const triple   = multiply(3);

const transform = pipe(add5, triple);
transform(10);   // add5(10)=15 → triple(15)=45
</code></pre>
<hr>
<h2 id="5-event-delegation">5. Event Delegation</h2>
<p>Event delegation leverages <strong>event bubbling</strong> — instead of attaching listeners to every child element, attach a single listener to a parent and determine which child triggered it.</p>
<h3 id="event-bubbling">Event Bubbling</h3>
<pre><code class="language-">
User clicks &lt;button&gt; inside &lt;li&gt; inside &lt;ul&gt;

  &lt;button&gt;  ── click fires here first
      │
      │  bubbles up
      ▼
   &lt;li&gt;     ── event reaches li
      │
      │  bubbles up
      ▼
   &lt;ul&gt;     ── single listener here catches ALL child clicks
      │
      │  bubbles up
      ▼
  &lt;body&gt;
      │
      ▼
&lt;document&gt;
</code></pre>
<hr>
<h3 id="without-delegation-inefficient">Without Delegation (Inefficient)</h3>
<pre><code class="language-javascript">
// 1000 items = 1000 listeners = memory waste
document.querySelectorAll(&#x27;li&#x27;).forEach(li =&gt; {
  li.addEventListener(&#x27;click&#x27;, (e) =&gt; {
    console.log(e.target.textContent);
  });
});
</code></pre>
<hr>
<h3 id="with-delegation-efficient">With Delegation (Efficient)</h3>
<pre><code class="language-javascript">
// 1 listener on parent handles ALL children
document.querySelector(&#x27;ul&#x27;).addEventListener(&#x27;click&#x27;, (e) =&gt; {
  const li = e.target.closest(&#x27;li&#x27;);    // guard against clicking child elements
  if (!li) return;

  console.log(li.textContent);
});
</code></pre>
<hr>
<h3 id="ascii-without-vs-with-delegation">ASCII — Without vs With Delegation</h3>
<pre><code class="language-">
WITHOUT DELEGATION:                WITH DELEGATION:

&lt;ul&gt;                               &lt;ul&gt; ◄── 1 listener here
 ├── &lt;li&gt; ◄── listener               ├── &lt;li&gt;
 ├── &lt;li&gt; ◄── listener               ├── &lt;li&gt;
 ├── &lt;li&gt; ◄── listener               ├── &lt;li&gt;
 ├── &lt;li&gt; ◄── listener               └── &lt;li&gt; (dynamically added ✓)
 └── &lt;li&gt; ◄── listener

 5 listeners, misses dynamic         1 listener, handles all
 elements added later                including future elements
</code></pre>
<hr>
<h3 id="real-world-example-dynamic-list">Real-World Example — Dynamic List</h3>
<pre><code class="language-javascript">
const taskList = document.getElementById(&#x27;task-list&#x27;);

taskList.addEventListener(&#x27;click&#x27;, (e) =&gt; {
  const target = e.target;

  // Handle complete button
  if (target.matches(&#x27;.btn-complete&#x27;)) {
    const taskId = target.closest(&#x27;[data-task-id]&#x27;).dataset.taskId;
    markComplete(taskId);
  }

  // Handle delete button
  if (target.matches(&#x27;.btn-delete&#x27;)) {
    const taskId = target.closest(&#x27;[data-task-id]&#x27;).dataset.taskId;
    deleteTask(taskId);
  }

  // Handle task label click
  if (target.matches(&#x27;.task-label&#x27;)) {
    target.closest(&#x27;li&#x27;).classList.toggle(&#x27;expanded&#x27;);
  }
});

// Works for dynamically added tasks too!
function addTask(text) {
  taskList.insertAdjacentHTML(&#x27;beforeend&#x27;, &#96;
    &lt;li data-task-id=&quot;${Date.now()}&quot;&gt;
      &lt;span class=&quot;task-label&quot;&gt;${text}&lt;/span&gt;
      &lt;button class=&quot;btn-complete&quot;&gt;✓&lt;/button&gt;
      &lt;button class=&quot;btn-delete&quot;&gt;✕&lt;/button&gt;
    &lt;/li&gt;
  &#96;);
}
</code></pre>
<hr>
<h3 id="event-flow-three-phases">Event Flow — Three Phases</h3>
<pre><code class="language-">
         CAPTURE phase (top → down)
              │
    document  │
       │      ▼
     body  ◄──┤
       │      │
      div  ◄──┤
       │      │
    button ◄──┘  TARGET phase (event fires)
       │      ┐
      div  ◄──┤
       │      │
     body  ◄──┤  BUBBLE phase (bottom → up)
       │      │
    document  ▼

addEventListener(event, fn, true)  ← capture phase
addEventListener(event, fn, false) ← bubble phase (default)
</code></pre>
<hr>
<h3 id="stoppropagation-vs-preventdefault"><code>stopPropagation</code> vs <code>preventDefault</code></h3>
<pre><code class="language-javascript">
el.addEventListener(&#x27;click&#x27;, (e) =&gt; {
  e.stopPropagation();   // stops bubbling — parent won&#x27;t receive event
  e.preventDefault();    // prevents default browser action (form submit, link nav)
  e.stopImmediatePropagation(); // stops other listeners on SAME element too
});
</code></pre>
<hr>
<h2 id="6-web-workers">6. Web Workers</h2>
<p>Web Workers run JavaScript on a <strong>background thread</strong>, keeping the main UI thread free from heavy computation.</p>
<h3 id="the-problem-without-workers">The Problem Without Workers</h3>
<pre><code class="language-">
Main Thread (single-threaded)

[Parse JS] → [DOM] → [Layout] → [Paint] → [JS Task]
                                             │
                                      Heavy computation
                                      (sorting 1M records)
                                             │
                              UI FROZEN here ▼ (no paint/interaction)
                                             │
                                       [Done] → [Paint] → UI responsive
</code></pre>
<hr>
<h3 id="with-web-workers">With Web Workers</h3>
<pre><code class="language-">
Main Thread                           Worker Thread
     │                                      │
     │── postMessage(data) ────────────────►│
     │                                      │ Heavy computation
     │   UI stays responsive                │ (no DOM access)
     │   ← user can interact                │
     │                                      │
     │◄─── postMessage(result) ─────────────│
     │                                      │
  Update UI                             terminates
</code></pre>
<hr>
<h3 id="basic-web-worker">Basic Web Worker</h3>
<p><strong>main.js</strong></p>
<pre><code class="language-javascript">
// Create worker
const worker = new Worker(&#x27;worker.js&#x27;);

// Send data to worker
worker.postMessage({ numbers: largeArray, operation: &#x27;sort&#x27; });

// Receive result
worker.onmessage = (e) =&gt; {
  console.log(&#x27;Result:&#x27;, e.data.result);
  displayResult(e.data.result);
};

// Handle errors
worker.onerror = (err) =&gt; {
  console.error(&#x27;Worker error:&#x27;, err.message);
};

// Terminate when done
worker.terminate();
</code></pre>
<p><strong>worker.js</strong></p>
<pre><code class="language-javascript">
// Worker scope — no window, no DOM
self.onmessage = (e) =&gt; {
  const { numbers, operation } = e.data;

  let result;
  if (operation === &#x27;sort&#x27;) {
    result = [...numbers].sort((a, b) =&gt; a - b);
  }

  // Send result back to main thread
  self.postMessage({ result });
};
</code></pre>
<hr>
<h3 id="transferable-objects-zero-copy-transfer">Transferable Objects (Zero-Copy Transfer)</h3>
<pre><code class="language-javascript">
// Normally postMessage COPIES data (slow for large buffers)
worker.postMessage(largeBuffer);             // copies all bytes

// Transferable — MOVES ownership, no copy (fast)
const buffer = new ArrayBuffer(1024 * 1024 * 100);  // 100MB
worker.postMessage(buffer, [buffer]);        // transfer ownership

// After transfer: buffer is detached in main thread
console.log(buffer.byteLength);             // 0 — ownership moved
</code></pre>
<hr>
<h3 id="shared-workers-multiple-tabs">Shared Workers (Multiple Tabs)</h3>
<pre><code class="language-javascript">
// shared-worker.js — shared across browser tabs/windows
const connections = [];

self.onconnect = (e) =&gt; {
  const port = e.ports[0];
  connections.push(port);

  port.onmessage = (event) =&gt; {
    // Broadcast to ALL connected tabs
    connections.forEach(p =&gt; p.postMessage(event.data));
  };
};

// In each tab:
const shared = new SharedWorker(&#x27;shared-worker.js&#x27;);
shared.port.postMessage(&#x27;Hello from tab&#x27;);
shared.port.onmessage = (e) =&gt; console.log(e.data);
</code></pre>
<hr>
<h3 id="what-workers-can-cannot-do">What Workers Can &amp; Cannot Do</h3>
<pre><code class="language-">
CAN DO                              CANNOT DO
─────────────────────────────────   ─────────────────────────────
✓ fetch / XMLHttpRequest            ✗ Access DOM
✓ setTimeout / setInterval          ✗ Access window object
✓ WebSockets                        ✗ Access document
✓ IndexedDB                         ✗ Access parent variables directly
✓ postMessage (communicate)         ✗ alert() / confirm()
✓ Import scripts (importScripts)    ✗ Synchronous localStorage
✓ Crypto API                        ✗ Access main thread&#x27;s memory
✓ Canvas (OffscreenCanvas)
</code></pre>
<hr>
<h3 id="ascii-worker-communication-loop">ASCII — Worker Communication Loop</h3>
<pre><code class="language-">
  Main Thread                       Worker Thread
  ──────────                        ─────────────
  new Worker(&#x27;w.js&#x27;)
        │
        │  postMessage({ task, data })
        ├──────────────────────────────►  onmessage fires
        │                                 │
  UI stays live ◄──────────────┐          │ processes heavy task
  user can click, scroll       │          │ (may take seconds)
                               │          │
                    onmessage  │◄─────────┤ postMessage({ result })
                               │
                         update UI
</code></pre>
<hr>
<h2 id="7-event-loop">7. Event Loop</h2>
<p>JavaScript is <strong>single-threaded</strong> but handles async operations via the Event Loop — a mechanism that coordinates the call stack, Web APIs, and task queues.</p>
<h3 id="components">Components</h3>
<pre><code class="language-">
┌─────────────────────────────────────────────────────────────────┐
│                         JS ENGINE                               │
│                                                                 │
│  ┌──────────────┐        ┌────────────────────────────────┐    │
│  │  CALL STACK  │        │          WEB APIs               │    │
│  │              │        │  setTimeout / setInterval       │    │
│  │  [main()]    │───────►│  fetch / XHR                    │    │
│  │  [fn1()]     │        │  DOM events                     │    │
│  │  [fn2()]     │        │  requestAnimationFrame          │    │
│  └──────┬───────┘        └──────────────┬──────────────────┘   │
│         │ (empty?)                       │ callback ready        │
│         │                               ▼                       │
│         │              ┌───────────────────────────────────┐   │
│         │              │  MICROTASK QUEUE  (high priority) │   │
│         │              │  Promise.then / catch / finally   │   │
│         │              │  queueMicrotask()                 │   │
│         │              │  MutationObserver                 │   │
│         │              └──────────────┬────────────────────┘   │
│         │                             │                         │
│         │              ┌──────────────▼────────────────────┐   │
│         │              │  MACROTASK QUEUE  (lower priority) │   │
│         │              │  setTimeout callbacks             │   │
│         │              │  setInterval callbacks            │   │
│         │              │  I/O callbacks                    │   │
│         │              │  UI render tasks                  │   │
│         │              └──────────────┬────────────────────┘   │
│         │                             │                         │
│         └─────────── EVENT LOOP ◄─────┘                        │
│                    (picks next task                             │
│                     when stack empty)                           │
└─────────────────────────────────────────────────────────────────┘
</code></pre>
<hr>
<h3 id="event-loop-execution-order">Event Loop — Execution Order</h3>
<pre><code class="language-">
Each &quot;tick&quot; of the event loop:

  1. Run current call stack to completion
        │
        ▼
  2. Drain ALL microtasks (Promises, queueMicrotask)
     ┌──────────────────────────────┐
     │ while microtask queue ≠ empty│
     │   execute next microtask     │
     │   (new microtasks added here │
     │    are also drained)         │
     └──────────────────────────────┘
        │
        ▼
  3. Execute ONE macrotask (setTimeout, setInterval, I/O)
        │
        ▼
  4. Render (if needed)
        │
        ▼
  5. Go to step 1
</code></pre>
<hr>
<h3 id="classic-example-execution-order">Classic Example — Execution Order</h3>
<pre><code class="language-javascript">
console.log(&#x27;1 — start&#x27;);               // sync

setTimeout(() =&gt; {
  console.log(&#x27;4 — setTimeout&#x27;);        // macrotask
}, 0);

Promise.resolve()
  .then(() =&gt; console.log(&#x27;3 — promise.then&#x27;));  // microtask

console.log(&#x27;2 — end&#x27;);                 // sync

// Output:
// 1 — start
// 2 — end
// 3 — promise.then    ← microtask runs before macrotask
// 4 — setTimeout      ← macrotask runs last
</code></pre>
<hr>
<h3 id="step-by-step-trace">Step-by-Step Trace</h3>
<pre><code class="language-">
Step 1: console.log(&#x27;1 — start&#x27;)
  Stack: [main]           → logs &quot;1 — start&quot;

Step 2: setTimeout(fn, 0)
  Stack: [main]           → registers fn in Web API timer
  Timer expires → fn pushed to Macrotask Queue

Step 3: Promise.resolve().then(fn)
  Stack: [main]           → fn pushed to Microtask Queue

Step 4: console.log(&#x27;2 — end&#x27;)
  Stack: [main]           → logs &quot;2 — end&quot;

Step 5: main() returns — stack EMPTY
  Event loop checks: any microtasks?
  → YES → runs promise.then → logs &quot;3 — promise.then&quot;
  Microtask queue now empty

Step 6: Event loop picks next macrotask
  → setTimeout callback → logs &quot;4 — setTimeout&quot;
</code></pre>
<hr>
<h3 id="microtask-vs-macrotask">Microtask vs Macrotask</h3>
<pre><code class="language-">
MICROTASKS (run after every task, before next macrotask)
  • Promise .then / .catch / .finally
  • async/await (await resumes as microtask)
  • queueMicrotask()
  • MutationObserver callbacks

MACROTASKS (one per event loop tick)
  • setTimeout()
  • setInterval()
  • setImmediate() (Node.js)
  • I/O callbacks
  • UI render / paint
  • MessageChannel
</code></pre>
<hr>
<h3 id="asyncawait-under-the-hood">async/await Under the Hood</h3>
<pre><code class="language-javascript">
async function fetchData() {
  console.log(&#x27;A&#x27;);                          // sync
  const data = await fetch(&#x27;/api/data&#x27;);     // suspends here
  console.log(&#x27;B&#x27;);                          // resumes as microtask
}

fetchData();
console.log(&#x27;C&#x27;);

// Output: A → C → B
</code></pre>
<pre><code class="language-">
fetchData() called
  └─ logs &quot;A&quot;
  └─ hits await fetch(...)
       │
       ├─ fetch handed to Web API
       │
       └─ fetchData() SUSPENDS
            returns to caller

console.log(&#x27;C&#x27;) executes → &quot;C&quot;

... fetch completes ...

Microtask queued: resume fetchData()
  └─ logs &quot;B&quot;
</code></pre>
<hr>
<h3 id="blocking-the-event-loop-what-not-to-do">Blocking the Event Loop (What NOT to Do)</h3>
<pre><code class="language-javascript">
// BAD — blocks everything for 5 seconds
function blockingLoop() {
  const end = Date.now() + 5000;
  while (Date.now() &lt; end) {}          // UI frozen, no events processed
}

// GOOD — break into chunks using setTimeout
function nonBlockingLoop(items, index = 0) {
  if (index &gt;= items.length) return;

  processItem(items[index]);

  setTimeout(() =&gt; nonBlockingLoop(items, index + 1), 0);
  // yields to event loop between each item
}

// BEST — use Web Worker for heavy computation
const worker = new Worker(&#x27;heavy.js&#x27;);
worker.postMessage(items);
</code></pre>
<hr>
<h3 id="full-event-loop-ascii-with-async-example">Full Event Loop ASCII — With Async Example</h3>
<pre><code class="language-">
CODE:
  setTimeout(A, 0)
  fetch(&#x27;/api&#x27;).then(B)
  Promise.resolve().then(C)
  console.log(D)

TIMELINE:
  ┌─────┐  ┌─────────────────┐  ┌──────────────┐  ┌─────────────┐
  │Stack│  │   Web APIs      │  │  Microtasks  │  │  Macrotasks │
  └──┬──┘  └────────┬────────┘  └──────┬───────┘  └──────┬──────┘
     │               │                  │                  │
  [D runs]      setTimeout→timer        C queued    A in queue
  [D logs]      fetch→network           B (after fetch)
     │               │                  │                  │
  stack empty        │                  │                  │
     │               │        ◄─────────┘                  │
     │          drain microtasks: C runs, logs C            │
     │          fetch completes → B runs, logs B            │
     │               │                                      │
     │◄──────────────────────────────────────────────────── │
     │          pick macrotask: A runs, logs A
</code></pre>
<hr>
<h3 id="summary-priority-order">Summary — Priority Order</h3>
<pre><code class="language-">
Highest ──► Synchronous code (call stack)
            │
            ▼
         Microtasks (ALL of them, before anything else)
            │
            ▼
         Macrotasks (one at a time)
            │
            ▼
         Render / Paint (browser, between macrotasks)
            │
Lowest  ──► requestIdleCallback (when truly idle)
</code></pre>
<hr>
<h2 id="quick-reference">Quick Reference</h2>
<table>
<thead><tr>
<th>Concept</th>
<th>One-liner</th>
<th>Key Method/Syntax</th>
</tr></thead><tbody>
<tr>
<td><strong>Destructuring</strong></td>
<td>Unpack arrays/objects into variables</td>
<td><code>const { a } = obj</code> / <code>const [x] = arr</code></td>
</tr>
<tr>
<td><strong>Spread</strong></td>
<td>Expand iterables into elements</td>
<td><code>[...arr]</code> / <code>{...obj}</code></td>
</tr>
<tr>
<td><strong>Closures</strong></td>
<td>Inner function remembers outer scope</td>
<td>Function returning function</td>
</tr>
<tr>
<td><strong>Composition</strong></td>
<td>Chain pure functions, output → input</td>
<td><code>pipe(f, g, h)(x)</code></td>
</tr>
<tr>
<td><strong>Event Delegation</strong></td>
<td>One parent listener for all children</td>
<td><code>e.target.closest()</code></td>
</tr>
<tr>
<td><strong>Web Workers</strong></td>
<td>Background thread for heavy tasks</td>
<td><code>new Worker(&#x27;w.js&#x27;)</code> + <code>postMessage</code></td>
</tr>
<tr>
<td><strong>Event Loop</strong></td>
<td>Async coordination: stack + queues</td>
<td>Microtasks before macrotasks</td>
</tr>
</tbody></table>
<hr>
<p><em>Last updated: March 2026</em></p>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = javascriptCoreConceptsContentData;
}
