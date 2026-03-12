// Javascript Core Concepts - Table of Contents Data
const javascriptCoreConceptsTocData = `<a href="#javascript-core-concepts-deep-dive" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="javascript-core-concepts-deep-dive">JavaScript Core Concepts — Deep Dive</a>
<a href="#table-of-contents" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="table-of-contents">Table of Contents</a>
<a href="#1-destructuring-assignment" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="1-destructuring-assignment">1. Destructuring Assignment</a>
<a href="#how-it-works" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="how-it-works">How It Works</a>
<a href="#array-destructuring" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="array-destructuring">Array Destructuring</a>
<a href="#object-destructuring" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="object-destructuring">Object Destructuring</a>
<a href="#function-parameter-destructuring" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="function-parameter-destructuring">Function Parameter Destructuring</a>
<a href="#nested-mixed-destructuring" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="nested-mixed-destructuring">Nested + Mixed Destructuring</a>
<a href="#ascii-flow-object-destructuring" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-flow-object-destructuring">ASCII Flow — Object Destructuring</a>
<a href="#2-spread-syntax" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="2-spread-syntax">2. Spread Syntax</a>
<a href="#core-concept" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="core-concept">Core Concept</a>
<a href="#array-spread" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="array-spread">Array Spread</a>
<a href="#object-spread" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="object-spread">Object Spread</a>
<a href="#spread-in-function-calls" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="spread-in-function-calls">Spread in Function Calls</a>
<a href="#spread-vs-rest" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="spread-vs-rest">Spread vs Rest</a>
<a href="#ascii-flow-object-spread-merge" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-flow-object-spread-merge">ASCII Flow — Object Spread Merge</a>
<a href="#3-closures" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="3-closures">3. Closures</a>
<a href="#lexical-scope-chain" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="lexical-scope-chain">Lexical Scope Chain</a>
<a href="#basic-closure" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="basic-closure">Basic Closure</a>
<a href="#closure-memory-model" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="closure-memory-model">Closure Memory Model</a>
<a href="#practical-use-cases" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="practical-use-cases">Practical Use Cases</a>
<a href="#common-pitfall-loop-closure" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="common-pitfall-loop-closure">Common Pitfall — Loop + Closure</a>
<a href="#4-function-composition" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="4-function-composition">4. Function Composition</a>
<a href="#core-concept" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="core-concept">Core Concept</a>
<a href="#ascii-flow" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-flow">ASCII Flow</a>
<a href="#manual-composition" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="manual-composition">Manual Composition</a>
<a href="#compose-right-to-left" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="compose-right-to-left"><code>compose</code> — Right to Left</a>
<a href="#pipe-left-to-right-more-readable" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="pipe-left-to-right-more-readable"><code>pipe</code> — Left to Right (More Readable)</a>
<a href="#real-world-example-data-pipeline" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="real-world-example-data-pipeline">Real-World Example — Data Pipeline</a>
<a href="#ascii-flow-data-pipeline" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-flow-data-pipeline">ASCII Flow — Data Pipeline</a>
<a href="#partial-application-currying-enables-composition" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="partial-application-currying-enables-composition">Partial Application &amp; Currying (Enables Composition)</a>
<a href="#5-event-delegation" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="5-event-delegation">5. Event Delegation</a>
<a href="#event-bubbling" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="event-bubbling">Event Bubbling</a>
<a href="#without-delegation-inefficient" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="without-delegation-inefficient">Without Delegation (Inefficient)</a>
<a href="#with-delegation-efficient" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="with-delegation-efficient">With Delegation (Efficient)</a>
<a href="#ascii-without-vs-with-delegation" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-without-vs-with-delegation">ASCII — Without vs With Delegation</a>
<a href="#real-world-example-dynamic-list" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="real-world-example-dynamic-list">Real-World Example — Dynamic List</a>
<a href="#event-flow-three-phases" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="event-flow-three-phases">Event Flow — Three Phases</a>
<a href="#stoppropagation-vs-preventdefault" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="stoppropagation-vs-preventdefault"><code>stopPropagation</code> vs <code>preventDefault</code></a>
<a href="#6-web-workers" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="6-web-workers">6. Web Workers</a>
<a href="#the-problem-without-workers" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="the-problem-without-workers">The Problem Without Workers</a>
<a href="#with-web-workers" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="with-web-workers">With Web Workers</a>
<a href="#basic-web-worker" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="basic-web-worker">Basic Web Worker</a>
<a href="#transferable-objects-zero-copy-transfer" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="transferable-objects-zero-copy-transfer">Transferable Objects (Zero-Copy Transfer)</a>
<a href="#shared-workers-multiple-tabs" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="shared-workers-multiple-tabs">Shared Workers (Multiple Tabs)</a>
<a href="#what-workers-can-cannot-do" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="what-workers-can-cannot-do">What Workers Can &amp; Cannot Do</a>
<a href="#ascii-worker-communication-loop" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-worker-communication-loop">ASCII — Worker Communication Loop</a>
<a href="#7-event-loop" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="7-event-loop">7. Event Loop</a>
<a href="#components" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="components">Components</a>
<a href="#event-loop-execution-order" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="event-loop-execution-order">Event Loop — Execution Order</a>
<a href="#classic-example-execution-order" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="classic-example-execution-order">Classic Example — Execution Order</a>
<a href="#step-by-step-trace" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="step-by-step-trace">Step-by-Step Trace</a>
<a href="#microtask-vs-macrotask" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="microtask-vs-macrotask">Microtask vs Macrotask</a>
<a href="#asyncawait-under-the-hood" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="asyncawait-under-the-hood">async/await Under the Hood</a>
<a href="#blocking-the-event-loop-what-not-to-do" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="blocking-the-event-loop-what-not-to-do">Blocking the Event Loop (What NOT to Do)</a>
<a href="#full-event-loop-ascii-with-async-example" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="full-event-loop-ascii-with-async-example">Full Event Loop ASCII — With Async Example</a>
<a href="#summary-priority-order" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="summary-priority-order">Summary — Priority Order</a>
<a href="#quick-reference" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="quick-reference">Quick Reference</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = javascriptCoreConceptsTocData;
}
