// Intellijshortcuts - Content Data
const intellijshortcutsContentData = `<h1 id="shrotcuts">Shrotcuts</h1>
<ul>
<li><code>Ctrl+Shift+R</code> -&gt; <a href="https://www.jetbrains.com/help/idea/finding-and-replacing-text-in-project.html#replace<em>search</em>string<em>in</em>project">Find and Replace</a></li>
<li><code>Ctrl+Shift+L</code> -&gt; Format Code</li>
<li><code>Ctrl+Alt+L</code>   -&gt; Reformat Format Code</li>
<li><code>Ctrl+J</code>     -&gt; To see the list of suggestions</li>
<li><code>Ctrl+Shift+O</code> -&gt; Organize Imports</li>
<li><code>Ctrl+Shift+P</code> -&gt; Generate Getters and Setters</li>
<li><code>Ctrl+Shift+M</code> -&gt; Generate Constructor</li>
<li><code>Ctrl+Shift+V</code> -&gt; Select text you have previously copied</li>
<li><code>Ctrl+Shift+Enter</code> -&gt; Make the declaration complete</li>
<li><code>Ctrl+Shift+E</code> -&gt; Navigate to recent locations</li>
<li><code>Ctrl+Shift+I</code> -&gt; Show Quick Definition</li>
</ul>
<h2 id="basics-to-know">Basics To Know</h2>
<ul>
<li>Updating pom.xml, give run as Maven clean, then Maven install and then Run as spring boot application.</li>
</ul>
<h2 id="intellij-settings">intellij Settings</h2>
<h3 id="shortcuts">Shortcuts</h3>
<ul>
<li>Run as spring boot application: Ctrl+Shift+F10</li>
<li>See the inherited members: Ctrl+F12</li>
<li>See the overridden members: Ctrl+Shift+F12</li>
<li>See the usages: Ctrl+F7</li>
</ul>
<hr>
<h3 id="intellij-debug-enable">intellij Debug enable</h3>
<h4 id="what-you-should-do-to-get-changes-reflected-in-debug-mode">✅ What you should do to get changes reflected in debug mode:</h4>
<ul>
<li><strong>Enable &quot;Build project automatically&quot;</strong>:</li>
<li><strong>File &gt; Settings &gt; Build, Execution, Deployment &gt; Compiler</strong></li>
<li>✅ Check <strong>Build project automatically</strong>.</li>
</ul>
<ul>
<li><strong>Enable &quot;HotSwap&quot; when debugging</strong>:</li>
<li><strong>File &gt; Settings &gt; Build, Execution, Deployment &gt; Debugger &gt; HotSwap</strong></li>
<li>Set it to <strong>&quot;Always reload classes&quot;</strong> (instead of &quot;Ask&quot; or &quot;Never&quot;).</li>
</ul>
<ul>
<li><strong>(IMPORTANT)</strong>: When you change Java files:</li>
<li>Save the file (<code>Ctrl+S</code> / <code>Cmd+S</code>).</li>
<li>Press <strong>Ctrl+F9</strong> (<code>Build Project</code>) to compile changes.</li>
<li>IntelliJ should <strong>HotSwap</strong> the modified classes automatically into the running debug session.</li>
</ul>
<ul>
<li><strong>If HotSwap doesn&#x27;t happen automatically</strong>:</li>
<li>In Debug mode, click on this icon in the toolbar: 🔄 (Reload Changed Classes).</li>
</ul>
<hr>
<p><strong>Still not reflecting?</strong></p>
<pre><code class="language-properties">
spring.devtools.restart.enabled=false
</code></pre>
<hr>
<h3 id="to-add-all-the-project-to-intellij-as-spring-boot">To Add all the project to intellij as spring boot</h3>
<ul>
<li>Right click on pom.xml on each project and select add to maven module</li>
<li>For gradle, something similar to that.</li>
</ul>
<h3 id="build-gradle-commands">Build &amp; Gradle Commands</h3>
<p>Here&#x27;s a collection of common Gradle and shell commands for building, analyzing, and managing your project.</p>
<hr>
<h4 id="dependency-management-analysis">🛠️ Dependency Management &amp; Analysis</h4>
<table>
<thead><tr>
<th>Command</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>./gradlew buildHealth</code></td>
<td>Analyzes dependencies to find unused or misconfigured ones. Requires the <code>com.autonomousapps.dependency-analysis</code> plugin.</td>
</tr>
<tr>
<td><code>./gradlew dependencies</code></td>
<td>Displays the project&#x27;s dependency tree. Add <code>--refresh-dependencies</code> to force a refresh from repositories.</td>
</tr>
<tr>
<td><code>./gradlew dependencyCheckAnalyze</code></td>
<td>Runs OWASP dependency-check to scan for known vulnerabilities in project dependencies. Use <code>--info</code> for more detailed logs.</td>
</tr>
</tbody></table>
<hr>
<h4 id="code-quality-formatting">✨ Code Quality &amp; Formatting</h4>
<table>
<thead><tr>
<th>Command</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>./gradlew spotlessCheck</code></td>
<td>Checks if the code formatting matches the rules defined by Spotless.</td>
</tr>
<tr>
<td><code>./gradlew spotlessApply</code></td>
<td>Automatically reformats the code to comply with Spotless rules.</td>
</tr>
<tr>
<td><code>./gradlew sonar</code></td>
<td>Executes a SonarQube analysis to find code quality issues, bugs, and vulnerabilities.</td>
</tr>
</tbody></table>
<hr>
<h4 id="building-compiling">🏗️ Building &amp; Compiling</h4>
<table>
<thead><tr>
<th>Command</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>./gradlew clean build</code></td>
<td>Cleans the <code>build</code> directory and then compiles, tests, and assembles the project.</td>
</tr>
<tr>
<td><code>./gradlew build --scan</code></td>
<td>Builds the project and generates a <strong>build scan</strong>, providing deep insights into the build process for debugging and optimization.</td>
</tr>
<tr>
<td><code>./gradlew build --no-daemon --console=plain</code></td>
<td>Runs a build without using the Gradle Daemon, with simple, non-rich console output.</td>
</tr>
</tbody></table>
<hr>
<h4 id="auditing-searching">🔍 Auditing &amp; Searching</h4>
<table>
<thead><tr>
<th>Command</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>grep -i &#x27;security&#x27; specs/product-service-openapi.yml</code></td>
<td>Searches for &quot;security&quot; (case-insensitive) within the OpenAPI spec. Useful for auditing security definitions.</td>
</tr>
<tr>
<td>`grep -E -i &#x27;security\</td>
<td>insecure&#x27; specs/product-service-openapi.yml`</td>
<td>An efficient <code>grep</code> command to search for multiple patterns (e.g., &quot;security&quot; or &quot;insecure&quot;) in the spec file at once.</td>
</tr>
</tbody></table>
<hr>
<h4 id="gradle-tasks-wrapper">⚙️ Gradle Tasks &amp; Wrapper</h4>
<table>
<thead><tr>
<th>Command</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><code>./gradlew tasks</code></td>
<td>Lists the main tasks available for the project. Use <code>--all</code> to see a complete list of all tasks.</td>
</tr>
<tr>
<td><code>./gradlew tasks --no-daemon</code></td>
<td>Lists tasks without starting or using the Gradle Daemon.</td>
</tr>
<tr>
<td><code>./gradlew wrapper</code></td>
<td>Generates or updates the Gradle wrapper scripts (<code>gradlew</code> and <code>gradlew.bat</code>).</td>
</tr>
</tbody></table>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = intellijshortcutsContentData;
}
