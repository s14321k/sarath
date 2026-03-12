// Cicd - Content Data
const cicdContentData = `<h2 id="jenkins-alternatives-for-cicd">Jenkins Alternatives for CI/CD</h2>
<ul>
<li>Gilhub actions</li>
<li>GitLab CI/CD</li>
</ul>
<p><a href="https://youtu.be/7aSe1HQ2lXo?si=koGlTYcQP2O4Wevw">Tekton vs Jenkins</a></p>
<p><img src="../images/CICD/CICD_Pipelines.png" alt="CI/CD Pipelines"></p>
<h1 id="production-grade-devops-cicd-architecture">🚀 Production-Grade DevOps CI/CD Architecture</h1>
<p>This document describes a <strong>real-world, production-ready DevOps CI/CD architecture</strong> that is <strong>simple, automated, reliable, and scalable</strong>.</p>
<hr>
<h2 id="high-level-overview">🧩 High-Level Overview</h2>
<p>A developer pushes code to <strong>GitHub/GitLab</strong>, which automatically triggers <strong>Jenkins</strong>.  </p>
<p>Jenkins builds, tests, containerizes, and deploys the application to <strong>Amazon EKS (Kubernetes)</strong>.  </p>
<p>All infrastructure is provisioned using <strong>Terraform (IaC)</strong>.  </p>
<p>The application is exposed securely via <strong>ALB Ingress</strong>, monitored using <strong>Prometheus, Grafana, and CloudWatch</strong>, and alerts are delivered through <strong>SNS</strong>.</p>
<p>This setup ensures:</p>
<ul>
<li>Zero-downtime deployments</li>
<li>Automated infrastructure</li>
<li>Observability and reliability</li>
<li>Fast feedback loops</li>
</ul>
<hr>
<h2 id="cicd-workflow-jenkins">🔁 CI/CD Workflow (Jenkins)</h2>
<details>
<summary><strong>CI/CD Flow Details</strong></summary>
<ul>
<li>Developer pushes code to <strong>GitHub / GitLab</strong></li>
<li>Webhook triggers <strong>Jenkins pipeline</strong></li>
<li>Jenkins performs:</li>
<li>Source code checkout</li>
<li>Build and unit tests</li>
<li>Docker image build</li>
<li>Push image to AWS container registry (ECR)</li>
<li>Deploy application to Kubernetes (EKS)</li>
</ul>
<p>Jenkins acts as the <strong>central CI/CD engine</strong>, enforcing consistency and automation across environments.</p>
</details>
<hr>
<h2 id="infrastructure-as-code-terraform">🏗️ Infrastructure as Code (Terraform)</h2>
<details>
<summary><strong>Infrastructure Provisioning</strong></summary>
<p>All infrastructure is provisioned automatically using <strong>Terraform</strong>, ensuring repeatability and version control.</p>
<p>Terraform provisions:</p>
<ul>
<li>VPC and networking</li>
<li>Public and private subnets</li>
<li>Amazon EKS cluster</li>
<li>Worker node groups</li>
<li>IAM roles and policies</li>
<li>Application Load Balancer (ALB)</li>
<li>Monitoring and logging components</li>
</ul>
<p>✅ No manual setup  </p>
<p>✅ Fully reproducible environments  </p>
<p>✅ Easy scaling and teardown</p>
</details>
<hr>
<h2 id="kubernetes-on-amazon-eks">☸️ Kubernetes on Amazon EKS</h2>
<details>
<summary><strong>Application Architecture</strong></summary>
<p>The application runs on <strong>Amazon EKS</strong>, following containerized microservice principles:</p>
<ul>
<li>Frontend Pod</li>
<li>Backend Pod</li>
<li>Kubernetes Services for internal communication</li>
</ul>
<p>Kubernetes handles:</p>
<ul>
<li>Scheduling</li>
<li>Self-healing</li>
<li>Rolling updates</li>
<li>Horizontal scaling</li>
</ul>
</details>
<hr>
<h2 id="ingress-traffic-management">🌐 Ingress &amp; Traffic Management</h2>
<details>
<summary><strong>Ingress & Load Balancing</strong></summary>
<ul>
<li><strong>AWS Application Load Balancer (ALB)</strong> is used as the Kubernetes Ingress</li>
<li>Securely exposes the application to the internet</li>
<li>Enables:</li>
<li>Zero-downtime deployments</li>
<li>Path-based routing</li>
<li>TLS termination</li>
</ul>
<p>This ensures high availability and seamless user experience.</p>
</details>
<hr>
<h2 id="data-layer-outside-kubernetes">🗄️ Data Layer (Outside Kubernetes)</h2>
<details>
<summary><strong>Database & Storage Design</strong></summary>
<p>Best practice: <strong>Databases are not deployed inside Kubernetes</strong></p>
<ul>
<li><strong>Amazon RDS</strong></li>
<li>Relational data</li>
<li>Backups, failover, managed scaling</li>
<li><strong>Amazon DynamoDB</strong></li>
<li>Key-value storage</li>
<li>Session management</li>
<li>Low-latency access</li>
</ul>
<p>This design improves durability, scalability, and operational simplicity.</p>
</details>
<hr>
<h2 id="monitoring-observability">📊 Monitoring &amp; Observability</h2>
<details>
<summary><strong>Monitoring Stack</strong></summary>
<p>Monitoring and reliability are built-in:</p>
<ul>
<li><strong>Prometheus</strong></li>
<li>Collects application and cluster metrics</li>
<li><strong>Grafana</strong></li>
<li>Visual dashboards</li>
<li>Performance and health monitoring</li>
<li><strong>Amazon CloudWatch</strong></li>
<li>Centralized logs</li>
<li>Alarms and metrics</li>
</ul>
<p>Teams can detect issues <strong>before users are impacted</strong>.</p>
</details>
<hr>
<h2 id="alerts-incident-response">🚨 Alerts &amp; Incident Response</h2>
<details>
<summary><strong>Alerting & Notifications</strong></summary>
<p>When something breaks:</p>
<ul>
<li>Alerts are triggered in CloudWatch / Prometheus</li>
<li>Notifications flow through <strong>Amazon SNS</strong></li>
<li>Delivered via:</li>
<li>Email</li>
<li>Slack</li>
</ul>
<p>This enables rapid incident response and proactive operations.</p>
</details>
<hr>
<h2 id="why-this-is-real-devops">✅ Why This Is Real DevOps</h2>
<details>
<summary><strong>Key DevOps Principles</strong></summary>
<p>✔ Continuous Integration &amp; Deployment  </p>
<p>✔ Infrastructure as Code  </p>
<p>✔ Kubernetes orchestration  </p>
<p>✔ Monitoring &amp; alerting  </p>
<p>✔ Secure, scalable, production-ready architecture</p>
<p>This is how <strong>REAL DevOps</strong> works in production.</p>
</details>
<hr>
<h2 id="final-takeaway">🏁 Final Takeaway</h2>
<details>
<summary><strong>Closing Summary</strong></summary>
<p>This architecture represents a <strong>battle-tested DevOps setup</strong> used in real production environments.  </p>
<p>It combines automation, observability, scalability, and reliability—allowing teams to move fast <strong>without breaking things</strong>.</p>
</details>
<h2 id="comparison-of-jenkins-terraform-and-kubernetes-in-a-table-format">Comparison<strong> of </strong>Jenkins, Terraform, and Kubernetes** in a table format:</h2>
<table>
<thead><tr>
<th>Feature</th>
<th><strong>Jenkins</strong> 🛠️ (CI/CD)</th>
<th><strong>Terraform</strong> 🌍 (IaC)</th>
<th><strong>Kubernetes</strong> ☸️ (Container Orchestration)</th>
</tr></thead><tbody>
<tr>
<td><strong>Purpose</strong></td>
<td>CI/CD Automation (Build, Test, Deploy)</td>
<td>Infrastructure as Code (Provisioning &amp; Management)</td>
<td>Container Orchestration (Deploy &amp; Manage Containers)</td>
</tr>
<tr>
<td><strong>Primary Function</strong></td>
<td>Automates software build, test, and deployment pipelines</td>
<td>Creates and manages cloud infrastructure</td>
<td>Manages and scales containerized applications</td>
</tr>
<tr>
<td><strong>Configuration Language</strong></td>
<td>Groovy-based Jenkinsfile (Pipeline as Code)</td>
<td>HashiCorp Configuration Language (HCL)</td>
<td>YAML (Manifest files)</td>
</tr>
<tr>
<td><strong>Execution Model</strong></td>
<td>Job-based execution (build &amp; deploy workflows)</td>
<td>Declarative state-based execution</td>
<td>Declarative (Desired state)</td>
</tr>
<tr>
<td><strong>State Management</strong></td>
<td>No state management</td>
<td>Maintains infrastructure state (<code>.tfstate</code>)</td>
<td>Maintains cluster state using <strong>etcd</strong></td>
</tr>
<tr>
<td><strong>Installation</strong></td>
<td>Self-hosted or cloud-based Jenkins server</td>
<td>CLI tool that runs locally or in pipelines</td>
<td>Runs on VMs, Bare Metal, or Cloud</td>
</tr>
<tr>
<td><strong>Integration</strong></td>
<td>Works with Git, Maven, Docker, Kubernetes, etc.</td>
<td>Works with AWS, Azure, GCP, Kubernetes, etc.</td>
<td>Works with Docker, Helm, CI/CD tools</td>
</tr>
<tr>
<td><strong>Declarative vs Imperative</strong></td>
<td>Primarily Imperative (Jenkinsfile defines steps)</td>
<td>Declarative (Defines end state of infrastructure)</td>
<td>Declarative (Manages workloads in Kubernetes)</td>
</tr>
<tr>
<td><strong>Key Features</strong></td>
<td>CI/CD Pipelines, Plugin ecosystem, Job scheduling</td>
<td>Infrastructure provisioning, State management, Multi-cloud support</td>
<td>Load balancing, Auto-scaling, Service discovery, Self-healing</td>
</tr>
<tr>
<td><strong>Best For</strong></td>
<td>Automating software delivery (CI/CD)</td>
<td>Managing infrastructure resources in the cloud</td>
<td>Deploying &amp; managing containerized applications</td>
</tr>
<tr>
<td><strong>Commonly Used With</strong></td>
<td>Terraform, Kubernetes, Docker, GitHub Actions</td>
<td>Jenkins, Kubernetes, AWS, GCP, Azure</td>
<td>Terraform, Jenkins, Docker, Helm</td>
</tr>
</tbody></table>
<p><strong>✅ Key Takeaway</strong> </p>
<ul>
<li><strong>Jenkins</strong> automates software deployment (CI/CD).  </li>
<li><strong>Terraform</strong> provisions and manages cloud infrastructure (IaC).  </li>
<li><strong>Kubernetes</strong> manages and orchestrates containerized applications.  </li>
</ul>
<p>💡 <strong>They can work together</strong>:  </p>
<p>✅ <strong>Jenkins</strong> triggers <strong>Terraform</strong> to provision infrastructure.  </p>
<p>✅ <strong>Terraform</strong> deploys <strong>Kubernetes clusters</strong>.  </p>
<p>✅ <strong>Jenkins</strong> then deploys applications onto <strong>Kubernetes</strong>. 🚀  </p>
<p>Let me know if you need a specific workflow example! 😊</p>
<h1 id="rollback-strategy-in-devops">🔄 Rollback Strategy in DevOps</h1>
<details open>
<summary><strong>🔄 Rollback Strategy in DevOps</strong></summary>
<p>In DevOps, ensuring a <strong>rollback strategy</strong> is critical for maintaining application stability during failed deployments.</p>
<p>A solid rollback plan reduces downtime and prevents broken code from affecting users.</p>
<hr>
<details open>
<summary>1️⃣ ✅ Version Control</summary>
<ul>
<li>Every deployment is <strong>versioned</strong> using Git tags or commit hashes.</li>
<li>This allows quick reversion to a previously stable version.</li>
</ul>
<p><strong>Example:</strong></p>
<pre><code class="language-bash">
# Deploying with a specific Git tag
git checkout v1.2.3
git push origin main
</code></pre>
</details>
<hr>
<details open>
<summary>2️⃣ 🧪 Canary & Blue-Green Deployments</summary>
<ul>
<li><strong>Canary Deployment:</strong> Roll out changes to a small portion of users first.</li>
<li><strong>Blue-Green Deployment:</strong> Run two environments (Blue = stable, Green = new). If failure occurs, route traffic back to Blue.</li>
</ul>
<p><strong>Example (Kubernetes Canary):</strong></p>
<pre><code class="language-yaml">
spec:
  replicas: 5
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: canary
</code></pre>
<p>This lets only part of the traffic hit the new version.</p>
</details>
<hr>
<details open>
<summary>3️⃣ 🧰 Infrastructure as Code (IaC)</summary>
<ul>
<li>Using tools like <strong>Terraform</strong>, infra changes are tracked in code.</li>
<li>Rollback = simply reapply the last known good config.</li>
</ul>
<p><strong>Example (Terraform):</strong></p>
<pre><code class="language-bash">
# Roll back to previous infra state
terraform apply &quot;previous_plan.tfplan&quot;
</code></pre>
</details>
<hr>
<details open>
<summary>4️⃣ 📦 Immutable Deployments</summary>
<ul>
<li>Containers/images are <strong>immutable</strong> → no in-place edits.</li>
<li>To rollback, redeploy the last <strong>working image</strong> by version tag.</li>
</ul>
<p><strong>Example (Docker):</strong></p>
<pre><code class="language-bash">
# Rollback to last stable version
docker run myapp:v1.2.3
</code></pre>
</details>
<hr>
<details open>
<summary>5️⃣ 📜 Rollback Scripts & CI/CD Logic</summary>
<ul>
<li>CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI) monitor deployment health.</li>
<li>If failure detected → pipeline <strong>auto-triggers rollback</strong>.</li>
</ul>
<p><strong>Example (GitHub Actions):</strong></p>
<pre><code class="language-yaml">
- name: Deploy New Version
  run: docker run myapp:latest

- name: Health Check
  run: curl -f http://localhost:8080/health || exit 1

- name: Rollback on Failure
  if: failure()
  run: docker run myapp:v1.2.3
</code></pre>
</details>
<hr>
<h2 id="real-world-example">✅ Real-World Example</h2>
<p>🚀 A <strong>Node.js app</strong> was deployed using GitHub Actions + Docker.</p>
<p>🔍 During the <strong>health check stage</strong>, a <code>500</code> error was detected.</p>
<p>💡 GitHub Actions <strong>immediately executed rollback</strong> to the previous Docker image.</p>
<pre><code class="language-yaml">
- name: Rollback to Previous Image
  run: docker run myapp:v1.2.3
</code></pre>
<p>💥 Result: <strong>Downtime avoided</strong>, users never saw disruption.</p>
<hr>
<h2 id="conclusion">🔚 Conclusion</h2>
<p>A strong rollback strategy = 🔐 <strong>safer deployments</strong> + 😌 <strong>peace of mind</strong>.</p>
<p>👉 Always <strong>test rollback paths</strong> before you need them.</p>
<pre><code class="language-test">
  🚀 Start Deployment
          |
          v
📦 Deploy New Version
          |
          v
🔍 Run Health Checks
     /           \
 Pass            Fail
  |                |
  v                v
✅ Keep New      ❌ Trigger Rollback
   Version         |
    \              v
     \          ↩️ Rollback to
      \------&gt;  Last Stable Version
                    |
                    v
             ✅ Service Stable
</code></pre>
</details>
<hr>
<h1 id="loading-a-shared-library-in-a-jenkinsfile">📚 Loading a Shared Library in a Jenkinsfile</h1>
<details open>
<summary><strong> Loading a Shared Library in a Jenkinsfile</strong></summary>
<p>A <strong>Jenkins Shared Library</strong> is stored in a Git repository and allows you to reuse pipeline functions and classes across multiple Jenkins pipelines.</p>
<p>You load it in your <strong>Jenkinsfile</strong> using the <code>@Library</code> annotation (or the <code>library</code> step).</p>
<hr>
<details open>
<summary>1️⃣ Preconfigured Global Library</summary>
<p>👉 If your Jenkins admin has already set up the shared library in</p>
<p><strong>Manage Jenkins → Configure System → Global Pipeline Libraries</strong>,</p>
<p>you can load it by its name only.</p>
<p><strong>Example:</strong></p>
<pre><code class="language-groovy">
@Library(&#x27;my-shared-lib&#x27;) _   // 📦 load the shared library

pipeline {
    agent any
    stages {
        stage(&#x27;Call Library Function&#x27;) {
            steps {
                // 📞 call function defined in vars/hello.groovy
                helloWorld()
            }
        }
    }
}
</code></pre>
<p>💡 <code>helloWorld()</code> comes from <code>vars/hello.groovy</code> inside the shared library.</p>
</details>
<hr>
<details open>
<summary>2️⃣ Load Dynamically from GitHub</summary>
<p>👉 If not preconfigured globally, you can load the library directly from Git.</p>
<p><strong>Example:</strong></p>
<pre><code class="language-groovy">
@Library(&#x27;my-shared-lib@main&#x27;) _   // 🔖 load library from branch &quot;main&quot;

library identifier: &#x27;my-shared-lib@main&#x27;, retriever: modernSCM([
  $class: &#x27;GitSCMSource&#x27;,
  remote: &#x27;https://github.com/org/shared-library.git&#x27; // 🌐 GitHub repo
])

pipeline {
    agent any
    stages {
        stage(&#x27;Use Library Function&#x27;) {
            steps {
                // 🛠 use shared library function
                deployApp(&quot;staging&quot;)
            }
        }
    }
}
</code></pre>
<p>💡 <code>deployApp()</code> comes from <code>vars/deployApp.groovy</code> in the shared lib.</p>
</details>
<hr>
<details open>
<summary>3️⃣ Version-Specific Library</summary>
<p>👉 To ensure <strong>stability across teams</strong>, load a specific version or tag.</p>
<p><strong>Example:</strong></p>
<pre><code class="language-groovy">
@Library(&#x27;my-shared-lib@v1.2.0&#x27;) _   // 🏷 load library version v1.2.0
</code></pre>
<p>This way, pipelines won’t break when newer versions of the library are updated.</p>
</details>
<hr>
<p>✅ <strong>Summary:</strong></p>
<ul>
<li><code>@Library(&#x27;&lt;name&gt;@&lt;version&gt;&#x27;)</code> → loads the library.</li>
<li>Global libraries need only the name.</li>
<li>Dynamic libraries require <code>library</code> + Git repo config.</li>
<li>Always prefer <strong>tagged versions</strong> for production stability.</li>
</ul>
<hr>
<pre><code class="language-text">
  📂 Jenkinsfile
         |
         v
@Library Annotation
         |
         v
🔗 Shared Library?
     /         \
 Global         Dynamic
 Config         Git Repo
   |               |
   v               v
⚙️ Load from   🌐 Fetch from
 Jenkins        Repository
   |               |
    \             /
     \           /
      v         v
 📦 Library Functions
   (vars/, src/, resources/)
          |
          v
🚀 Pipeline Stages
          |
          v
✅ Execute Library Functions
</code></pre>
</details>
<hr>
<p>Perfect 🙌 Let me enhance your UCD versioning explanation into the same <strong>structured + visual style</strong> we’ve been using, so it’s easy to present or remember.</p>
<hr>
<h1 id="how-ibm-urbancode-deploy-ucd-handles-versioning">🌟 How IBM UrbanCode Deploy (UCD) Handles Versioning</h1>
<details open>
<summary><strong>How IBM UrbanCode Deploy (UCD) Handles Versioning</strong></summary>
<p>✅ In IBM <strong>UrbanCode Deploy (UCD)</strong>, versioning is a <strong>core feature</strong> that ensures deployments are:</p>
<ul>
<li><strong>Repeatable</strong> 🌀</li>
<li><strong>Traceable</strong> 📝</li>
<li><strong>Rollback-safe</strong> 🔄</li>
</ul>
<hr>
<details open>
<summary>1️⃣ 📦 Component Versions</summary>
<ul>
<li>Every build artifact (<strong>JAR, WAR, config files, Docker image</strong>) is stored as a <strong>version</strong> in UCD.</li>
<li>Versions are immutable → you can always redeploy the same artifact exactly.</li>
</ul>
</details>
<hr>
<details open>
<summary>2️⃣ 🗄️ CodeStation Repository</summary>
<ul>
<li>UCD’s <strong>internal artifact repo</strong> = CodeStation.</li>
<li>Stores all component versions <strong>securely and immutably</strong>.</li>
<li>Guarantees you always deploy the artifact as it was built.</li>
</ul>
</details>
<hr>
<details open>
<summary>3️⃣ 🔄 Rollbacks</summary>
<ul>
<li>Since all past versions are retained, UCD enables <strong>rollback to any previous version</strong> with just a few clicks.</li>
<li>Rollback uses the same deployment process as forward deployments → <strong>safe &amp; consistent</strong>.</li>
</ul>
</details>
<hr>
<details open>
<summary>4️⃣ 🌐 Deployment Mapping</summary>
<ul>
<li>Each environment (Dev, QA, Prod) can be mapped to <strong>different versions</strong> of the same component.</li>
<li>UCD shows a clear <strong>audit trail</strong>:</li>
</ul>
<ul>
<li>QA → <code>v1.2.5</code></li>
<li>Prod → <code>v1.2.3</code></li>
</ul>
</details>
<hr>
<details open>
<summary>5️⃣ ⚙️ Automation</summary>
<ul>
<li>Deployment processes can:</li>
</ul>
<ul>
<li>Auto-pick the latest version 🚀</li>
<li>Or prompt the user to select a version before deploying 🎛️</li>
<li>Ensures flexibility across different environments.</li>
</ul>
</details>
<hr>
<h2 id="real-world-example">🔎 Real-World Example</h2>
<ul>
<li>A <strong>build job</strong> creates artifact → <code>v1.2.5</code>.</li>
<li>Uploaded to UCD as a <strong>component version</strong>.</li>
<li>QA deploys <code>v1.2.5</code>.</li>
<li>Prod still runs <code>v1.2.3</code>.</li>
<li>If Prod deployment of <code>v1.2.5</code> fails → <strong>rollback to <code>v1.2.3</code> instantly</strong>.</li>
</ul>
<hr>
<h2 id="visual-flow-ascii">📊 Visual Flow (ASCII)</h2>
<pre><code class="language-text">
🏗️ Build Artifact (v1.2.5)
        |
        v
📦 Stored in UCD as Component Version
        |
        v
🗄️ CodeStation Repository (Immutable Storage)
        |
        v
🌐 Environments
   ├── Dev → v1.2.5
   ├── QA  → v1.2.5
   └── Prod → v1.2.3
        |
        v
🔄 Rollback Anytime (e.g., Prod back to v1.2.3)
</code></pre>
<hr>
<p>💡 <strong>In short:</strong></p>
<p>UCD manages deployments by creating <strong>immutable, traceable versions of artifacts 📦</strong>, storing them in <strong>CodeStation 🗄️</strong>, and enabling <strong>safe rollbacks 🔄</strong> and <strong>full audit tracking 📊</strong> across environments.</p>
</details>
<hr>
<p>Great question 🙌 Let’s enhance your OpenShift vs Kubernetes explanation into a <strong>structured, interview-friendly guide</strong> with collapsible sections and a visual flow for quick recall.</p>
<hr>
<h1 id="openshift-vs-kubernetes">🌟 OpenShift vs Kubernetes</h1>
<details open>
<summary><strong>OpenShift vs Kubernetes</strong></summary>
<p>👉 <strong>OpenShift</strong> is a <strong>container application platform</strong> built on top of <strong>Kubernetes</strong> 🚀.</p>
<p>It provides all Kubernetes features (<strong>orchestration, scaling, self-healing</strong>) plus <strong>enterprise-grade capabilities</strong> for security, CI/CD, and developer productivity.</p>
<hr>
<details open>
<summary>1️⃣ 🔒 Security (SCC vs PSP)</summary>
<ul>
<li><strong>Kubernetes</strong>:</li>
</ul>
<ul>
<li>Containers can run as root unless restricted via PodSecurityPolicies (PSPs).</li>
<li><strong>OpenShift</strong>:</li>
</ul>
<ul>
<li>Uses <strong>Security Context Constraints (SCCs)</strong>.</li>
<li>Enforces <strong>non-root pods by default</strong> → stronger security posture.</li>
</ul>
</details>
<hr>
<details open>
<summary>2️⃣ 🌐 Networking & Routing</summary>
<ul>
<li><strong>Kubernetes</strong>: Uses <strong>Ingress</strong> to expose services externally.</li>
<li><strong>OpenShift</strong>: Provides <strong>Routes</strong> out-of-the-box 🌍 with built-in <strong>HAProxy</strong> → external access is simpler and faster to configure.</li>
</ul>
</details>
<hr>
<details open>
<summary>3️⃣ ⚙️ Built-in CI/CD</summary>
<ul>
<li><strong>Kubernetes</strong>: No native CI/CD tools.</li>
<li><strong>OpenShift</strong>: Includes <strong>Source-to-Image (S2I)</strong> 🖼️ and <strong>Jenkins pipelines</strong> 📦 for automated builds &amp; deployments.</li>
</ul>
</details>
<hr>
<details open>
<summary>4️⃣ 📦 Image Management</summary>
<ul>
<li><strong>Kubernetes</strong>: Pulls container images from <strong>external registries</strong> (DockerHub, ECR, GCR, etc).</li>
<li><strong>OpenShift</strong>: Has an <strong>integrated image registry</strong> 🗂️ + <strong>ImageStreams</strong> for better version tracking and lifecycle management.</li>
</ul>
</details>
<hr>
<details open>
<summary>5️⃣ 👥 Multi-Tenancy & Projects</summary>
<ul>
<li><strong>Kubernetes</strong>: Uses <strong>namespaces</strong> for isolation.</li>
<li><strong>OpenShift</strong>: Uses <strong>Projects</strong> 📂 (which are namespaces + RBAC + resource quotas).</li>
<li>Easier for multi-team enterprise environments.</li>
</ul>
</details>
<hr>
<details open>
<summary>6️⃣ 🔑 Authentication & Authorization</summary>
<ul>
<li><strong>Kubernetes</strong>: Requires third-party solutions for RBAC + authentication (e.g., OIDC, Keycloak).</li>
<li><strong>OpenShift</strong>: Built-in <strong>OAuth server</strong> 🛡️ → integrates with LDAP, GitHub, Google, etc.</li>
</ul>
</details>
<hr>
<h3 id="ascii-visual-flow">📊 ASCII Visual Flow</h3>
<pre><code class="language-text">
Kubernetes (Core Features)
   ├── Orchestration ⚙️
   ├── Scaling 📈
   ├── Self-Healing ♻️
   └── Service Discovery 🌐
        |
        v
OpenShift = Kubernetes ➕ Enterprise Features
   ├── 🔒 Security (SCCs, non-root)
   ├── 🌐 Routes (Ingress + HAProxy)
   ├── ⚙️ Built-in CI/CD (S2I, Pipelines)
   ├── 📦 Image Registry + ImageStreams
   ├── 👥 Projects (Namespaces + RBAC + Quotas)
   └── 🔑 OAuth Auth &amp; RBAC out-of-the-box
</code></pre>
<hr>
<h3 id="short-interview-answer">✅ Short Interview Answer</h3>
<p><strong>“OpenShift is Kubernetes with enterprise add-ons: stricter security (SCCs), built-in CI/CD, an integrated image registry, developer-friendly tooling, and OAuth integration. It makes Kubernetes more secure, easier to use, and production-ready for large organizations.”</strong></p>
</details>
<hr>
<p>Perfect 🙌 Let’s structure this in the same <strong>parent-child collapsible style</strong> as before.</p>
<p>Here, the <strong>parent</strong> is the main question (<code>How do you deploy Docker images using GitLab?</code>) and each <strong>child</strong> section contains the detailed steps.</p>
<hr>
<details open>
<summary>🐳 How do you deploy Docker images using GitLab?</summary>
<p>👉 In GitLab CI/CD, deploying Docker images usually involves <strong>3 main steps</strong>:</p>
<p>1️⃣ Build the Docker image.</p>
<p>2️⃣ Push the image to a registry (GitLab Container Registry, DockerHub, ECR, ACR).</p>
<p>3️⃣ Deploy the image to your environment (Kubernetes, Docker Swarm, or VM).</p>
<hr>
<details open>
<summary>1️⃣ Configure GitLab CI/CD</summary>
<ul>
<li>Add a <strong><code>.gitlab-ci.yml</code></strong> file in your repo.</li>
<li>Use <strong>GitLab Runners</strong> with Docker installed.</li>
</ul>
</details>
<hr>
<details open>
<summary>2️⃣ Authenticate with Registry 🔑</summary>
<ul>
<li>Store your registry credentials as <strong>CI/CD variables</strong>:</li>
</ul>
<ul>
<li><code>DOCKER_USER</code></li>
<li><code>DOCKER_PASSWORD</code></li>
</ul>
<ul>
<li>These are <strong>masked &amp; secure 🔒</strong> in GitLab.</li>
</ul>
</details>
<hr>
<details open>
<summary>3️⃣ Build & Push the Image 🏗️➡️</summary>
<p><strong><code>.gitlab-ci.yml</code> snippet:</strong></p>
<pre><code class="language-yaml">
stages:
  - build
  - deploy

docker_build:
  stage: build
  script:
    - echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER --password-stdin
    - docker build -t registry.gitlab.com/mygroup/myapp:$CI_COMMIT_SHA .
    - docker push registry.gitlab.com/mygroup/myapp:$CI_COMMIT_SHA
</code></pre>
<p>💡 Notes:</p>
<ul>
<li><code>$CI_COMMIT_SHA</code> ensures <strong>unique tags per commit</strong>.</li>
<li><code>registry.gitlab.com</code> = GitLab’s <strong>built-in registry</strong>.</li>
</ul>
</details>
<hr>
<details open>
<summary>4️⃣ Deploy the Image 🚀</summary>
<p>Example for <strong>Kubernetes deployment</strong>:</p>
<pre><code class="language-yaml">
deploy_job:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=registry.gitlab.com/mygroup/myapp:$CI_COMMIT_SHA
</code></pre>
<p>Other options:</p>
<ul>
<li>Docker Swarm</li>
<li>Virtual Machines (via SSH &amp; Docker CLI)</li>
</ul>
<pre><code class="language-text">
👩‍💻 Developer Commit
        |
        v
📝 .gitlab-ci.yml
        |
        v
🏗️ Build Stage
   - docker build image
        |
        v
🔑 Authenticate with Registry
   - docker login (using CI/CD vars)
        |
        v
📦 Push Stage
   - docker push to registry.gitlab.com/mygroup/myapp:$CI_COMMIT_SHA
        |
        v
🚀 Deploy Stage
   - kubectl set image (Kubernetes)
   - or Docker Swarm / VM deploy
        |
        v
✅ Running Updated App
</code></pre>
</details>
</details>
<hr>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = cicdContentData;
}
