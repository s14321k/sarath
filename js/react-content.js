// React - Content Data
const reactContentData = `<details open>
<summary><strong>📘 React Overview</strong></summary>
<p>🔗 Interview Questions:</p>
<ul>
<li><a href="../md2/ReactQuestionAnswers.md">Local Link</a></li>
<li><a href="https://www.simplilearn.com/tutorials/reactjs-tutorial/reactjs-interview-questions">Simplilearn Questions</a></li>
</ul>
<p>🧭 References:</p>
<ul>
<li><a href="https://react.dev/blog/2023/03/16/introducing-react-dev">React Dev Blog</a></li>
<li><a href="https://www.educative.io/answers/how-to-implement-pagination-in-reactjs">Pagination in React</a></li>
</ul>
</details>
<hr>
<details open>
<summary><strong>⚙️ Installation</strong></summary>
<ul>
<li>Install <a href="https://nodejs.org/">Node.js</a></li>
<li>Use any IDE (e.g., VS Code)</li>
</ul>
</details>
<hr>
<details open>
<summary><strong>🚀 Create React App</strong></summary>
<ul>
<li>Open a terminal in your folder.</li>
</ul>
<ul>
<li>Run:</li>
</ul>
<pre><code class="language-bash">
npx create-react-app react-app-name
</code></pre>
<ul>
<li><code>npx</code>: Executes a package without installing globally.</li>
<li>Alternatively: <code>npm install -g create-react-app</code> (global installation)</li>
</ul>
<ul>
<li>Navigate:</li>
</ul>
<pre><code class="language-bash">
cd react-app-name
</code></pre>
<ul>
<li>Start:</li>
</ul>
<pre><code class="language-bash">
npm start
</code></pre>
</details>
<hr>
<details open>
<summary><strong>🧱 React Basics</strong></summary>
<details open>
<summary><strong>📦 Components</strong></summary>
<ul>
<li>Components describe parts of UI and are reusable.</li>
<li>Two types:</li>
</ul>
<ul>
<li><strong>Stateless Functional Component</strong></li>
<li><strong>Stateful Class Component</strong></li>
<li>Naming: Start with a capital letter (<code>App</code>, <code>Header</code>)</li>
</ul>
<hr>
<details open>
<summary><strong>🧩 Functional (Stateless) Components</strong></summary>
<ul>
<li>JavaScript functions returning JSX.</li>
<li>Preferable due to:</li>
</ul>
<ul>
<li>No use of <code>this</code></li>
<li>Simple and readable</li>
<li>UI-focused</li>
</ul>
<pre><code class="language-mermaid">
graph LR
A[Props] --&gt; B[Function] --&gt; C[JSX]
</code></pre>
</details>
<details open>
<summary><strong>🧠 Class (Stateful) Components</strong></summary>
<ul>
<li>Extend <code>React.Component</code></li>
<li>Use <code>this.state</code> and lifecycle methods</li>
</ul>
<pre><code class="language-mermaid">
graph LR
A[Props] --&gt; B[Class] --&gt; C[JSX]
</code></pre>
</details>
</details>
<hr>
<details open>
<summary><strong>📐 JSX (JavaScript XML)</strong></summary>
<ul>
<li>JSX allows HTML in JS</li>
<li>Declarative approach to UI building</li>
</ul>
<p><strong>Imperative vs Declarative</strong></p>
<ul>
<li>Imperative: <code>document.getElementById()</code></li>
<li>Declarative: <code>&lt;h1&gt;{state.title}&lt;/h1&gt;</code></li>
</ul>
</details>
<details open>
<summary><strong>🧩 React Fragments</strong></summary>
<ul>
<li>Use empty tags <code>&lt;&gt; ... &lt;/&gt;</code> instead of extra <code>&lt;div&gt;</code> to group children</li>
</ul>
<pre><code class="language-jsx">
&lt;&gt;
  &lt;h1&gt;Title&lt;/h1&gt;
  &lt;p&gt;Description&lt;/p&gt;
&lt;/&gt;
</code></pre>
</details>
<details open>
<summary><strong>⚓ React Hooks (Since 2018)</strong></summary>
<ul>
<li>Use state/lifecycle in function components</li>
<li>E.g., <code>useState</code>, <code>useEffect</code></li>
</ul>
<p>📌 Rules of Hooks:</p>
<ul>
<li>Call at the <strong>top level</strong></li>
<li>Do not use inside loops or conditions</li>
<li>Only call from <strong>React functions</strong></li>
</ul>
</details>
<details open>
<summary><strong>📬 Props</strong></summary>
<ul>
<li>Props = Parameters</li>
<li>Immutable (read-only)</li>
<li>Passed from parent to child</li>
<li>Can be strings, arrays, objects, functions, emojis</li>
</ul>
</details>
<details open>
<summary><strong>📦 State</strong></summary>
<ul>
<li>State = Local component data</li>
<li>Mutable, changes trigger re-render</li>
<li>Can hold strings, booleans, arrays, objects</li>
</ul>
<p>🧠 Use case:</p>
<ul>
<li>Props are fixed</li>
<li>State changes dynamically</li>
</ul>
<p>📌 State Rules:</p>
<ul>
<li>Declare at the top</li>
<li>Don’t use inside conditions/loops</li>
<li>Don’t merge automatically like class components</li>
</ul>
</details>
<details open>
<summary><strong>🌐 DOM vs Virtual DOM</strong></summary>
<ul>
<li>React doesn&#x27;t directly manipulate the real DOM.</li>
<li>JSX combines HTML, JS, and CSS efficiently using Virtual DOM for fast updates.</li>
</ul>
</details>
</details>
<hr>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = reactContentData;
}
