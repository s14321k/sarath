// Kuberneties - Content Data
const kubernetiesContentData = `<h1 id="kubernetes">Kubernetes</h1>
<p><img src="../images/Kuberneties/java-MySql-K8.gif" alt="java-mysql"></p>
<p><img src="../images/Kuberneties/K8%20Full%20working.jpg" alt="kubernetis"></p>
<p><a href="https://devopscube.com/deploy-java-app-kubernetes/">java kuberneties deployment</a></p>
<hr>
<p><a href="https://youtu.be/Rl5M1CzgEH4?si=LLoZH-khdcmeVe79">GKE</a></p>
<details open>
<summary><strong>Kubernetes Overview</strong></summary>
<ul>
<li><strong>Pod</strong></li>
</ul>
<p>  In a POD, only one main application runs but it can have multiple containers. Each pod gets its own IP address and pods communicate internally using these IPs.</p>
<ul>
<li><strong>Node</strong></li>
</ul>
<p>  Nodes are worker machines. If one node crashes, others take over the workload because of Kubernetes’ replication (blueprint) mechanism.</p>
<ul>
<li><strong>Service</strong></li>
</ul>
<p>  Service provides a stable IP address and load balancing over multiple pods (copies of the same app).</p>
<p>  Types of Service:</p>
<ul>
<li><strong>Internal</strong>: Used for internal communication, e.g., DB access restricted inside the cluster.</li>
<li><strong>External</strong>: Exposes an app to outside traffic (e.g., public URL). Uses <strong>Ingress</strong> as an entry point, which routes requests to services.</li>
</ul>
<ul>
<li><strong>Ingress</strong></li>
</ul>
<p>  Entry point for external traffic. It receives requests and forwards them to appropriate services inside the cluster.</p>
<ul>
<li><strong>ConfigMap</strong></li>
</ul>
<p>  Used to inject configuration data (like DB configs) into pods without rebuilding images.</p>
<ul>
<li><strong>Secret</strong></li>
</ul>
<p>  Securely stores sensitive data such as usernames and passwords.</p>
<ul>
<li><strong>StatefulSet</strong></li>
</ul>
<p>  Manages stateful applications like databases, ensuring stable network IDs and storage.</p>
<ul>
<li><strong>Stateless (Deployment)</strong></li>
</ul>
<p>  Used for stateless applications with replicas, where no persistent state is stored in pods.</p>
<ul>
<li><strong>Volume</strong></li>
</ul>
<p>  Persistent storage for logs, data, etc., which can be local to the node or remote (network storage).</p>
</details>
<hr>
<details open>
<summary><strong>Google Kubernetes Engine (GKE) Architecture</strong></summary>
<h3 id="gke-overview">🏗️ GKE Overview</h3>
<p>Managed Kubernetes service by Google Cloud Platform (GCP). It manages control plane components for you.</p>
<h3 id="key-components">🧱 Key Components</h3>
<ul>
<li><strong>Control Plane (Managed by Google)</strong></li>
</ul>
<ul>
<li>Kubernetes API Server — main API endpoint</li>
</ul>
<ul>
<li>etcd — distributed key-value store for cluster state</li>
</ul>
<ul>
<li>Scheduler — decides which node runs which pod</li>
</ul>
<ul>
<li>Controller Manager — monitors cluster and manages state</li>
</ul>
<ul>
<li>Cloud Controller Manager — integrates Kubernetes with GCP services (load balancers, disks)</li>
</ul>
<p>   &gt; Autopilot mode: Google manages nodes.</p>
<p>   &gt; Standard mode: You manage node pools.</p>
<ul>
<li><strong>Node Pool (Managed/User-managed)</strong></li>
</ul>
<ul>
<li>Group of VM instances running:</li>
</ul>
<ul>
<li>kubelet (node agent)</li>
<li>kube-proxy (network proxy)</li>
<li>Container runtime (containerd)</li>
</ul>
<ul>
<li><strong>Add-ons &amp; Integrations</strong></li>
</ul>
<ul>
<li>GCP IAM for access control</li>
<li>Cloud Monitoring &amp; Logging</li>
<li>Load balancing with GCP LB</li>
<li>Persistent storage integration</li>
<li>VPC-native networking</li>
</ul>
<hr>
<h1 id="𝐊𝐮𝐛𝐞𝐫𝐧𝐞𝐭𝐞𝐬-𝐊𝟖𝐬-𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰">☸️ 𝐊𝐮𝐛𝐞𝐫𝐧𝐞𝐭𝐞𝐬 (𝐊𝟖𝐬) 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰</h1>
<p><img src="../images/Kuberneties/K8ArchitechDiag.gif" alt="K8ArchitechDiag"></p>
<p><strong>Kubernetes (K8s)</strong> is a <strong>container orchestration system</strong> used for deploying, scaling, and managing containerized applications.  </p>
<p>It draws heavy inspiration from Google’s internal system <strong>Borg</strong> and has become the industry standard for container orchestration.</p>
<hr>
<h2 id="𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞-𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰">🏗️ 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰</h2>
<p>A <strong>Kubernetes cluster</strong> consists of a set of <strong>worker nodes</strong> that run containerized applications.  </p>
<p>Each cluster includes a <strong>control plane</strong> that manages the worker nodes and <strong>Pods</strong> (the smallest deployable units in Kubernetes).</p>
<p>In production, both the <strong>control plane</strong> and <strong>worker nodes</strong> typically span multiple machines for <strong>fault-tolerance</strong> and <strong>high availability</strong>.</p>
<hr>
<h2 id="𝐂𝐨𝐧𝐭𝐫𝐨𝐥-𝐏𝐥𝐚𝐧𝐞-𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬">🧭 𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐏𝐥𝐚𝐧𝐞 𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬</h2>
<p>The control plane makes <strong>global decisions</strong> about the cluster and responds to cluster events (e.g., scheduling Pods, replacing failed Pods).</p>
<details>
<summary><strong>1️⃣ API Server</strong></summary>
<ul>
<li>The <strong>API Server</strong> is the <strong>central communication hub</strong> for the entire Kubernetes cluster.</li>
<li>All <code>kubectl</code> commands and other component interactions go through it.</li>
<li>It validates and processes REST requests and updates the cluster state in <strong>etcd</strong>.</li>
<li>Acts as the <strong>front-end</strong> of the Kubernetes control plane.</li>
</ul>
</details>
<details>
<summary><strong>2️⃣ Scheduler</strong></summary>
<ul>
<li>The <strong>Scheduler</strong> monitors newly created Pods that do not yet have an assigned node.</li>
<li>It determines the <strong>optimal node</strong> to run each Pod based on resource availability and constraints.</li>
<li>Plays a key role in balancing workload distribution across the cluster.</li>
</ul>
</details>
<details>
<summary><strong>3️⃣ Controller Manager</strong></summary>
<ul>
<li>Runs multiple <strong>controllers</strong> that regulate the cluster’s state, including:</li>
<li><strong>Node Controller</strong> – Manages node availability.</li>
<li><strong>Job Controller</strong> – Manages Job objects ensuring Pods complete their tasks.</li>
<li><strong>EndpointSlice Controller</strong> – Handles service endpoints efficiently.</li>
<li><strong>ServiceAccount Controller</strong> – Manages default accounts and access permissions.</li>
<li>Ensures that the <strong>desired state</strong> of the system matches the <strong>current state</strong>.</li>
</ul>
</details>
<details>
<summary><strong>4️⃣ etcd</strong></summary>
<ul>
<li>A <strong>highly available key-value store</strong> used as Kubernetes&#x27; <strong>backing store</strong> for all cluster data.</li>
<li>Stores configuration data, cluster state, and metadata.</li>
<li>Provides <strong>strong consistency</strong> and is critical for cluster recovery.</li>
</ul>
</details>
<hr>
<h2 id="𝐖𝐨𝐫𝐤𝐞𝐫-𝐍𝐨𝐝𝐞𝐬">⚙️ 𝐖𝐨𝐫𝐤𝐞𝐫 𝐍𝐨𝐝𝐞𝐬</h2>
<p>Each <strong>worker node</strong> runs the services necessary to host Pods, manage network proxying, and maintain container runtime operations.</p>
<details>
<summary><strong>1️⃣ Pods</strong></summary>
<ul>
<li>A <strong>Pod</strong> is the <strong>smallest deployable unit</strong> in Kubernetes.</li>
<li>It can contain <strong>one or more containers</strong> that share the same network namespace and storage.</li>
<li>Each Pod has a <strong>unique IP address</strong>, applied to all containers within it.</li>
<li>Typically used to group tightly coupled application containers.</li>
</ul>
</details>
<details>
<summary><strong>2️⃣ Kubelet</strong></summary>
<ul>
<li>A <strong>node-level agent</strong> that ensures containers described in PodSpecs are <strong>running and healthy</strong>.</li>
<li>Communicates with the <strong>API Server</strong> to receive Pod specifications.</li>
<li>Reports node and Pod status back to the control plane.</li>
</ul>
</details>
<details>
<summary><strong>3️⃣ Kube Proxy</strong></summary>
<ul>
<li>A <strong>network proxy and load balancer</strong> that runs on each node.</li>
<li>Manages network rules and forwards requests to the correct Pod or container.</li>
<li>Supports different proxy modes (e.g., iptables, IPVS) for efficient service routing.</li>
</ul>
</details>
<hr>
<h2 id="𝐒𝐮𝐦𝐦𝐚𝐫𝐲-𝐓𝐚𝐛𝐥𝐞">🧩 𝐒𝐮𝐦𝐦𝐚𝐫𝐲 𝐓𝐚𝐛𝐥𝐞</h2>
<table>
<thead><tr>
<th>Component</th>
<th>Layer</th>
<th>Function</th>
</tr></thead><tbody>
<tr>
<td><strong>API Server</strong></td>
<td>Control Plane</td>
<td>Cluster communication hub</td>
</tr>
<tr>
<td><strong>Scheduler</strong></td>
<td>Control Plane</td>
<td>Assigns Pods to nodes</td>
</tr>
<tr>
<td><strong>Controller Manager</strong></td>
<td>Control Plane</td>
<td>Maintains desired cluster state</td>
</tr>
<tr>
<td><strong>etcd</strong></td>
<td>Control Plane</td>
<td>Persistent key-value data store</td>
</tr>
<tr>
<td><strong>Pods</strong></td>
<td>Worker Node</td>
<td>Smallest deployable unit</td>
</tr>
<tr>
<td><strong>Kubelet</strong></td>
<td>Worker Node</td>
<td>Manages container lifecycle</td>
</tr>
<tr>
<td><strong>Kube Proxy</strong></td>
<td>Worker Node</td>
<td>Handles service networking and routing</td>
</tr>
</tbody></table>
<hr>
<p>💡 <strong>Tip:</strong>  </p>
<p>Use managed Kubernetes services like <strong>GKE (Google Kubernetes Engine)</strong>, <strong>EKS (Amazon Elastic Kubernetes Service)</strong>, or <strong>AKS (Azure Kubernetes Service)</strong> to simplify control plane management and focus on workload deployment.</p>
<h3 id="architecture-diagram-text">🔗 Architecture Diagram (Text)</h3>
<pre><code class="language-">
                +---------------------+
                |  GCP Management     |
                |  Console / gcloud   |
                +---------------------+
                          |
                          v
                +---------------------+
                |  GKE Control Plane  | &lt;--- Managed by Google
                |  API Server, etcd   |
                |  Scheduler, CMs     |
                +---------------------+
                          |
           --------------------------------
          |               |               |
          v               v               v
+----------------+  +----------------+  +----------------+
| Node Pool A    |  | Node Pool B    |  | Node Pool C    |
| VM Instances   |  | GPU-enabled    |  | Preemptible    |
| kubelet, proxy |  | for ML         |  | for CI/CD      |
+----------------+  +----------------+  +----------------+
          |               |               |
          v               v               v
     +--------+      +--------+       +--------+
     |  Pods  |      |  Pods  |       |  Pods  |
     +--------+      +--------+       +--------+
</code></pre>
<hr>
<h3 id="deployment-options">🧠 Deployment Options</h3>
<ul>
<li><strong>Standard Mode</strong> — You manage nodes</li>
<li><strong>Autopilot Mode</strong> — Fully managed nodes by Google</li>
</ul>
</details>
<hr>
<details>
<summary><strong>GKE YouTube Demo Commands</strong></summary>
<h3 id="part-1-create-a-sample-website-using-docker-container">Part 1: Create a Sample Website Using Docker Container</h3>
<pre><code class="language-bash">
docker run -p 8080:80 nginx:latest
docker cp index.html [container-id]:/usr/share/nginx/html/
docker commit [container-id] cad/web:version1
docker tag cad/web:version1 us.gcr.io/youtube-demo-255723/cad-site:version1
docker push us.gcr.io/youtube-demo-255723/cad-site:version1
</code></pre>
<hr>
<h3 id="part-2-deploying-container-in-gke-cluster">Part 2: Deploying Container in GKE Cluster</h3>
<pre><code class="language-bash">
gcloud config set project youtube-demo-255723
gcloud config set compute/zone us-central1-a
</code></pre>
<p>Create a GKE cluster:</p>
<pre><code class="language-bash">
gcloud container clusters create gk-cluster --num-nodes=1
gcloud container clusters get-credentials gk-cluster
# Configures kubectl to use your new cluster
</code></pre>
<p>Deploy an application:</p>
<pre><code class="language-bash">
kubectl create deployment web-server --image=us.gcr.io/youtube-demo-255723/cad-site:version1
</code></pre>
<p>Expose the deployment as a service:</p>
<pre><code class="language-bash">
kubectl expose deployment web-server --type LoadBalancer --port 80 --target-port 80
</code></pre>
<p>Inspect running pods:</p>
<pre><code class="language-bash">
kubectl get pods
</code></pre>
<p>Check service details:</p>
<pre><code class="language-bash">
kubectl get service
</code></pre>
<hr>
<h3 id="sources">Sources</h3>
<ul>
<li><a href="https://cloud.google.com/container-registry/docs/pushing-and-pulling">https://cloud.google.com/container-registry/docs/pushing-and-pulling</a></li>
<li><a href="https://docs.docker.com/engine/reference/commandline/commit/">https://docs.docker.com/engine/reference/commandline/commit/</a></li>
<li><a href="https://cloud.google.com/sdk/gcloud/reference/container/clusters/create">https://cloud.google.com/sdk/gcloud/reference/container/clusters/create</a></li>
<li><a href="https://cloud.google.com/kubernetes-engine/docs/concepts/architecture">https://cloud.google.com/kubernetes-engine/docs/concepts/architecture</a></li>
</ul>
</details>
<hr>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = kubernetiesContentData;
}
