// Microservice - Content Data
const microserviceContentData = `<h1 id="microservice">Microservice</h1>
<hr>
<h2 id="useful-resources">🔗 Useful Resources</h2>
<ul>
<li>▶️ <a href="https://www.youtube.com/watch?v=tGGo15irME8&amp;amp;t=2305s&amp;amp;ab_channel=CodeDecode">YouTube - Code Decode</a></li>
<li>💻 <a href="https://github.com/codedecode25/Microservices<em>vaccination</em>citizen">GitHub - Microservices Vaccination App</a></li>
<li>🎞️ <a href="https://www.youtube.com/@CodeDecode/playlists">Code Decode YouTube Playlists</a></li>
<li>🛡️ <a href="https://www.vinsguru.com/circuit-breaker-pattern/">Circuit Breaker Pattern (VinsGuru)</a></li>
<li>🧠 <a href="https://www.linkedin.com/pulse/exploring-caching-patterns-microservices-architecture-saeed-anabtawi/">Caching in Microservices (LinkedIn)</a></li>
<li>🔎 <a href="https://www.geeksforgeeks.org/service-discovery-and-service-registry-in-microservices/">Service Discovery (GeeksForGeeks)</a></li>
</ul>
<hr>
<p><img src="../images/Microservice/BestPractices.jpg" alt="BestPractices"></p>
<p><img src="../images/Microservice/Microservice%20Architech.gif" alt="Microservice Architech"></p>
<p><img src="../images/Microservice/MicroserviceArchitechture2.gif" alt="MicroserviceArch"></p>
<p><img src="../images/Microservice/designPatterns.gif" alt="DesignPatterns"></p>
<p>1️⃣ 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 &amp; 𝐃𝐚𝐭𝐚 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → CQRS (Command Query Responsibility Segregation)</p>
<p>    → Event Sourcing</p>
<p>    → Aggregator</p>
<p>    → Shared DB vs DB-per-Service</p>
<p>    → Data Management Patterns</p>
<p>2️⃣ 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → Choreography vs Orchestration</p>
<p>    → Publish–Subscribe</p>
<p>    → Request–Response</p>
<p>    → Event-Driven</p>
<p>    → Service Mesh</p>
<p>    → API Gateway</p>
<p>3️⃣ 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → Rate Limiting</p>
<p>    → Access Control</p>
<p>    → Token-Based Auth (OAuth, JWT)</p>
<p>    → API Gateway Authentication</p>
<p>    → Encryption (In Transit &amp; At Rest)</p>
<p>4️⃣ 𝐃𝐞𝐩𝐥𝐨𝐲𝐦𝐞𝐧𝐭 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → Service Instance per Container</p>
<p>    → Blue/Green Deployment</p>
<p>    → Canary Release</p>
<p>    → A/B Testing</p>
<p>    → Serverless</p>
<p>5️⃣ 𝐑𝐞𝐥𝐢𝐚𝐛𝐢𝐥𝐢𝐭𝐲 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → Circuit Breaker</p>
<p>    → Retry</p>
<p>    → Fallback</p>
<p>    → Bulkhead</p>
<p>    → Timeouts</p>
<p>    → Health Checks</p>
<p>6️⃣ 𝐒𝐜𝐚𝐥𝐚𝐛𝐢𝐥𝐢𝐭𝐲 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → Autoscaling</p>
<p>    → Sharding</p>
<p>    → Load Balancing</p>
<p>    → Vertical &amp; Horizontal Scaling</p>
<p>7️⃣ 𝐎𝐛𝐬𝐞𝐫𝐯𝐚𝐛𝐢𝐥𝐢𝐭𝐲 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬</p>
<p>    → Distributed Logging</p>
<p>    → Distributed Tracing</p>
<p>    → Real-Time Monitoring</p>
<p>    → Auditing</p>
<p>    → Metrics Collection</p>
<p>    → Health Check (again-yes, it&#x27;s that important!)</p>
<details open>
<summary><strong>📦 Microservice Architecture Overview</strong></summary>
<p>🧩 Microservices Architecture Overview</p>
<p>🔹 Client Layer:</p>
<p>Clients (Web, Mobile, Postman, etc.) send all requests via a single entry point — API Gateway.</p>
<p>🔹 API Gateway:</p>
<p>Handles Authentication, Routing, and Rate Limiting before forwarding requests to appropriate services.</p>
<p>🔹 Service Discovery (Eureka / Consul / Zookeeper):</p>
<p>Keeps a registry of all active service instances.</p>
<p>When a service scales up or down, it’s automatically discovered and updated — ensuring fault tolerance.</p>
<p>🔹 Microservices (e.g., User, Loan, Payment, Notification, Report):</p>
<p>Each service is independent, loosely coupled, and owns its own database.</p>
<p>🔹 Database Layer:</p>
<p>Every microservice has its own Master + Replica DB setup for better performance and high availability.</p>
<p>Master → handles write operations</p>
<p>Replicas → handle read operations</p>
<p>🔹 Load Balancer:</p>
<p>Distributes incoming requests across multiple service instances or replicas to avoid overload and ensure smooth traffic handling.</p>
<p>🧭 Architecture Diagram</p>
<p>📸 (Refer attached diagram image)</p>
<p>🖼️ The visual below represents how all these components fit together in a modern Microservices setup.</p>
<p>🚀 Highlights</p>
<p>✅ High availability with load balancing</p>
<p>✅ Scalability and service independence</p>
<p>✅ Fault tolerance through service discovery</p>
<p>✅ Optimized reads using DB replicas</p>
<p>✅ Secure and unified entry through API Gateway</p>
<p>Microservices architecture is an approach where an application is composed of <strong>loosely coupled, independently deployable services</strong>. Each service is:</p>
<ul>
<li>Focused on a specific business capability.</li>
<li>Communicates via well-defined APIs.</li>
<li>Developed and deployed independently.</li>
</ul>
<h3 id="key-benefits">🔑 Key Benefits:</h3>
<ul>
<li><strong>Scalability:</strong> Each service can be scaled independently.</li>
<li><strong>Flexibility &amp; Agility:</strong> Allows rapid development and deployment.</li>
<li><strong>Resilience &amp; Fault Isolation:</strong> Failure in one service doesn&#x27;t affect others.</li>
<li><strong>Technology Diversity:</strong> Services can use different tech stacks.</li>
<li><strong>Maintainability:</strong> Smaller, focused codebases are easier to manage.</li>
<li><strong>Easy Integration:</strong> REST, gRPC, messaging, etc.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🔁 Microservice Communication</strong></summary>
<p>Services communicate using synchronous and asynchronous mechanisms.</p>
<h3 id="communication-options">🔌 Communication Options:</h3>
<ul>
<li><strong>Feign Client</strong> (Declarative REST Client)</li>
<li><strong>RestTemplate</strong> (Traditional blocking client)</li>
<li><strong>RestClient</strong> (Modern, synchronous client)</li>
<li><strong>WebClient</strong> (Reactive, non-blocking)</li>
<li><strong>gRPC / Thrift</strong> (Binary protocols)</li>
<li><strong>Message Brokers:</strong> Kafka, RabbitMQ for event-driven communication</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🚀 Deployment, Portability, and Scalability</strong></summary>
<h3 id="virtual-machines-vms">🖥️ Virtual Machines (VMs):</h3>
<ul>
<li>Heavyweight</li>
<li>Takes minutes to boot</li>
<li>OS-level abstraction</li>
</ul>
<h3 id="containers-eg-docker">📦 Containers (e.g., Docker):</h3>
<ul>
<li>Lightweight and portable</li>
<li>Fast startup time</li>
<li>Share host OS kernel</li>
<li>Ideal for microservices</li>
</ul>
<h3 id="scalability">📈 Scalability:</h3>
<ul>
<li>Use orchestration tools like <strong>Kubernetes</strong>, <strong>Docker Swarm</strong> for:</li>
</ul>
<ul>
<li>Horizontal scaling</li>
<li>Auto-healing</li>
<li>Load balancing</li>
<li>Zero-downtime deployments</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🧠 Caching in Microservices</strong></summary>
<p>Caching improves performance, reduces latency, and decreases load on services.</p>
<h3 id="common-caching-patterns">🔂 Common Caching Patterns:</h3>
<p><img src="../images/Microservice/CacheFullstack.jpg" alt="CacheFullstack"></p>
<p><img src="../images/SpringBoot/CacheGoWrong.gif" alt="CacheGoWrong"></p>
<ul>
<li><strong>Client-Side Cache:</strong> Stores data locally (e.g., browser cache).</li>
<li><strong>Server-Side Cache:</strong> Shared cache used by services (e.g., Redis, Memcached).</li>
<li><strong>CDN (Edge Cache):</strong> For static content close to end-users.</li>
<li><strong>Write-Through Cache:</strong> Data written to cache and DB simultaneously.</li>
<li><strong>Read-Through Cache:</strong> Cache first, DB only if miss.</li>
<li><strong>Cache-Aside (Lazy Load):</strong> App fetches data, stores in cache.</li>
</ul>
<h3 id="tools">🛠️ Tools:</h3>
<ul>
<li><strong>Spring Cache Abstraction</strong></li>
<li><strong>Redis</strong></li>
<li><strong>Caffeine</strong></li>
<li><strong>Hazelcast</strong></li>
</ul>
</details>
<hr>
<details>
<summary><strong>🔍 Service Discovery</strong></summary>
<p>Service discovery helps services find each other dynamically without hardcoding IPs or ports.</p>
<h3 id="how-it-works">🧭 How It Works:</h3>
<ul>
<li><strong>Registration:</strong> Services register themselves to a registry.</li>
<li><strong>Discovery:</strong> Other services query the registry to get endpoint info.</li>
<li><strong>Load Balancing:</strong> Requests are spread across healthy service instances.</li>
<li><strong>Health Checks:</strong> Periodic checks to remove failed instances.</li>
<li><strong>Dynamic Updates:</strong> Automatically reflects scaling or shutdown.</li>
<li><strong>Integration with Orchestration Tools:</strong> e.g., Kubernetes, Consul, Eureka</li>
</ul>
<h3 id="popular-tools">🧰 Popular Tools:</h3>
<ul>
<li><strong>Netflix Eureka</strong></li>
<li><strong>Consul</strong></li>
<li><strong>etcd</strong></li>
<li><strong>Kubernetes built-in service registry</strong></li>
</ul>
<h3 id="types">🔧 Types:</h3>
<ul>
<li><strong>Centralized Registry:</strong> e.g., Eureka, Consul</li>
<li><strong>DNS-Based Discovery:</strong> Leverages service names via DNS</li>
<li><strong>Client-Side Discovery:</strong> Client queries the registry and load balances</li>
<li><strong>Server-Side Discovery:</strong> Load balancer (e.g., API Gateway) handles discovery</li>
</ul>
</details>
<hr>
<h2 id="topics-covered">📌 Topics Covered</h2>
<ul>
<li><a href="#-load-balancing-in-microservices">⚖️ Load Balancing in Microservices</a></li>
<li><a href="#-common-microservice-interview-questions">❓ Common Microservice Interview Questions</a></li>
<li><a href="#-circuit-breaker-pattern">🔌 Circuit Breaker Pattern</a></li>
</ul>
<hr>
<details>
<summary><strong>⚖️ Load Balancing in Microservices</strong></summary>
<p><img src="../images/Microservice/LoadBalancerVsAPIGateWay.jpg" alt="LoadBalancerVsAPIGateWay"></p>
<p>Load balancing ensures traffic is evenly distributed across service instances, improving <strong>performance</strong>, <strong>reliability</strong>, and <strong>scalability</strong>.</p>
<h3 id="1-client-side-load-balancing">🧭 1. Client-Side Load Balancing</h3>
<p>In this strategy, the <strong>client selects the service instance</strong> using an internal load-balancing library.</p>
<h4 id="tools">🧰 Tools:</h4>
<ul>
<li><strong>Netflix Ribbon</strong> (Deprecated, but conceptually important)</li>
<li><strong>Spring Cloud LoadBalancer</strong></li>
<li><strong>Feign Clients with @LoadBalancerClient</strong></li>
</ul>
<h4 id="sample-ribbon-dependency">📦 Sample: Ribbon Dependency</h4>
<pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-netflix-ribbon&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre>
<h4 id="sample-loadbalanced-feign-client">📦 Sample: LoadBalanced Feign Client</h4>
<pre><code class="language-xml">
&lt;dependency&gt;
   &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
   &lt;artifactId&gt;spring-cloud-starter-loadbalancer&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre>
<pre><code class="language-java">
@LoadBalancerClient(value = &quot;FLIGHT-RESERVATION&quot;)
public class ReservationLoadBalancerConfig {
   @Bean
   @LoadBalanced
   public Feign.Builder feiBuilder() {
      return Feign.builder();
   }
}
</code></pre>
<h3 id="2-server-side-load-balancing">🌐 2. Server-Side Load Balancing</h3>
<p>Handled by a <strong>gateway or reverse proxy</strong> that distributes requests to service instances.</p>
<h4 id="tools">🔧 Tools:</h4>
<ul>
<li><strong>API Gateway</strong> (Spring Cloud Gateway, Netflix Zuul)</li>
<li><strong>NGINX</strong>, <strong>HAProxy</strong></li>
<li><strong>AWS ELB</strong>, <strong>Azure Load Balancer</strong></li>
</ul>
<h3 id="3-kubernetes-based-load-balancing">📦 3. Kubernetes-Based Load Balancing</h3>
<p>Kubernetes inherently supports load balancing.</p>
<ul>
<li><strong>Services</strong>: Distribute traffic to pods using label selectors.</li>
<li><strong>Ingress Controllers</strong>: Manage HTTP load balancing and routing.</li>
</ul>
<h3 id="4-dns-based-load-balancing">🔍 4. DNS-Based Load Balancing</h3>
<p>Uses DNS records to return different service IPs.</p>
<ul>
<li><strong>Round Robin DNS</strong></li>
<li><strong>Weighted DNS</strong></li>
</ul>
<p>⚠️ DNS caching may reduce effectiveness.</p>
<h3 id="5-globaldistributed-load-balancing">📡 5. Global/Distributed Load Balancing</h3>
<p>For multi-region or high availability:</p>
<ul>
<li><strong>AWS Global Accelerator</strong></li>
<li><strong>Cloudflare Load Balancer</strong></li>
<li><strong>Anycast IP Routing</strong></li>
</ul>
<h3 id="load-balancing-algorithms">⚙️ Load Balancing Algorithms</h3>
<table>
<thead><tr>
<th>Algorithm</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Round Robin</strong></td>
<td>Sequential request distribution</td>
</tr>
<tr>
<td><strong>Least Connections</strong></td>
<td>Sends to least busy instance</td>
</tr>
<tr>
<td><strong>IP Hash</strong></td>
<td>Sticky sessions based on client IP</td>
</tr>
<tr>
<td><strong>Weighted Round Robin</strong></td>
<td>Based on service capacity</td>
</tr>
<tr>
<td><strong>Random</strong></td>
<td>Randomly selects a node</td>
</tr>
</tbody></table>
<h3 id="monitoring-auto-scaling">📊 Monitoring &amp; Auto-scaling</h3>
<ul>
<li><strong>Prometheus</strong>, <strong>Grafana</strong> for observability</li>
<li><strong>Horizontal Pod Autoscaler (K8s)</strong> for dynamic scaling</li>
</ul>
<h2 id="8-load-balancing-algorithms-you-must-know">8 Load Balancing Algorithms You Must Know</h2>
<h3 id="1-round-robin">1. Round Robin</h3>
<p>It assigns a request to the first server, then moves to the second, third, and so on, and after reaching the last server, it starts again at the first.</p>
<h3 id="2-least-connections">2. Least Connections</h3>
<p>The Least Connections algorithm directs incoming requests to the server with the lowest number of active connections.</p>
<h3 id="3-weighted-round-robin">3. Weighted Round Robin</h3>
<p>It assigns different weights to servers based on their capacities and distributes requests proportionally to these weights.</p>
<h3 id="4-weighted-least-connections">4. Weighted Least Connections</h3>
<p>The Weighted Least Connections algorithm combines the Least Connections and Weighted Round Robin algorithms.  </p>
<p>It directs incoming requests to the server with the lowest ratio of active connections to assigned weight.</p>
<h3 id="5-ip-hash">5. IP Hash</h3>
<p>The IP Hash algorithm determines the server to which a request should be sent based on the source and/or destination IP address.  </p>
<p>This method maintains session persistence, ensuring that requests from a specific user are directed to the same server.</p>
<h3 id="6-least-response-time">6. Least Response Time</h3>
<p>It directs incoming requests to the server with the lowest response time and the fewest active connections.</p>
<h3 id="7-random">7. Random</h3>
<p>It directs incoming requests to a randomly selected server from the available pool.</p>
<h3 id="8-least-bandwidth">8. Least Bandwidth</h3>
<p>It directs incoming requests to the server currently utilizing the least amount of bandwidth.  </p>
<p>This approach helps to ensure that servers are not overwhelmed by network traffic.</p>
<p><img src="../images/SpringBoot/LoadBalancingAlgos.png" alt="LoadBalancingAlgo"></p>
</details>
<hr>
<details>
<summary><strong>❓ Common Microservice Interview Questions</strong></summary>
<h3 id="q1-how-do-you-handle-a-malfunctioning-microservice">Q1: 🛑 How do you handle a malfunctioning microservice?</h3>
<ul>
<li>Deploy <strong>multiple instances</strong> on different ports.</li>
<li>Use <strong>load balancing</strong> to redirect traffic from the failed instance to healthy ones.</li>
<li>Implement <strong>circuit breakers</strong>, <strong>health checks</strong>, and <strong>retry logic</strong>.</li>
</ul>
<hr>
<h3 id="q2-why-do-we-use-microservices">Q2: 🚀 Why do we use Microservices?</h3>
<p>Microservices break down an application into smaller, independent services. Benefits include:</p>
<h4 id="key-advantages">✅ Key Advantages:</h4>
<ul>
<li><strong>Scalability:</strong> Scale only what’s needed.</li>
<li><strong>Modularity &amp; Maintainability:</strong> Small, manageable components.</li>
<li><strong>Technology Diversity:</strong> Use the right tool for the job.</li>
<li><strong>Faster Time to Market:</strong> Independent development/deployment.</li>
<li><strong>Resilience:</strong> Failures don’t affect the whole system.</li>
<li><strong>CI/CD Friendly:</strong> Easier to automate deployments.</li>
<li><strong>Agility:</strong> Quickly adapt to business changes.</li>
<li><strong>Focused Testing:</strong> Better unit and integration testing.</li>
<li><strong>Cloud Readiness:</strong> Works well with Docker, Kubernetes.</li>
<li><strong>Reusability:</strong> Services reused across applications.</li>
</ul>
<h4 id="challenges">⚠️ Challenges:</h4>
<ul>
<li>Complexity in inter-service communication</li>
<li>Data consistency</li>
<li>Infrastructure overhead</li>
<li>Monitoring and debugging complexity</li>
</ul>
<hr>
<h3 id="q3-how-will-you-maintain-load-balance-in-microservices">Q3: 🌐 How will you maintain load balance in microservices?</h3>
<h4 id="strategies">✅ Strategies:</h4>
<ul>
<li><strong>Client-Side Load Balancing</strong></li>
</ul>
<ul>
<li>Uses service discovery + Ribbon/Spring Cloud LoadBalancer.</li>
<li>Example: <code>ReservationLoadBalancerConfig.java</code></li>
</ul>
<ul>
<li><strong>API Gateway</strong></li>
</ul>
<ul>
<li>Routes and load balances requests to services.</li>
</ul>
<ul>
<li><strong>Reverse Proxies</strong></li>
</ul>
<ul>
<li>NGINX/HAProxy to balance HTTP/TCP traffic.</li>
</ul>
<ul>
<li><strong>Kubernetes</strong></li>
</ul>
<ul>
<li>Built-in load balancing via <code>Services</code> and <code>Ingress</code>.</li>
</ul>
<ul>
<li><strong>Service Mesh</strong></li>
</ul>
<ul>
<li>(e.g., Istio) offers fine-grained control.</li>
</ul>
<ul>
<li><strong>Global Load Balancers</strong></li>
</ul>
<ul>
<li>Cloud-based solutions for multi-region deployment.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🔌 Circuit Breaker Pattern</strong></summary>
<p>A circuit breaker <strong>prevents cascading failures</strong> by stopping calls to a failing service and allowing time for recovery.</p>
<h3 id="circuit-breaker-states">🔁 Circuit Breaker States</h3>
<table>
<thead><tr>
<th>State</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Closed</strong></td>
<td>Normal operation. Requests flow through.</td>
</tr>
<tr>
<td><strong>Open</strong></td>
<td>Too many failures. All calls blocked.</td>
</tr>
<tr>
<td><strong>Half-Open</strong></td>
<td>Trial state. A few requests allowed to test service recovery.</td>
</tr>
</tbody></table>
<hr>
<h3 id="how-it-works">⚙️ How It Works</h3>
<ul>
<li><strong>Closed</strong>: All requests allowed. Failures are tracked.</li>
<li><strong>Open</strong>: If failure threshold is met, no further calls are allowed.</li>
<li><strong>Half-Open</strong>: After a cooldown period, a few requests are tested.</li>
</ul>
<ul>
<li>If they succeed → back to Closed.</li>
<li>If they fail → back to Open.</li>
</ul>
<hr>
<h3 id="benefits">✅ Benefits</h3>
<ul>
<li><strong>Fault Isolation</strong></li>
<li><strong>Improved System Stability</strong></li>
<li><strong>Faster Recovery</strong></li>
</ul>
<hr>
<h3 id="configuration-resilience4j-example">🔧 Configuration (Resilience4j Example)</h3>
<pre><code class="language-yaml">
resilience4j.circuitbreaker:
  instances:
    myService:
      slidingWindowSize: 10
      failureRateThreshold: 50
      waitDurationInOpenState: 30s
      permittedNumberOfCallsInHalfOpenState: 3
</code></pre>
<hr>
<h3 id="common-libraries">🧰 Common Libraries</h3>
<table>
<thead><tr>
<th>Tool</th>
<th>Notes</th>
</tr></thead><tbody>
<tr>
<td><strong>Hystrix</strong></td>
<td>Netflix&#x27;s legacy library (no longer maintained)</td>
</tr>
<tr>
<td><strong>Resilience4j</strong></td>
<td>Lightweight, modern, Java 8+ functional</td>
</tr>
<tr>
<td><strong>Spring Cloud Circuit Breaker</strong></td>
<td>Abstraction for different circuit breaker tools</td>
</tr>
</tbody></table>
<hr>
</details>
<hr>
<h1 id="api-gateway-in-microservices">API Gateway in Microservices</h1>
<details>
<summary><strong>🌐 API Gateway in Microservices</strong></summary>
<p>An <strong>API Gateway</strong> is a <strong>centralized entry point</strong> for handling all requests in a microservices architecture. It performs routing, security, monitoring, load balancing, and more, abstracting the internal system complexity from clients.</p>
<hr>
<h3 id="key-responsibilities-of-an-api-gateway">🧭 Key Responsibilities of an API Gateway</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Routing</strong></td>
<td>Directs requests to the correct backend service.</td>
</tr>
<tr>
<td><strong>Load Balancing</strong></td>
<td>Distributes incoming traffic across multiple service instances.</td>
</tr>
<tr>
<td><strong>Authentication &amp; Authorization</strong></td>
<td>Ensures only verified clients can access services.</td>
</tr>
<tr>
<td><strong>Centralized Logging &amp; Monitoring</strong></td>
<td>Captures logs and metrics for observability.</td>
</tr>
<tr>
<td><strong>Rate Limiting &amp; Throttling</strong></td>
<td>Protects services from overload by limiting request rates.</td>
</tr>
<tr>
<td><strong>Caching</strong></td>
<td>Stores responses for repeated requests to improve performance.</td>
</tr>
<tr>
<td><strong>Protocol Translation</strong></td>
<td>Converts between client and backend protocols (e.g., HTTP ↔ gRPC).</td>
</tr>
<tr>
<td><strong>Request/Response Transformation</strong></td>
<td>Modifies payloads, headers, or response format.</td>
</tr>
<tr>
<td><strong>Aggregation</strong></td>
<td>Combines responses from multiple services into a single output.</td>
</tr>
</tbody></table>
<hr>
<h3 id="built-in-load-balancing">⚖️ Built-in Load Balancing</h3>
<p>Most API Gateways (e.g., Spring Cloud Gateway, Apigee, Kong) provide <strong>built-in server-side load balancing</strong>:</p>
<ul>
<li>Removes the need for client-side load balancers (e.g., Ribbon).</li>
<li>Distributes traffic to available service instances automatically.</li>
<li>Integrates with service discovery for dynamic routing.</li>
</ul>
<hr>
<h3 id="filters-pre-and-post">🔐 Filters: Pre and Post</h3>
<p>API Gateways use filters for cross-cutting concerns.</p>
<h4 id="pre-filters">🔹 Pre-Filters</h4>
<ul>
<li>Executed <strong>before routing</strong>.</li>
<li>Common uses: <strong>authentication</strong>, <strong>logging</strong>, <strong>header validation</strong>.</li>
</ul>
<h4 id="post-filters">🔹 Post-Filters</h4>
<ul>
<li>Executed <strong>after service response</strong>.</li>
<li>Common uses: <strong>adding headers</strong>, <strong>logging</strong>, <strong>metrics collection</strong>.</li>
</ul>
<hr>
<h3 id="popular-api-gateway-solutions">🧰 Popular API Gateway Solutions</h3>
<table>
<thead><tr>
<th>Gateway</th>
<th>Type</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Apigee</strong></td>
<td>Commercial (Google Cloud)</td>
<td>Enterprise-grade API management. Full support for analytics, rate limiting, monetization, and OAuth2.</td>
</tr>
<tr>
<td><strong>Kong Gateway</strong></td>
<td>Open Source / Enterprise</td>
<td>Built on NGINX. Plugin-based. Scalable and performant.</td>
</tr>
<tr>
<td><strong>Apache APISIX</strong></td>
<td>Open Source</td>
<td>High-performance, dynamic, cloud-native API Gateway built on OpenResty.</td>
</tr>
<tr>
<td><strong>Traefik</strong></td>
<td>Open Source</td>
<td>Modern reverse proxy with dynamic service discovery. Great for Docker and Kubernetes.</td>
</tr>
<tr>
<td><strong>Spring Cloud Gateway</strong></td>
<td>Open Source (Java/Spring)</td>
<td>Native to Spring ecosystem. Built-in filters, reactive support.</td>
</tr>
<tr>
<td><strong>NGINX</strong></td>
<td>Open Source / Commercial</td>
<td>Traditional reverse proxy/load balancer with API management extensions.</td>
</tr>
</tbody></table>
<hr>
<h3 id="advantages-of-api-gateways">✅ Advantages of API Gateways</h3>
<ul>
<li>Simplifies client interaction with backend microservices.</li>
<li>Centralized policy enforcement.</li>
<li>Reduces complexity on client side.</li>
<li>Enables observability and security best practices.</li>
</ul>
<hr>
<h3 id="things-to-watch-out-for">⚠️ Things to Watch Out For</h3>
<ul>
<li><strong>Single Point of Failure</strong>: Must ensure gateway is highly available.</li>
<li><strong>Latency Overhead</strong>: Adds a hop in request-response cycle.</li>
<li><strong>Scaling Needs</strong>: Should scale horizontally to meet traffic demand.</li>
</ul>
<hr>
</details>
<hr>
<p>Here’s a <strong>collapsible section</strong> comparing <strong>Eureka</strong> and <strong>Apigee Gateway</strong> in terms of features and configuration. This includes:</p>
<ul>
<li>Purpose</li>
<li>Feature set</li>
<li>Typical use cases</li>
<li>Configuration overview</li>
</ul>
<p>Formatted in both <strong>table form</strong> and <strong>collapsible markdown</strong> for clear, structured documentation.</p>
<hr>
<details>
<summary><strong>🔍 Eureka vs Apigee API Gateway – Feature & Configuration Comparison</strong></summary>
<h3 id="feature-comparison-table">📊 Feature Comparison Table</h3>
<table>
<thead><tr>
<th>Feature / Capability</th>
<th><strong>Eureka (Netflix OSS)</strong></th>
<th><strong>Apigee (Google Cloud API Gateway)</strong></th>
</tr></thead><tbody>
<tr>
<td><strong>Type</strong></td>
<td>Service Discovery</td>
<td>Full-featured API Gateway &amp; Management Platform</td>
</tr>
<tr>
<td><strong>Provider</strong></td>
<td>Netflix OSS, Spring Cloud Netflix</td>
<td>Google Cloud (Enterprise Product)</td>
</tr>
<tr>
<td><strong>Primary Role</strong></td>
<td>Registers and discovers microservices</td>
<td>Routes, secures, monitors, and manages APIs</td>
</tr>
<tr>
<td><strong>Load Balancing</strong></td>
<td>✖️ (Used with Ribbon / Spring Cloud LB)</td>
<td>✔️ Built-in</td>
</tr>
<tr>
<td><strong>Authentication &amp; Authorization</strong></td>
<td>✖️ Delegated to other tools</td>
<td>✔️ OAuth 2.0, API Keys, JWT</td>
</tr>
<tr>
<td><strong>Traffic Management (Rate Limit)</strong></td>
<td>✖️</td>
<td>✔️ Policies for throttling, quotas, rate limiting</td>
</tr>
<tr>
<td><strong>Request/Response Transformation</strong></td>
<td>✖️</td>
<td>✔️ Header/body manipulation supported</td>
</tr>
<tr>
<td><strong>Analytics &amp; Monitoring</strong></td>
<td>✖️ Basic via Spring Boot Actuator</td>
<td>✔️ Advanced API usage analytics, billing, monitoring</td>
</tr>
<tr>
<td><strong>Caching Support</strong></td>
<td>✖️</td>
<td>✔️ Built-in response caching</td>
</tr>
<tr>
<td><strong>Protocol Support</strong></td>
<td>Internal only (HTTP, REST)</td>
<td>HTTP(S), gRPC, WebSockets</td>
</tr>
<tr>
<td><strong>API Monetization</strong></td>
<td>✖️</td>
<td>✔️ Supported</td>
</tr>
<tr>
<td><strong>Service Mesh Integration</strong></td>
<td>Partial (e.g., with Istio via workarounds)</td>
<td>Not natively, but supports proxying into meshes</td>
</tr>
<tr>
<td><strong>Multi-Cloud / Hybrid Support</strong></td>
<td>No</td>
<td>✔️ Designed for hybrid and multi-cloud deployments</td>
</tr>
<tr>
<td><strong>UI Management Console</strong></td>
<td>✔️ (via Spring Dashboard or Eureka UI)</td>
<td>✔️ Full-featured web interface for managing APIs</td>
</tr>
</tbody></table>
<hr>
<h3 id="configuration-overview">⚙️ Configuration Overview</h3>
<table>
<thead><tr>
<th>Configuration Step</th>
<th><strong>Eureka</strong></th>
<th><strong>Apigee</strong></th>
</tr></thead><tbody>
<tr>
<td><strong>1. Add Dependencies</strong></td>
<td><code>spring-cloud-starter-netflix-eureka-server</code></td>
<td>No dependencies; managed via GCP &amp; API proxies</td>
</tr>
<tr>
<td><strong>2. Enable Server</strong></td>
<td><code>@EnableEurekaServer</code> on a Spring Boot app</td>
<td>Create API proxies in Apigee UI or via Apigee APIs</td>
</tr>
<tr>
<td><strong>3. Register Clients</strong></td>
<td><code>@EnableEurekaClient</code> + service name in <code>application.yml</code></td>
<td>Upload or define OpenAPI spec or proxy endpoint</td>
</tr>
<tr>
<td><strong>4. Discovery Settings</strong></td>
<td>Specify <code>eureka.client.serviceUrl.defaultZone</code></td>
<td>Define routing targets and policies</td>
</tr>
<tr>
<td><strong>5. Load Balancing</strong></td>
<td>Use Ribbon or Spring Cloud LoadBalancer</td>
<td>Automatically handled within Apigee</td>
</tr>
<tr>
<td><strong>6. Security &amp; Auth</strong></td>
<td>Custom or delegated (e.g., Spring Security, OAuth config)</td>
<td>Built-in: API key validation, OAuth2, JWT policies</td>
</tr>
<tr>
<td><strong>7. Logging/Monitoring</strong></td>
<td>Via Spring Boot Actuator, Zipkin, Sleuth</td>
<td>Advanced monitoring dashboards in Apigee Console</td>
</tr>
<tr>
<td><strong>8. Rate Limiting</strong></td>
<td>Not built-in (custom logic or Spring Cloud Gateway)</td>
<td>Policy-driven configuration per API in Apigee</td>
</tr>
</tbody></table>
<hr>
<h3 id="when-to-use-what">✅ When to Use What?</h3>
<table>
<thead><tr>
<th>Use Case</th>
<th>Use <strong>Eureka</strong></th>
<th>Use <strong>Apigee</strong></th>
</tr></thead><tbody>
<tr>
<td>Internal service discovery</td>
<td>✔️ Yes</td>
<td>✖️ Overkill for internal use only</td>
</tr>
<tr>
<td>Public API management</td>
<td>✖️ Not suitable</td>
<td>✔️ Ideal for managing and exposing public APIs</td>
</tr>
<tr>
<td>API monetization / external clients</td>
<td>✖️ Not supported</td>
<td>✔️ Monetization, subscriptions, analytics</td>
</tr>
<tr>
<td>Lightweight Spring Boot projects</td>
<td>✔️ Simple to integrate</td>
<td>✖️ Heavyweight; best for large-scale API ecosystems</td>
</tr>
<tr>
<td>Enterprise-grade security/compliance</td>
<td>✖️ Custom handling required</td>
<td>✔️ Built-in policies and regulatory support</td>
</tr>
<tr>
<td>Multi-cloud or hybrid deployment</td>
<td>✖️ No</td>
<td>✔️ Designed for it</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-istio-virtualservice-for-canary-deployment">💡 Example: Istio VirtualService for Canary Deployment</h3>
<p>This YAML configuration for Istio routes 90% of traffic to <code>v1</code> of a service and 10% to <code>v2</code>, which is a common pattern for canary releases.</p>
<pre><code class="language-yaml">
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
    - my-service
  http:
  - route:
    - destination:
        host: my-service
        subset: v1
      weight: 90
    - destination:
        host: my-service
        subset: v2
      weight: 10
</code></pre>
</details>
<hr>
<h2 id="basic-configurationcode-samples-for-both-eureka-spring-bootnetflix-oss-and-apigee-google-cloud-api-gateway-to-help-you-get-started"><strong>basic configuration/code samples</strong> for both <strong>Eureka</strong> (Spring Boot/Netflix OSS) and <strong>Apigee</strong> (Google Cloud API Gateway) to help you get started.</h2>
<hr>
<details>
<summary><strong>🔧 Eureka – Service Discovery Setup (Spring Boot)</strong></summary>
<h3 id="1-setup-eureka-server">🖥️ 1. Setup Eureka Server</h3>
<h4 id="dependencies-pomxml">👉 Dependencies (<code>pom.xml</code>)</h4>
<pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-server&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre>
<h4 id="main-class">👉 Main Class</h4>
<pre><code class="language-java">
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
</code></pre>
<h4 id="applicationyml-eureka-server">👉 <code>application.yml</code> (Eureka Server)</h4>
<pre><code class="language-yaml">
server:
  port: 8761

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
</code></pre>
<hr>
<h3 id="2-setup-eureka-client-microservice">📦 2. Setup Eureka Client (Microservice)</h3>
<h4 id="dependencies-pomxml">👉 Dependencies (<code>pom.xml</code>)</h4>
<pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre>
<h4 id="main-class">👉 Main Class</h4>
<pre><code class="language-java">
@SpringBootApplication
@EnableEurekaClient
public class MyServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyServiceApplication.class, args);
    }
}
</code></pre>
<h4 id="applicationyml-eureka-client">👉 <code>application.yml</code> (Eureka Client)</h4>
<pre><code class="language-yaml">
spring:
  application:
    name: my-service

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka
</code></pre>
<p>💡 <strong>Now this microservice will register itself with Eureka</strong>, and other services can discover it using its service ID (<code>my-service</code>).</p>
<hr>
</details>
<hr>
<details>
<summary><strong>🌐 Apigee – API Proxy Setup (Google Cloud)</strong></summary>
<p>Apigee is configured either via the <strong>Apigee Console UI</strong>, <strong>Apigee Management API</strong>, or <strong>gcloud CLI</strong>. Here&#x27;s how to create a basic proxy.</p>
<hr>
<h3 id="1-create-a-proxy-in-the-apigee-console">🧾 1. Create a Proxy in the Apigee Console</h3>
<ul>
<li>Go to: <a href="https://apigee.google.com">https://apigee.google.com</a></li>
<li>Choose your organization and environment.</li>
<li>Click <strong>Develop &gt; API Proxies &gt; +Proxy</strong></li>
<li>Select:</li>
</ul>
<ul>
<li><strong>Reverse proxy</strong></li>
<li><strong>Provide backend URL</strong> (e.g., <code>https://my-backend-service.com</code>)</li>
<li>Configure routing, authentication, quota, etc.</li>
<li>Click <strong>Deploy</strong> to <code>test</code> or <code>prod</code>.</li>
</ul>
<hr>
<h3 id="2-example-proxy-via-openapi-spec">💻 2. Example: Proxy via OpenAPI Spec</h3>
<p>You can import an OpenAPI (Swagger) spec file and generate the proxy.</p>
<pre><code class="language-bash">
gcloud api-gateway api-configs create my-config \
    --api=my-api \
    --openapi-spec=openapi.yaml \
    --project=my-gcp-project \
    --backend-auth-service-account=my-sa@my-gcp-project.iam.gserviceaccount.com \
    --display-name=&quot;My API Config&quot;
</code></pre>
<hr>
<h3 id="3-attach-auth-quota-and-caching-policies-xml">🔐 3. Attach Auth, Quota, and Caching Policies (XML)</h3>
<p>In Apigee proxies, you define policies in <code>XML</code>.</p>
<h4 id="example-quota-policy-quotaxml">📌 Example: Quota Policy (<code>quota.xml</code>)</h4>
<pre><code class="language-xml">
&lt;Quota name=&quot;QuotaPolicy&quot;&gt;
  &lt;Interval&gt;1&lt;/Interval&gt;
  &lt;TimeUnit&gt;minute&lt;/TimeUnit&gt;
  &lt;Allow&gt;100&lt;/Allow&gt;
&lt;/Quota&gt;
</code></pre>
<p>Attach it inside your proxy under <code>&lt;Step&gt;</code> tag.</p>
<hr>
<h3 id="4-example-sample-openapiyaml">📄 4. Example: Sample <code>openapi.yaml</code></h3>
<pre><code class="language-yaml">
swagger: &#x27;2.0&#x27;
info:
  title: Example API
  version: 1.0.0
host: my-api-id.a.run.app
x-google-backend:
  address: https://backend.example.com
paths:
  /hello:
    get:
      operationId: sayHello
      responses:
        &#x27;200&#x27;:
          description: A successful response
</code></pre>
<p>💡 Upload this using <code>gcloud</code> or import from Apigee UI.</p>
<hr>
<h3 id="5-monitoring-in-apigee">📊 5. Monitoring in Apigee</h3>
<ul>
<li>Navigate to <strong>Analyze &gt; API Metrics</strong></li>
<li>View charts on traffic, latency, errors, quota usage, etc.</li>
<li>Enable <strong>logging to Stackdriver (Cloud Logging)</strong> for detailed logs.</li>
</ul>
</details>
<hr>
<h1 id="microservice-strangler-fig-pattern-strategy"><strong>Microservice Strangler Fig Pattern Strategy</strong></h1>
<hr>
<details>
<summary><strong>🌳 Microservice Strangler Fig Pattern Strategy</strong></summary>
<h3 id="purpose">🔄 <strong>Purpose</strong></h3>
<p>The <strong>Strangler Fig Pattern</strong> is a migration strategy used to <strong>gradually replace a legacy monolithic system</strong> with a new microservices-based architecture. Instead of rewriting everything from scratch, new features are built as microservices while the old system continues to operate. Over time, the legacy parts are &quot;strangled&quot; and fully replaced.</p>
<hr>
<h3 id="analogy-the-strangler-fig-tree">🌱 <strong>Analogy: The Strangler Fig Tree</strong></h3>
<ul>
<li>In nature, a <strong>strangler fig</strong> starts growing beside or on top of a tree.</li>
<li>Over time, its roots grow down, wrap around the host tree, and eventually <strong>replace it entirely</strong>.</li>
<li>In software, the <strong>old monolith is the tree</strong>, and the <strong>new microservices are the fig</strong>.</li>
</ul>
<hr>
<h3 id="how-it-works">🧠 <strong>How It Works</strong></h3>
<table>
<thead><tr>
<th>Phase</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>1. Identify Boundaries</strong></td>
<td>Choose a part of the legacy system (e.g., a module or service) that can be separated.</td>
</tr>
<tr>
<td><strong>2. Create Proxy/Routing Layer</strong></td>
<td>Use a façade or API Gateway to intercept requests and direct some to the legacy system and some to new microservices.</td>
</tr>
<tr>
<td><strong>3. Replace Incrementally</strong></td>
<td>One piece at a time, rewrite legacy functionality as a microservice and update routing.</td>
</tr>
<tr>
<td><strong>4. Retire Legacy Code</strong></td>
<td>Once a module is fully migrated, remove it from the old system. Repeat for the next module.</td>
</tr>
</tbody></table>
<hr>
<h3 id="tools-often-used">🧰 Tools Often Used</h3>
<ul>
<li><strong>API Gateway / Reverse Proxy</strong> – e.g., Spring Cloud Gateway, NGINX, Apigee</li>
<li><strong>Service Mesh</strong> – for more granular control of routing (e.g., Istio)</li>
<li><strong>Message Brokers</strong> – to decouple legacy and new systems using events (e.g., Kafka, RabbitMQ)</li>
</ul>
<hr>
<h3 id="advantages">✅ <strong>Advantages</strong></h3>
<ul>
<li>No need for a risky big-bang rewrite</li>
<li>Continuous delivery possible during migration</li>
<li>Minimizes downtime and regression risks</li>
<li>Parallel development of new and old systems</li>
</ul>
<hr>
<h3 id="challenges">⚠️ <strong>Challenges</strong></h3>
<ul>
<li>Routing complexity and maintenance during the transition</li>
<li>Consistent data management between legacy and new systems</li>
<li>Requires strong architectural planning and communication between teams</li>
</ul>
<hr>
<h3 id="example-use-case">💡 Example Use Case</h3>
<p>Imagine a legacy e-commerce app:</p>
<ul>
<li>You start by moving <strong>user registration and authentication</strong> to a new microservice.</li>
<li>Route all login/signup traffic to the new service.</li>
<li>Continue to move modules like <strong>product catalog</strong>, <strong>order service</strong>, etc., until the monolith is fully replaced.</li>
</ul>
<hr>
<h3 id="summary">📘 Summary</h3>
<blockquote><strong>The Strangler Fig Pattern</strong> is a safe and strategic approach to migrate from a legacy system to microservices <strong>incrementally</strong>, enabling agility and avoiding complete system overhauls.</blockquote>
</details>
<hr>
<h1 id="important-topics-in-microservices">Important topics in Microservices</h1>
<details>
<summary><strong>🧱 1. Microservices vs Monolithic Architecture</strong></summary>
<table>
<thead><tr>
<th>Feature</th>
<th>Monolithic</th>
<th>Microservices</th>
</tr></thead><tbody>
<tr>
<td><strong>Architecture</strong></td>
<td>Single codebase</td>
<td>Distributed services</td>
</tr>
<tr>
<td><strong>Deployment</strong></td>
<td>One deployment for all modules</td>
<td>Independent deployment per service</td>
</tr>
<tr>
<td><strong>Scalability</strong></td>
<td>Scale whole app</td>
<td>Scale individual services</td>
</tr>
<tr>
<td><strong>Technology Stack</strong></td>
<td>Usually uniform</td>
<td>Polyglot possible</td>
</tr>
<tr>
<td><strong>Fault Isolation</strong></td>
<td>Hard (single failure = app crash)</td>
<td>Easy (one service crash doesn’t affect rest)</td>
</tr>
<tr>
<td><strong>Maintenance</strong></td>
<td>Difficult as app grows</td>
<td>Easier due to modularity</td>
</tr>
</tbody></table>
<p>✅ Use microservices when you need flexibility, scalability, and faster delivery.</p>
</details>
<hr>
<details>
<summary><strong>📬 2. Inter-Service Communication</strong></summary>
<p>Microservices must talk to each other in a decoupled and efficient way:</p>
<h3 id="synchronous-communication">🔹 Synchronous Communication</h3>
<ul>
<li><strong>REST API</strong> – Common, simple over HTTP</li>
<li><strong>gRPC</strong> – Efficient, contract-first communication (Protobuf)</li>
</ul>
<h3 id="asynchronous-communication">🔹 Asynchronous Communication</h3>
<ul>
<li><strong>Message Queues</strong> (RabbitMQ, ActiveMQ)</li>
<li><strong>Event Streaming</strong> (Kafka, Pulsar)</li>
</ul>
<p>🔁 <strong>When to use what?</strong></p>
<table>
<thead><tr>
<th>Communication</th>
<th>Use Case</th>
</tr></thead><tbody>
<tr>
<td>REST/gRPC</td>
<td>Real-time, blocking requests</td>
</tr>
<tr>
<td>Kafka</td>
<td>Event-driven, high throughput, scalability</td>
</tr>
<tr>
<td>RabbitMQ</td>
<td>Queued, reliable delivery of tasks</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>🧩 3. Design Patterns in Microservices</strong></summary>
<h3 id="common-patterns">🧠 Common Patterns</h3>
<ul>
<li><strong>API Gateway</strong> – Central entry point</li>
<li><strong>Circuit Breaker</strong> – Prevent cascading failures</li>
<li><strong>Service Discovery</strong> – Dynamic service location (e.g., Eureka)</li>
<li><strong>Strangler Fig</strong> – Legacy to microservices migration</li>
<li><strong>Saga Pattern</strong> – Manage distributed transactions</li>
<li><strong>CQRS</strong> – Command Query Responsibility Segregation</li>
<li><strong>Event Sourcing</strong> – Persist system state using event history</li>
<li><strong>Bulkhead</strong> – Isolate services to avoid total failure</li>
</ul>
<p>💡 These patterns solve challenges around <strong>resilience</strong>, <strong>fault-tolerance</strong>, and <strong>scalability</strong>.</p>
<p>➡ 1. API Gateway Pattern: Centralizes external access to your microservices, simplifying communication and providing a single entry point for client requests.</p>
<p>➡ 2. Backends for Frontends Pattern (BFF): Creates dedicated backend services for each frontend, optimizing performance and user experience tailored to each platform.</p>
<p>➡ 3. Service Discovery Pattern: Enables microservices to dynamically discover and communicate with each other, simplifying service orchestration and enhancing system scalability.</p>
<p>➡ 4. Circuit Breaker Pattern: Implements a fault-tolerant mechanism for microservices, preventing cascading failures by automatically detecting and isolating faulty services.</p>
<p>➡ 5. Retry Pattern: Enhances microservices&#x27; resilience by automatically retrying failed operations, increasing the chances of successful execution and minimizing transient issues.</p>
<p>➡ 6. Sidecar Pattern: Attaches additional components to your microservices, providing modular functionality without altering the core service itself.</p>
<p>➡ 7. Saga Pattern: Manages distributed transactions across multiple microservices, ensuring data consistency while maintaining the autonomy of your services.</p>
<p>➡ 8. CQRS (Command Query Responsibility Segregation) Pattern: Separates the read and write operations in a microservice, improving performance, scalability, and maintainability.</p>
<p><img src="../images/𝐌𝐢𝐜𝐫𝐨𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬%20𝐃𝐞𝐬𝐢𝐠𝐧%20𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬.gif" alt="𝐌𝐢𝐜𝐫𝐨𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬 𝐃𝐞𝐬𝐢𝐠𝐧 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬.png"></p>
</details>
<hr>
<details>
<summary><strong>🔐 4. Security in Microservices</strong></summary>
<h3 id="best-practices">🛡️ Best Practices</h3>
<ul>
<li><strong>Authentication</strong>: OAuth2, OpenID Connect</li>
<li><strong>Authorization</strong>: Role-based or attribute-based</li>
<li><strong>JWT</strong>: Token-based stateless auth</li>
<li><strong>API Gateway</strong>: Acts as a security gateway</li>
<li><strong>Encrypt Data</strong>: Both at-rest and in-transit</li>
<li><strong>Zero Trust Model</strong>: Never trust, always verify</li>
</ul>
<p>🔐 Security should be <strong>centralized at the gateway</strong> but also <strong>enforced at service level</strong>.</p>
</details>
<hr>
<details>
<summary><strong>📊 5. Observability: Logging, Monitoring, Tracing</strong></summary>
<h3 id="key-concepts">📘 Key Concepts</h3>
<table>
<thead><tr>
<th>Feature</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Logging</strong></td>
<td>Use centralized log collectors (e.g., ELK stack)</td>
</tr>
<tr>
<td><strong>Metrics</strong></td>
<td>Use Prometheus, Micrometer, Grafana for stats</td>
</tr>
<tr>
<td><strong>Tracing</strong></td>
<td>Use OpenTelemetry, Jaeger, Zipkin to trace requests</td>
</tr>
</tbody></table>
<ul>
<li><strong>Correlation ID</strong> – Trace a request across services</li>
<li><strong>Health Checks</strong> – Expose readiness/liveness endpoints</li>
</ul>
<p>🧠 <strong>Observability = Monitoring + Logging + Tracing</strong></p>
</details>
<hr>
<details>
<summary><strong>⚙️ 6. Configuration Management</strong></summary>
<h3 id="strategies">🧾 Strategies</h3>
<ul>
<li><strong>Spring Cloud Config</strong> – Centralized config for all services</li>
<li><strong>Kubernetes ConfigMap / Secrets</strong> – Externalize environment settings</li>
<li><strong>Vault</strong> – Secure secrets management</li>
</ul>
<h3 id="refresh-strategies">🔁 Refresh strategies</h3>
<ul>
<li>Use <strong>Actuator endpoints</strong> or <strong>bus refresh</strong> in Spring to update configs dynamically.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🚀 7. Deployment & Orchestration</strong></summary>
<h3 id="tools">🧰 Tools</h3>
<table>
<thead><tr>
<th>Layer</th>
<th>Tools</th>
</tr></thead><tbody>
<tr>
<td><strong>Containers</strong></td>
<td>Docker</td>
</tr>
<tr>
<td><strong>Orchestration</strong></td>
<td>Kubernetes, Docker Swarm</td>
</tr>
<tr>
<td><strong>Service Mesh</strong></td>
<td>Istio, Linkerd</td>
</tr>
<tr>
<td><strong>CI/CD</strong></td>
<td>Jenkins, GitHub Actions, GitLab CI/CD</td>
</tr>
</tbody></table>
<h3 id="key-features">🏗️ Key Features</h3>
<ul>
<li><strong>Horizontal Scaling</strong></li>
<li><strong>Rolling Deployments</strong></li>
<li><strong>Self-healing</strong></li>
<li><strong>Service Discovery (in-built in K8s)</strong></li>
</ul>
</details>
<hr>
<details>
<summary><strong>📦 8. Microservices Testing Types</strong></summary>
<table>
<thead><tr>
<th>Test Type</th>
<th>Purpose</th>
</tr></thead><tbody>
<tr>
<td><strong>Unit Test</strong></td>
<td>Test logic in isolation</td>
</tr>
<tr>
<td><strong>Integration Test</strong></td>
<td>Test interaction between components</td>
</tr>
<tr>
<td><strong>Contract Test</strong></td>
<td>Verify service communication agreements</td>
</tr>
<tr>
<td><strong>End-to-End Test</strong></td>
<td>Simulate full user journeys</td>
</tr>
<tr>
<td><strong>Performance Test</strong></td>
<td>Check behavior under load</td>
</tr>
</tbody></table>
<p>Tools: <strong>JUnit, TestContainers, WireMock, Postman/Newman, Gatling</strong></p>
</details>
<hr>
<details>
<summary><strong>🔄 9. Data Management in Microservices</strong></summary>
<h3 id="principles">🗃️ Principles</h3>
<ul>
<li><strong>Database per service</strong> – No shared DBs</li>
<li><strong>Eventual consistency</strong> – Accept delays in sync</li>
<li><strong>Distributed Transactions</strong> – Use <strong>Saga</strong> or <strong>Outbox Pattern</strong></li>
</ul>
<h3 id="tools">🛠️ Tools</h3>
<ul>
<li><strong>Kafka / Debezium</strong> – For event-based data sync</li>
<li><strong>Change Data Capture (CDC)</strong> – Listen to DB changes</li>
</ul>
</details>
<hr>
<details>
<summary><strong>📚 10. API Versioning & Documentation</strong></summary>
<h3 id="api-versioning-strategies">📌 API Versioning Strategies</h3>
<ul>
<li>URI versioning: <code>/api/v1/users</code></li>
<li>Header versioning: <code>Accept-Version: v1</code></li>
<li>Media type versioning: <code>application/vnd.company.v1+json</code></li>
</ul>
<h3 id="documentation">📘 Documentation</h3>
<ul>
<li><strong>Swagger/OpenAPI</strong> – Interactive API docs</li>
<li><strong>SpringDoc</strong> – Swagger integration with Spring Boot</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🕸️ 11. Service Mesh</strong></summary>
<p>A <strong>Service Mesh</strong> is a dedicated infrastructure layer for making service-to-service communication safe, fast, and reliable. It provides a transparent and language-independent way to automate application network functions like traffic management, security, and observability.</p>
<h3 id="how-it-works-the-sidecar-pattern">🧠 How It Works: The Sidecar Pattern</h3>
<p>A service mesh works by deploying a lightweight network proxy, called a <strong>sidecar</strong>, alongside each service instance. All traffic into and out of the service is routed through this proxy, which forms the <strong>data plane</strong>. A central <strong>control plane</strong> manages and configures all the sidecars.</p>
<table>
<thead><tr>
<th>Component</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Data Plane</strong></td>
<td>Composed of sidecar proxies (e.g., Envoy, Linkerd2-proxy) that sit next to each service. Handles the actual traffic.</td>
</tr>
<tr>
<td><strong>Control Plane</strong></td>
<td>The &quot;brain&quot; of the mesh. Configures the proxies to enforce policies. Manages service discovery, routing rules, etc.</td>
</tr>
</tbody></table>
<hr>
<h3 id="key-pillars-of-a-service-mesh">🏛️ Key Pillars of a Service Mesh</h3>
<table>
<thead><tr>
<th>Pillar</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Traffic Management</strong></td>
<td>Fine-grained control over traffic: dynamic routing, canary releases, A/B testing, retries, timeouts.</td>
</tr>
<tr>
<td><strong>Security</strong></td>
<td>Secure communication between services with mutual TLS (mTLS). Enforces access control policies.</td>
</tr>
<tr>
<td><strong>Observability</strong></td>
<td>Provides detailed telemetry (metrics, logs, traces) for all traffic without needing to change app code.</td>
</tr>
</tbody></table>
<hr>
<h3 id="popular-tools">🧰 Popular Tools</h3>
<table>
<thead><tr>
<th>Tool</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Istio</strong></td>
<td>The most feature-rich and widely adopted service mesh. Uses Envoy as its sidecar proxy.</td>
</tr>
<tr>
<td><strong>Linkerd</strong></td>
<td>Focuses on simplicity, performance, and low resource overhead. Uses a custom micro-proxy written in Rust.</td>
</tr>
<tr>
<td><strong>Consul</strong></td>
<td>Originally for service discovery, now includes a full-featured service mesh (Consul Connect).</td>
</tr>
</tbody></table>
<hr>
<h3 id="when-to-use-what">✅ When to Use What?</h3>
<table>
<thead><tr>
<th>Scenario</th>
<th>Recommendation</th>
</tr></thead><tbody>
<tr>
<td><strong>Complex, large-scale enterprise</strong></td>
<td><strong>Istio</strong>: Offers the most extensive feature set for traffic management and security.</td>
</tr>
<tr>
<td><strong>Simplicity and performance</strong></td>
<td><strong>Linkerd</strong>: Known for its ease of use, low resource footprint, and high performance.</td>
</tr>
<tr>
<td><strong>Already using Consul for discovery</strong></td>
<td><strong>Consul Connect</strong>: A natural extension if you&#x27;re already in the HashiCorp ecosystem.</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-istio-virtualservice-for-canary-deployment">💡 Example: Istio VirtualService for Canary Deployment</h3>
<p>This YAML configuration for Istio routes 90% of traffic to <code>v1</code> of a service and 10% to <code>v2</code>, which is a common pattern for canary releases.</p>
<pre><code class="language-yaml">
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
    - my-service
  http:
  - route:
    - destination:
        host: my-service
        subset: v1
      weight: 90
    - destination:
        host: my-service
        subset: v2
      weight: 10
</code></pre>
<hr>
<h3 id="advantages">✅ Advantages</h3>
<ul>
<li><strong>Language Agnostic</strong>: Networking logic is abstracted out of the application code.</li>
<li><strong>Improved Observability</strong>: Consistent metrics, logs, and traces for all services.</li>
<li><strong>Enhanced Security</strong>: mTLS encryption can be enabled transparently.</li>
<li><strong>Advanced Traffic Control</strong>: Simplifies complex deployment strategies.</li>
</ul>
<h3 id="challenges">⚠️ Challenges</h3>
<ul>
<li><strong>Complexity</strong>: Adds another layer of infrastructure to manage.</li>
<li><strong>Latency</strong>: The extra hop through the sidecar proxy can add minor latency.</li>
<li><strong>Resource Overhead</strong>: Running a sidecar for every service instance consumes CPU and memory.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>☁️ 12. Cloud Native & Microservices</strong></summary>
<p><strong>Cloud Native</strong> is an approach to building and running applications that fully exploits the advantages of the cloud computing delivery model. It&#x27;s about how applications are created and deployed, not where. Microservices are a core component of cloud-native architectures.</p>
<h3 id="the-pillars-of-cloud-native-as-defined-by-the-cncf">🏛️ The Pillars of Cloud Native (as defined by the CNCF)</h3>
<p>The Cloud Native Computing Foundation (CNCF) defines cloud native with these key pillars:</p>
<ul>
<li><strong>Microservices</strong>: Structuring applications as a collection of loosely coupled services.</li>
<li><strong>Containers</strong>: Packaging services and their dependencies into lightweight, portable containers (e.g., Docker).</li>
<li><strong>Continuous Delivery (CI/CD)</strong>: Automating the build, test, and deployment pipeline to release software faster and more reliably.</li>
<li><strong>DevOps</strong>: A culture and practice that brings development and operations teams together, automating infrastructure and workflows.</li>
<li><strong>Orchestration</strong>: Using tools like Kubernetes to manage containerized applications at scale, handling deployment, scaling, and healing.</li>
</ul>
<hr>
<h3 id="how-microservices-enable-a-cloud-native-approach">✅ How Microservices Enable a Cloud-Native Approach</h3>
<table>
<thead><tr>
<th>Cloud-Native Goal</th>
<th>How Microservices Help</th>
</tr></thead><tbody>
<tr>
<td><strong>Agility &amp; Speed</strong></td>
<td>Small, independent teams can develop, deploy, and scale their services separately.</td>
</tr>
<tr>
<td><strong>Scalability</strong></td>
<td>Services can be scaled horizontally and automatically based on demand.</td>
</tr>
<tr>
<td><strong>Resilience</strong></td>
<td>Failure in one service doesn&#x27;t bring down the entire application.</td>
</tr>
<tr>
<td><strong>Flexibility</strong></td>
<td>Teams can choose the best technology stack for their specific service.</td>
</tr>
<tr>
<td><strong>Portability</strong></td>
<td>Containers make it easy to run services consistently across different environments.</td>
</tr>
</tbody></table>
<hr>
<h3 id="key-cloud-native-technologies">🧰 Key Cloud-Native Technologies</h3>
<ul>
<li><strong>Containerization</strong>: Docker, containerd</li>
<li><strong>Orchestration</strong>: Kubernetes</li>
<li><strong>Service Mesh</strong>: Istio, Linkerd</li>
<li><strong>Observability</strong>: Prometheus, Grafana, Jaeger, OpenTelemetry</li>
<li><strong>CI/CD</strong>: Jenkins, GitLab CI, GitHub Actions</li>
<li><strong>Infrastructure as Code (IaC)</strong>: Terraform, Ansible</li>
</ul>
<hr>
<h3 id="when-to-go-cloud-native">✅ When to Go Cloud Native</h3>
<table>
<thead><tr>
<th>Scenario</th>
<th>Recommendation</th>
</tr></thead><tbody>
<tr>
<td><strong>New Greenfield Projects</strong></td>
<td><strong>Yes</strong>: Start with a cloud-native approach from day one for maximum agility.</td>
</tr>
<tr>
<td><strong>Modernizing a Monolith</strong></td>
<td><strong>Yes, gradually</strong>: Use patterns like Strangler Fig to migrate parts of the monolith to cloud-native services.</td>
</tr>
<tr>
<td><strong>High Scalability &amp; Resilience Needs</strong></td>
<td><strong>Yes</strong>: Cloud-native is designed for systems that need to scale dynamically and withstand failures.</td>
</tr>
<tr>
<td><strong>Small, Simple Applications</strong></td>
<td><strong>Maybe not</strong>: The overhead of Kubernetes and other tools might be overkill for simple apps with low traffic.</td>
</tr>
<tr>
<td><strong>Team without DevOps/Cloud Experience</strong></td>
<td><strong>With caution</strong>: Adopting cloud-native requires a shift in culture and skills. Invest in training first.</td>
</tr>
</tbody></table>
</details>
<hr>
<details>
<summary><strong>🔄 13. The Saga Pattern for Distributed Transactions</strong></summary>
<p>Since microservices have their own databases, you cannot use traditional ACID transactions across services.</p>
<p>The <strong>Saga Pattern</strong> is a way to manage data consistency across microservices in a distributed transaction.</p>
<p>A saga is a sequence of local transactions.</p>
<p>Each local transaction updates the database within a single service and publishes an event or message that triggers the next local transaction in the saga.</p>
<p>If a local transaction fails, the saga executes a series of <strong>compensating transactions</strong> to undo the preceding transactions.</p>
<hr>
<h3 id="how-it-works">🧠 How It Works</h3>
<p>There are two common ways to coordinate a saga:</p>
<ul>
<li><strong>Choreography</strong>: Each service produces and listens to another service&#x27;s events and decides if an action should be taken. There is no central coordinator.</li>
<li><strong>Pros</strong>: Simple, loosely coupled.</li>
<li><strong>Cons</strong>: Can be hard to track which services listen to which events. Risk of cyclic dependencies.</li>
</ul>
<ul>
<li><strong>Orchestration</strong>: A central controller (the orchestrator) tells the participants what local transactions to execute. The orchestrator manages the entire sequence of events.</li>
<li><strong>Pros</strong>: Centralized logic, easier to understand and manage. Less coupling between services.</li>
<li><strong>Cons</strong>: The orchestrator can become a single point of failure.</li>
</ul>
<hr>
<h3 id="choreography-vs-orchestration-when-to-use-what">✅ Choreography vs. Orchestration: When to Use What?</h3>
<table>
<thead><tr>
<th>Scenario</th>
<th>Recommendation</th>
<th>Reason</th>
</tr></thead><tbody>
<tr>
<td><strong>Simple workflows with few participants</strong></td>
<td><strong>Choreography</strong></td>
<td>Avoids the complexity of a central orchestrator. Services are more decoupled.</td>
</tr>
<tr>
<td><strong>Complex workflows with many participants</strong></td>
<td><strong>Orchestration</strong></td>
<td>Centralized logic is easier to manage, monitor, and debug.</td>
</tr>
<tr>
<td><strong>Need for high-level visibility</strong></td>
<td><strong>Orchestration</strong></td>
<td>The orchestrator provides a single place to see the status of a transaction.</td>
</tr>
<tr>
<td><strong>Rapidly evolving services</strong></td>
<td><strong>Choreography</strong></td>
<td>Services can be added or changed without modifying a central orchestrator.</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-e-commerce-order">💡 Example: E-commerce Order</h3>
<p>An order process might involve three services: <code>Order Service</code>, <code>Payment Service</code>, and <code>Stock Service</code>.</p>
<h4 id="choreography-based-saga">Choreography-Based Saga:</h4>
<ul>
<li><code>Order Service</code> saves an order as <code>PENDING</code> and publishes an <code>ORDER_CREATED</code> event.</li>
<li><code>Payment Service</code> listens for <code>ORDER_CREATED</code>, processes the payment, and publishes a <code>PAYMENT_PROCESSED</code> event.</li>
<li><code>Stock Service</code> listens for <code>PAYMENT_PROCESSED</code>, updates the stock, and publishes a <code>STOCK_UPDATED</code> event.</li>
<li><code>Order Service</code> listens for <code>STOCK_UPDATED</code> and marks the order as <code>COMPLETED</code>.</li>
</ul>
<p><strong>If payment fails</strong>, <code>Payment Service</code> publishes a <code>PAYMENT_FAILED</code> event. <code>Order Service</code> listens and cancels the order (compensating transaction).</p>
<h4 id="orchestration-based-saga">Orchestration-Based Saga:</h4>
<ul>
<li>A client requests to create an order.</li>
<li>The <code>Order Orchestrator</code> receives the request and starts the saga.</li>
<li>It sends a <code>Process Payment</code> command to the <code>Payment Service</code>.</li>
<li>If successful, it sends an <code>Update Stock</code> command to the <code>Stock Service</code>.</li>
<li>If all steps succeed, it marks the order as complete.</li>
</ul>
<p><strong>If any step fails</strong>, the orchestrator sends compensating commands to the preceding services (e.g., <code>Refund Payment</code>).</p>
<hr>
<h3 id="when-to-use-the-saga-pattern">✅ When to Use the Saga Pattern</h3>
<ul>
<li>When you need to maintain data consistency across multiple services.</li>
<li>When you can live with eventual consistency.</li>
<li>For long-lived transactions that can&#x27;t hold locks for a long time.</li>
</ul>
</details>
<hr>
<details>
<summary><strong>🔀 14. CQRS (Command Query Responsibility Segregation)</strong></summary>
<p><strong>CQRS</strong> is a design pattern that separates the model for reading data (<strong>Query</strong>) from the model for writing data (<strong>Command</strong>). This means that you use a different model to update information than the model you use to read it.</p>
<p>In a traditional Create, Read, Update, Delete (CRUD) model, the same data model is used for both read and write operations. In complex domains, this can lead to overly complicated models that are difficult to maintain and optimize.</p>
<hr>
<h3 id="how-it-works">🧠 How It Works</h3>
<p>The core idea is to split the application into two parts:</p>
<ul>
<li><strong>Command Side</strong>: Handles create, update, and delete requests. These operations are typically task-based and can be processed asynchronously. The command side is focused on processing commands and ensuring data consistency.</li>
<li><strong>Query Side</strong>: Handles read requests. The query side is optimized for querying and can use a denormalized data model (a read model) to improve performance.</li>
</ul>
<p>The two sides can be synchronized using events. When the command side processes a command, it publishes an event, which the query side subscribes to in order to update its read model.</p>
<hr>
<h3 id="architecture">🏛️ Architecture</h3>
<p><img src="https://i.imgur.com/example.png" alt="CQRS Architecture">  &lt;!-- Replace with a real image URL if available --&gt;</p>
<table>
<thead><tr>
<th>Component</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Command</strong></td>
<td>An object that represents an intent to change the state of the system (e.g., <code>CreateUserCommand</code>).</td>
</tr>
<tr>
<td><strong>Command Handler</strong></td>
<td>Processes the command and executes the business logic.</td>
</tr>
<tr>
<td><strong>Query</strong></td>
<td>An object that represents a request for data (e.g., <code>GetUserByIdQuery</code>).</td>
</tr>
<tr>
<td><strong>Query Handler</strong></td>
<td>Retrieves data from the read store and returns it.</td>
</tr>
<tr>
<td><strong>Event Store</strong></td>
<td>Often used with CQRS, especially with Event Sourcing. Stores a sequence of events that represent changes.</td>
</tr>
<tr>
<td><strong>Read Model</strong></td>
<td>A denormalized view of the data, optimized for a specific query.</td>
</tr>
</tbody></table>
<hr>
<h3 id="advantages">✅ Advantages</h3>
<ul>
<li><strong>Scalability</strong>: You can scale the read and write sides independently. For example, if your application is read-heavy, you can add more instances to the query side.</li>
<li><strong>Performance</strong>: The query side can use a highly optimized data model for reads, avoiding complex joins and calculations.</li>
<li><strong>Flexibility</strong>: The separation allows you to use different database technologies for the read and write sides (e.g., a relational DB for writes and a document DB for reads).</li>
<li><strong>Simplicity</strong>: Each model (command and query) is simpler because it only has one responsibility.</li>
</ul>
<h3 id="challenges">⚠️ Challenges</h3>
<ul>
<li><strong>Complexity</strong>: CQRS introduces more complexity into the system, especially with the need to synchronize the read and write models.</li>
<li><strong>Eventual Consistency</strong>: Since the read model is updated asynchronously, there is a delay between the write and when the change is visible on the read side. This is not suitable for all use cases.</li>
<li><strong>Code Duplication</strong>: There might be some duplication of data structures between the command and query models.</li>
</ul>
<hr>
<h3 id="when-to-use-cqrs">✅ When to Use CQRS</h3>
<table>
<thead><tr>
<th>Scenario</th>
<th>Recommendation</th>
</tr></thead><tbody>
<tr>
<td><strong>High-performance applications</strong></td>
<td><strong>Yes</strong>: Optimize read and write workloads independently. Scale the read side for many users.</td>
</tr>
<tr>
<td><strong>Complex business domains</strong></td>
<td><strong>Yes</strong>: Simplifies models by separating concerns. Different models for writing and reading are clearer.</td>
</tr>
<tr>
<td><strong>Collaborative environments</strong></td>
<td><strong>Yes</strong>: Multiple users working on the same data can benefit from a command-based model to avoid conflicts.</td>
</tr>
<tr>
<td><strong>Simple CRUD-based applications</strong></td>
<td><strong>No</strong>: The complexity of CQRS is likely overkill. A traditional model is simpler to implement and maintain.</td>
</tr>
<tr>
<td><strong>Systems requiring strong consistency</strong></td>
<td><strong>With caution</strong>: The eventual consistency of the read model can be a challenge.</td>
</tr>
</tbody></table>
<hr>
<h3 id="conceptual-code-example-java">💡 Conceptual Code Example (Java)</h3>
<p>Here&#x27;s a simplified look at the components in a Java application.</p>
<pre><code class="language-java">
// --- Command Side ---

// A command object representing an intent
public class CreateUserCommand {
    private final String userId;
    private final String name;
    // constructor, getters
}

// A handler that processes the command
@Service
public class UserCommandHandler {
    public void handle(CreateUserCommand command) {
        // ... validation logic ...
        // ... save to write database ...
        // ... publish UserCreatedEvent ...
    }
}


# --- Query Side ---

// A simple DTO for the read model
public class UserDto {
    private String id;
    private String displayName;
    // constructor, getters
}

// A handler that processes queries
@Service
public class UserQueryHandler {
    public UserDto handle(GetUserQuery query) {
        // ... fetch from read database (e.g., a denormalized view) ...
        return new UserDto(...);
    }
}
</code></pre>
<hr>
<h3 id="cqrs-and-event-sourcing">🤝 CQRS and Event Sourcing</h3>
<p>CQRS is often used with <strong>Event Sourcing</strong>. In this pattern, instead of storing the current state of an entity, you store a sequence of state-changing events. The current state can be derived by replaying the events.</p>
<ul>
<li>The <strong>command</strong> side validates the command and, if successful, creates an event that is stored in the event store.</li>
<li>The <strong>query</strong> side listens to these events to build and update its read models.</li>
</ul>
<h2 id="cqrs-pattern-what-is-the-solution-scenario-used">Cqrs Pattern, what is the solution scenario used</h2>
<p>The Command Query Responsibility Segregation (CQRS) pattern is a design pattern that separates the responsibilities for reading and writing data in a system. In a traditional architecture, the same model is often used for both reading and writing operations. CQRS suggests splitting the model into two parts: one for handling commands (changing state) and another for handling queries (reading state).</p>
<p><strong>Solution Scenario for CQRS:</strong></p>
<h3 id="1-separation-of-concerns">1. <strong>Separation of Concerns:</strong></h3>
<ul>
<li><strong>Scenario:</strong></li>
</ul>
<ul>
<li>In a complex application, the requirements for reading data (queries) and writing data (commands) can be different.</li>
<li>Performance and scalability considerations may vary between reading and writing operations.</li>
</ul>
<ul>
<li><strong>Solution:</strong></li>
<li>CQRS allows you to create separate models for handling reads and writes.</li>
<li>The read model can be optimized for query performance and can be denormalized to suit the specific needs of different views.</li>
<li>The write model focuses on processing commands and updating the system&#x27;s state.</li>
</ul>
<h3 id="2-scalability">2. <strong>Scalability:</strong></h3>
<ul>
<li><strong>Scenario:</strong></li>
</ul>
<ul>
<li>Some systems may experience different scalability requirements for read and write operations.</li>
<li>Reads are often more frequent than writes in many applications.</li>
</ul>
<ul>
<li><strong>Solution:</strong></li>
<li>CQRS enables independent scaling of the read and write components.</li>
<li>Read models can be replicated or distributed to multiple servers for improved read performance, while the write model can be optimized for handling command processing.</li>
</ul>
<h3 id="3-flexibility-and-optimization">3. <strong>Flexibility and Optimization:</strong></h3>
<ul>
<li><strong>Scenario:</strong></li>
</ul>
<ul>
<li>Business requirements for reporting and analytics may differ from the requirements for transactional processing.</li>
<li>Read models might need to be denormalized or transformed to suit specific reporting needs.</li>
</ul>
<ul>
<li><strong>Solution:</strong></li>
<li>CQRS allows flexibility in designing read models tailored to specific query requirements.</li>
<li>You can optimize read models for specific use cases, aggregating data from multiple sources or transforming it as needed for presentation.</li>
</ul>
<h3 id="4-event-sourcing">4. <strong>Event Sourcing:</strong></h3>
<ul>
<li><strong>Scenario:</strong></li>
</ul>
<ul>
<li>Storing the state changes as a series of events can be valuable for auditing, debugging, or rebuilding the state at any point in time.</li>
</ul>
<ul>
<li><strong>Solution:</strong></li>
<li>CQRS is often used in conjunction with event sourcing. Instead of storing the current state of the system, events are stored, and the system&#x27;s state can be reconstructed by replaying these events.</li>
<li>Event sourcing can be particularly useful in scenarios where the history of state changes is important.</li>
</ul>
<h3 id="5-complex-domain-logic">5. <strong>Complex Domain Logic:</strong></h3>
<ul>
<li><strong>Scenario:</strong></li>
</ul>
<ul>
<li>In domains with complex business logic, separating read and write responsibilities can lead to a more maintainable and comprehensible system.</li>
</ul>
<ul>
<li><strong>Solution:</strong></li>
<li>CQRS allows for the creation of a domain model that focuses on handling commands and enforcing business rules without the complexities introduced by read-specific concerns.</li>
<li>Read models can be simpler and optimized for efficient querying.</li>
</ul>
<p>It&#x27;s important to note that while CQRS provides benefits, it also adds complexity to a system. Therefore, it&#x27;s generally recommended to apply CQRS in scenarios where the separation of concerns and independent scalability of read and write components provide significant advantages for the specific requirements of the application.</p>
</details>
<hr>
<details>
<summary><strong>🛡️ 15. Resilience and Fault Tolerance Patterns</strong></summary>
<p>In a distributed system like a microservices architecture, failures are inevitable. Resilience is the ability of the system to recover from failures and continue to function. Fault tolerance is the property that enables a system to continue operating properly in the event of the failure of some of its components.</p>
<p>Here are some key patterns to build resilient and fault-tolerant microservices:</p>
<hr>
<h3 id="1-circuit-breaker-pattern">🔌 1. Circuit Breaker Pattern</h3>
<p>Already covered in detail, this pattern prevents an application from repeatedly trying to execute an operation that is likely to fail.</p>
<hr>
<h3 id="2-retry-pattern">🔄 2. Retry Pattern</h3>
<p>The Retry pattern enables an application to handle transient failures by transparently retrying a failed operation. This is useful for temporary issues like network glitches or temporary service unavailability.</p>
<p><strong>Considerations:</strong></p>
<ul>
<li><strong>Idempotency</strong>: Ensure that retrying an operation does not have unintended side effects.</li>
<li><strong>Retry Strategy</strong>: Use an exponential backoff strategy (waiting longer between each retry) to avoid overwhelming a struggling service.</li>
</ul>
<hr>
<h3 id="3-timeout-pattern">⏳ 3. Timeout Pattern</h3>
<p>The Timeout pattern prevents an application from waiting indefinitely for a response from a remote service. By setting a timeout, you can free up resources and avoid cascading failures caused by long-running requests.</p>
<hr>
<h3 id="4-bulkhead-pattern">🧱 4. Bulkhead Pattern</h3>
<p>The Bulkhead pattern isolates elements of an application into pools so that if one fails, the others will continue to function. This is similar to the bulkheads in a ship&#x27;s hull. For example, you can limit the number of concurrent calls to a specific service, so a failure in that service doesn&#x27;t exhaust all available resources.</p>
<hr>
<h3 id="5-rate-limiter-pattern">🚦 5. Rate Limiter Pattern</h3>
<p>The Rate Limiter pattern controls the consumption of resources by limiting the rate at which a service can be called. This protects your services from being overwhelmed by too many requests, whether malicious (DDoS attacks) or unintentional.</p>
<p><strong>Common Algorithms:</strong></p>
<ul>
<li><strong>Token Bucket</strong>: A fixed number of tokens are available in a bucket. Each request consumes a token.</li>
<li><strong>Leaky Bucket</strong>: Requests are processed at a fixed rate.</li>
</ul>
<hr>
<h3 id="when-to-use-which-resilience-pattern">✅ When to Use Which Resilience Pattern?</h3>
<table>
<thead><tr>
<th>Pattern</th>
<th>When to Use It</th>
</tr></thead><tbody>
<tr>
<td><strong>Retry</strong></td>
<td>For transient, temporary failures (e.g., brief network error, temporary DB lock).</td>
</tr>
<tr>
<td><strong>Timeout</strong></td>
<td>To prevent a single long-running request from consuming resources indefinitely.</td>
</tr>
<tr>
<td><strong>Circuit Breaker</strong></td>
<td>To prevent cascading failures when a downstream service is completely unavailable or has high latency.</td>
</tr>
<tr>
<td><strong>Bulkhead</strong></td>
<td>To isolate failures and prevent one misbehaving service from exhausting all resources.</td>
</tr>
<tr>
<td><strong>Rate Limiter</strong></td>
<td>To protect a service from being overwhelmed by too many requests in a short period.</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-resilience4j-circuit-breaker-retry-javaspring-boot">💡 Example: Resilience4j Circuit Breaker + Retry (Java/Spring Boot)</h3>
<p>This example shows how to wrap a remote call with a circuit breaker and a retry mechanism.</p>
<pre><code class="language-java">
@Service
public class ExternalApiService {

    private final RestTemplate restTemplate;

    public ExternalApiService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    @CircuitBreaker(name = &quot;myService&quot;, fallbackMethod = &quot;fallback&quot;)
    @Retry(name = &quot;myService&quot;)
    public String fetchData() {
        // This call might fail
        return restTemplate.getForObject(&quot;http://example.com/data&quot;, String.class);
    }

    // Fallback method must have the same signature, plus the exception
    public String fallback(Throwable t) {
        // Return a default value or a cached response
        return &quot;Default Fallback Response&quot;;
    }
}
</code></pre>
<p>And the configuration in <code>application.yml</code>:</p>
<pre><code class="language-yaml">
resilience4j.retry:
  instances:
    myService:
      maxAttempts: 3
      waitDuration: 100ms

resilience4j.circuitbreaker:
  instances:
    myService:
      slidingWindowSize: 10
      failureRateThreshold: 50
      waitDurationInOpenState: 10s
</code></pre>
<hr>
<h3 id="tools-for-resilience">🧰 Tools for Resilience</h3>
<ul>
<li><strong>Resilience4j</strong>: A popular lightweight fault tolerance library for Java. It provides implementations for Circuit Breaker, Retry, Bulkhead, Rate Limiter, and more.</li>
<li><strong>Service Mesh (e.g., Istio, Linkerd)</strong>: Many resilience patterns (like retries, timeouts, and circuit breakers) can be configured at the infrastructure level using a service mesh, without changing the application code.</li>
</ul>
</details>
<hr>
<h1 id="1-all-keys-ids-clear-purpose-and-usage">1. All Keys &amp; IDs — Clear Purpose and Usage</h1>
<h3 id="11-idempotency-key">1.1 Idempotency Key</h3>
<p><strong>Purpose</strong>: Prevent <strong>duplicate execution</strong> of the <em>same operation</em></p>
<ul>
<li><strong>Used in</strong>: POST / PATCH APIs</li>
<li><strong>Generated by</strong>: Client</li>
<li><strong>Stored in</strong>: Redis / DB</li>
<li><strong>Lifetime</strong>: Short (e.g., 24 hours)</li>
</ul>
<h4 id="example">Example</h4>
<p>Client retries payment due to timeout → server executes only once.</p>
<h4 id="flow">Flow</h4>
<pre><code class="language-">
Client → POST /pay
Headers:
  Idempotency-Key: abc123
</code></pre>
<p>Server logic:</p>
<ul>
<li>If key exists → return cached response</li>
<li>If not → process &amp; store result</li>
</ul>
<hr>
<h3 id="12-request-id">1.2 Request ID</h3>
<p><strong>Purpose</strong>: Trace <strong>one HTTP request</strong></p>
<ul>
<li><strong>Used in</strong>: Logs</li>
<li><strong>Generated by</strong>: Client / Gateway / Server</li>
<li><strong>Lifetime</strong>: One request</li>
</ul>
<h4 id="example">Example</h4>
<p>Find logs for a failed API call.</p>
<pre><code class="language-">
X-Request-ID: req-789
</code></pre>
<hr>
<h3 id="13-correlation-id">1.3 Correlation ID</h3>
<p><strong>Purpose</strong>: Trace <strong>one business flow across services</strong></p>
<ul>
<li><strong>Used in</strong>: Microservices</li>
<li><strong>Generated by</strong>: Gateway / System</li>
<li><strong>Lifetime</strong>: Entire request chain</li>
</ul>
<h4 id="example">Example</h4>
<p>User request goes through Order → Payment → Inventory.</p>
<pre><code class="language-">
X-Correlation-ID: corr-456
</code></pre>
<hr>
<h3 id="14-primary-key">1.4 Primary Key</h3>
<p><strong>Purpose</strong>: Uniquely identify a database record</p>
<ul>
<li><strong>Used in</strong>: Database</li>
<li><strong>Generated by</strong>: Server</li>
<li><strong>Lifetime</strong>: Permanent</li>
</ul>
<h4 id="example">Example</h4>
<pre><code class="language-">
user_id = 101
order_id = 5001
</code></pre>
<hr>
<h3 id="15-snowflake-id">1.5 Snowflake ID</h3>
<p><strong>Purpose</strong>: Generate <strong>fast, unique, time-ordered IDs</strong></p>
<ul>
<li><strong>Used in</strong>: Distributed systems</li>
<li><strong>Generated by</strong>: Application node</li>
<li><strong>Lifetime</strong>: Permanent</li>
</ul>
<h3 id="example">Example</h3>
<pre><code class="language-">
739483920493829120
</code></pre>
<hr>
<h3 id="16-etag">1.6 ETag</h3>
<p><strong>Purpose</strong>: Prevent <strong>concurrent update conflicts</strong></p>
<ul>
<li><strong>Used in</strong>: GET / PUT / PATCH</li>
<li><strong>Generated by</strong>: Server</li>
<li><strong>Lifetime</strong>: Until resource changes</li>
</ul>
<h4 id="example">Example</h4>
<pre><code class="language-">
ETag: &quot;v5&quot;
If-Match: &quot;v5&quot;
</code></pre>
<hr>
<h2 id="2-framework-system-features">2. Framework &amp; System Features</h2>
<h3 id="21-spring-integration-idempotentreceiver">2.1 Spring Integration – IdempotentReceiver</h3>
<p><strong>Purpose</strong>: Avoid duplicate message processing</p>
<ul>
<li><strong>Used in</strong>: Kafka / RabbitMQ</li>
<li><strong>Key stored in</strong>: Metadata store</li>
</ul>
<h4 id="example">Example</h4>
<pre><code class="language-">
Message-ID → processed only once
</code></pre>
<hr>
<h3 id="22-shedlock">2.2 ShedLock</h3>
<p><strong>Purpose</strong>: Ensure <strong>only one instance</strong> runs a scheduled job</p>
<ul>
<li><strong>Used in</strong>: Distributed cron jobs</li>
<li><strong>Stored in</strong>: DB / Redis</li>
</ul>
<h4 id="example">Example</h4>
<pre><code class="language-java">
@Scheduled(cron = &quot;0 0 * * * *&quot;)
@SchedulerLock(name = &quot;cleanupJob&quot;)
</code></pre>
<hr>
<h3 id="23-etags-if-match">2.3 ETags (<code>If-Match</code>)</h3>
<p><strong>Purpose</strong>: Avoid lost updates</p>
<h4 id="example">Example</h4>
<p>Two users editing same record:</p>
<ul>
<li>User A updates → success</li>
<li>User B updates with old ETag → <strong>409 Conflict</strong></li>
</ul>
<hr>
<h3 id="24-custom-idempotency-implementation">2.4 Custom Idempotency Implementation</h3>
<p><strong>Purpose</strong>: Safe retries for APIs</p>
<h4 id="example">Example</h4>
<pre><code class="language-">
POST /order
Idempotency-Key: xyz789
</code></pre>
<hr>
<h2 id="3-full-ascii-diagram-all-concepts-included">3. Full ASCII Diagram (All Concepts Included)</h2>
<pre><code class="language-">
CLIENT
  |
  |  GET /orders/101
  |&lt;----------------------
  |       ETag: &quot;v5&quot;
  |
  |  PATCH /orders/101
  |  Headers:
  |   - If-Match: &quot;v5&quot;
  |   - Idempotency-Key
  |   - Request-ID
  |   - Correlation-ID
  v
API GATEWAY
  |
  |-- logs (Request-ID)
  |-- forwards (Correlation-ID)
  v
SERVICE A
  |
  |-- Validate ETag (If-Match)
  |-- Check Idempotency-Key (Redis)
  |-- Generate Snowflake ID (if new)
  |-- Persist using Primary Key
  v
DATABASE
  |
  |-- Update version → new ETag
  v
SERVICE B
  |
  |-- Same Correlation-ID
  v
LOGS / TRACING SYSTEM
</code></pre>
<hr>
<h2 id="4-where-each-one-is-used-one-glance-table">4. Where Each One Is Used (One Glance Table)</h2>
<table>
<thead><tr>
<th>Feature</th>
<th>Protects</th>
<th>Layer</th>
</tr></thead><tbody>
<tr>
<td>Idempotency Key</td>
<td>Duplicate operations</td>
<td>API</td>
</tr>
<tr>
<td>Request ID</td>
<td>One HTTP call</td>
<td>Logs</td>
</tr>
<tr>
<td>Correlation ID</td>
<td>End-to-end flow</td>
<td>Microservices</td>
</tr>
<tr>
<td>Primary Key</td>
<td>Data identity</td>
<td>Database</td>
</tr>
<tr>
<td>Snowflake ID</td>
<td>Scale &amp; uniqueness</td>
<td>System</td>
</tr>
<tr>
<td>ETag</td>
<td>Concurrent updates</td>
<td>Resource</td>
</tr>
<tr>
<td>ShedLock</td>
<td>Scheduled jobs</td>
<td>Infrastructure</td>
</tr>
<tr>
<td>IdempotentReceiver</td>
<td>Message replay</td>
<td>Messaging</td>
</tr>
</tbody></table>
<hr>
<h2 id="5-mental-model-exam-gold">5. Mental Model (Exam Gold 🧠)</h2>
<pre><code class="language-">
Same request retry?        → Idempotency Key
Same data edited twice?   → ETag
Same job on many pods?    → ShedLock
Same message twice?       → IdempotentReceiver
Track one call?           → Request ID
Track whole flow?         → Correlation ID
</code></pre>
<hr>
<h2 id="6-interview-one-line-summary">6. Interview One-Line Summary</h2>
<blockquote><strong>Ids track requests, keys prevent duplicates, ETags protect data, Snowflake scales, ShedLock coordinates, and Primary Keys persist identity.</strong></blockquote>
<hr>
<h2 id="7-spring-boot-code-examples-minimal-correct">7. Spring Boot Code Examples (Minimal &amp; Correct)</h2>
<h3 id="71-idempotency-key-post-patch-api">7.1 Idempotency Key (POST / PATCH API)</h3>
<h4 id="controller">Controller</h4>
<pre><code class="language-java">
@PostMapping(&quot;/payments&quot;)
public ResponseEntity&lt;?&gt; pay(
        @RequestHeader(&quot;Idempotency-Key&quot;) String key,
        @RequestBody PaymentRequest request) {

    return idempotencyService.execute(key, () -&gt; {
        Payment p = paymentService.process(request);
        return ResponseEntity.ok(p);
    });
}
</code></pre>
<h4 id="service-redis-backed">Service (Redis-backed)</h4>
<pre><code class="language-java">
public &lt;T&gt; T execute(String key, Supplier&lt;T&gt; action) {
    String redisKey = &quot;idem:&quot; + key;

    if (redisTemplate.hasKey(redisKey)) {
        return (T) redisTemplate.opsForValue().get(redisKey);
    }

    T result = action.get();
    redisTemplate.opsForValue().set(redisKey, result, Duration.ofHours(24));
    return result;
}
</code></pre>
<p>✅ <strong>Guarantee</strong>: Same request → same response → no double execution</p>
<hr>
<h3 id="72-request-id-correlation-id-filter">7.2 Request ID &amp; Correlation ID (Filter)</h3>
<pre><code class="language-java">
@Component
public class TraceFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain) throws IOException, ServletException {

        String requestId = Optional.ofNullable(request.getHeader(&quot;X-Request-Id&quot;))
                                   .orElse(UUID.randomUUID().toString());

        String correlationId = Optional.ofNullable(request.getHeader(&quot;X-Correlation-Id&quot;))
                                       .orElse(requestId);

        MDC.put(&quot;requestId&quot;, requestId);
        MDC.put(&quot;correlationId&quot;, correlationId);

        response.setHeader(&quot;X-Request-Id&quot;, requestId);
        response.setHeader(&quot;X-Correlation-Id&quot;, correlationId);

        chain.doFilter(request, response);
        MDC.clear();
    }
}
</code></pre>
<p>📌 Logs now show:</p>
<pre><code class="language-">
[requestId=abc] [correlationId=xyz]
</code></pre>
<hr>
<h3 id="73-snowflake-id-generator-simple">7.3 Snowflake ID Generator (Simple)</h3>
<pre><code class="language-java">
public class Snowflake {

    private static final long EPOCH = 1700000000000L;
    private long lastTimestamp = -1L;
    private long sequence = 0L;

    public synchronized long nextId() {
        long ts = System.currentTimeMillis() - EPOCH;
        if (ts == lastTimestamp) sequence++;
        else sequence = 0;

        lastTimestamp = ts;
        return (ts &lt;&lt; 12) | sequence;
    }
}
</code></pre>
<p>✅ Time-ordered</p>
<p>✅ Distributed-safe</p>
<p>✅ DB-independent</p>
<hr>
<h3 id="74-etag-with-spring-boot-rest">7.4 ETag with Spring Boot (REST)</h3>
<h4 id="entity">Entity</h4>
<pre><code class="language-java">
@Entity
public class Order {
    @Id
    private Long id;

    private String status;

    @Version
    private Long version;
}
</code></pre>
<h4 id="controller">Controller</h4>
<pre><code class="language-java">
@GetMapping(&quot;/orders/{id}&quot;)
public ResponseEntity&lt;Order&gt; get(@PathVariable Long id) {
    Order order = repo.findById(id).orElseThrow();
    return ResponseEntity.ok()
            .eTag(&quot;\&quot;&quot; + order.getVersion() + &quot;\&quot;&quot;)
            .body(order);
}
</code></pre>
<pre><code class="language-java">
@PatchMapping(&quot;/orders/{id}&quot;)
public ResponseEntity&lt;?&gt; update(
        @PathVariable Long id,
        @RequestHeader(&quot;If-Match&quot;) String etag,
        @RequestBody Order req) {

    Order order = repo.findById(id).orElseThrow();

    if (!etag.equals(&quot;\&quot;&quot; + order.getVersion() + &quot;\&quot;&quot;)) {
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).build();
    }

    order.setStatus(req.getStatus());
    repo.save(order);
    return ResponseEntity.ok(order);
}
</code></pre>
<hr>
<h3 id="75-shedlock-distributed-cron">7.5 ShedLock (Distributed Cron)</h3>
<pre><code class="language-java">
@Scheduled(cron = &quot;0 0 * * * *&quot;)
@SchedulerLock(name = &quot;hourlyCleanup&quot;, lockAtMostFor = &quot;10m&quot;)
public void cleanup() {
    // runs on only ONE node
}
</code></pre>
<hr>
<h3 id="76-spring-integration-idempotentreceiver">7.6 Spring Integration – IdempotentReceiver</h3>
<pre><code class="language-java">
@Bean
public IntegrationFlow flow(MetadataStore store) {
    return IntegrationFlows.from(&quot;inputChannel&quot;)
        .idempotentReceiver(
            headerExpression(&quot;messageId&quot;),
            new MetadataStoreSelector(store)
        )
        .handle(msg -&gt; process(msg))
        .get();
}
</code></pre>
<p>✅ Duplicate Kafka/RabbitMQ messages ignored</p>
<hr>
<h2 id="8-redis-schema-design-production">8. Redis Schema Design (Production)</h2>
<pre><code class="language-">
idem:{Idempotency-Key} → API response (TTL 24h)
lock:hourlyCleanup     → ShedLock entry
msg:{Message-ID}       → Processed message
</code></pre>
<p>✔ TTL mandatory</p>
<p>✔ Small payloads</p>
<p>✔ No permanent storage</p>
<hr>
<h2 id="9-etag-vs-version-very-important">9. ETag vs <code>@Version</code> (Very Important)</h2>
<table>
<thead><tr>
<th>Aspect</th>
<th>ETag</th>
<th><code>@Version</code></th>
</tr></thead><tbody>
<tr>
<td>Layer</td>
<td>HTTP</td>
<td>Database</td>
</tr>
<tr>
<td>Client aware</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Prevents</td>
<td>Lost updates</td>
<td>Dirty writes</td>
</tr>
<tr>
<td>Works without REST</td>
<td>❌</td>
<td>✅</td>
</tr>
</tbody></table>
<p>📌 <strong>Best practice</strong>:</p>
<p><strong>Use both together</strong></p>
<hr>
<h2 id="10-common-interview-trap-questions">10. Common Interview Trap Questions ⚠️</h2>
<h3 id="is-idempotency-key-same-as-etag">❓ “Is Idempotency Key same as ETag?”</h3>
<p>❌ No</p>
<ul>
<li>Idempotency → request safety</li>
<li>ETag → data consistency</li>
</ul>
<hr>
<h3 id="can-request-id-replace-correlation-id">❓ “Can Request ID replace Correlation ID?”</h3>
<p>❌ No</p>
<ul>
<li>Request ID = one hop</li>
<li>Correlation ID = many hops</li>
</ul>
<hr>
<h3 id="can-snowflake-be-primary-key">❓ “Can Snowflake be Primary Key?”</h3>
<p>✅ Yes (very common)</p>
<hr>
<h3 id="is-etag-needed-if-using-version">❓ “Is ETag needed if using <code>@Version</code>?”</h3>
<p>✅ Yes (for REST clients)</p>
<hr>
<h2 id="11-ultimate-mental-map">11. Ultimate Mental Map 🧠</h2>
<pre><code class="language-">
Duplicate API retry?      → Idempotency Key
Duplicate message?        → IdempotentReceiver
Concurrent update?        → ETag + @Version
Multiple pods cron?       → ShedLock
Trace one HTTP call?      → Request ID
Trace full request flow?  → Correlation ID
Scale ID generation?      → Snowflake
</code></pre>
<hr>
<h2 id="12-final-interview-one-liner">12. Final Interview One-Liner</h2>
<blockquote><strong>Idempotency protects operations, ETags protect data, IDs protect observability, Snowflake protects scale, and locks protect coordination.</strong></blockquote>
<hr>
<h2 id="below-is-a-ready-to-copy-spring-boot-starter-template-that-already-includes">Below is a ready-to-copy Spring Boot starter template that already includes:</h2>
<p>✅ Idempotency Key (Redis)</p>
<p>✅ Request ID + Correlation ID</p>
<p>✅ ETag + <code>@Version</code></p>
<p>✅ Snowflake ID</p>
<p>✅ ShedLock</p>
<p>✅ Clean structure (production-style)</p>
<p>You can <strong>copy-paste and run</strong>.</p>
<hr>
<h2 id="1-project-structure-recommended">1. Project Structure (Recommended)</h2>
<pre><code class="language-">
spring-boot-starter-template
 ├── config
 │   ├── RedisConfig.java
 │   ├── TraceFilter.java
 │   └── ShedLockConfig.java
 ├── controller
 │   └── OrderController.java
 ├── service
 │   ├── IdempotencyService.java
 │   └── OrderService.java
 ├── util
 │   └── SnowflakeIdGenerator.java
 ├── entity
 │   └── Order.java
 ├── repository
 │   └── OrderRepository.java
 └── Application.java
</code></pre>
<hr>
<h2 id="2-pomxml-minimal-complete">2. <code>pom.xml</code> (Minimal &amp; Complete)</h2>
<pre><code class="language-xml">
&lt;dependencies&gt;

    &lt;!-- Web --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
    &lt;/dependency&gt;

    &lt;!-- JPA --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
    &lt;/dependency&gt;

    &lt;!-- Redis --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
    &lt;/dependency&gt;

    &lt;!-- ShedLock --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;net.javacrumbs.shedlock&lt;/groupId&gt;
        &lt;artifactId&gt;shedlock-spring&lt;/artifactId&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;net.javacrumbs.shedlock&lt;/groupId&gt;
        &lt;artifactId&gt;shedlock-provider-jdbc-template&lt;/artifactId&gt;
    &lt;/dependency&gt;

    &lt;!-- DB --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;com.h2database&lt;/groupId&gt;
        &lt;artifactId&gt;h2&lt;/artifactId&gt;
        &lt;scope&gt;runtime&lt;/scope&gt;
    &lt;/dependency&gt;

&lt;/dependencies&gt;
</code></pre>
<hr>
<h2 id="3-request-id-correlation-id-filter">3. Request ID &amp; Correlation ID Filter</h2>
<pre><code class="language-java">
@Component
public class TraceFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        String requestId = Optional.ofNullable(request.getHeader(&quot;X-Request-Id&quot;))
                .orElse(UUID.randomUUID().toString());

        String correlationId = Optional.ofNullable(request.getHeader(&quot;X-Correlation-Id&quot;))
                .orElse(requestId);

        MDC.put(&quot;requestId&quot;, requestId);
        MDC.put(&quot;correlationId&quot;, correlationId);

        response.setHeader(&quot;X-Request-Id&quot;, requestId);
        response.setHeader(&quot;X-Correlation-Id&quot;, correlationId);

        chain.doFilter(request, response);
        MDC.clear();
    }
}
</code></pre>
<hr>
<h2 id="4-redis-config-idempotency">4. Redis Config (Idempotency)</h2>
<pre><code class="language-java">
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate&lt;String, Object&gt; redisTemplate(
            RedisConnectionFactory factory) {

        RedisTemplate&lt;String, Object&gt; template = new RedisTemplate&lt;&gt;();
        template.setConnectionFactory(factory);
        return template;
    }
}
</code></pre>
<hr>
<h2 id="5-idempotency-service">5. Idempotency Service</h2>
<pre><code class="language-java">
@Service
public class IdempotencyService {

    private final RedisTemplate&lt;String, Object&gt; redisTemplate;

    public IdempotencyService(RedisTemplate&lt;String, Object&gt; redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public &lt;T&gt; T execute(String key, Supplier&lt;T&gt; action) {
        String redisKey = &quot;idem:&quot; + key;

        if (redisTemplate.hasKey(redisKey)) {
            return (T) redisTemplate.opsForValue().get(redisKey);
        }

        T result = action.get();
        redisTemplate.opsForValue().set(redisKey, result, Duration.ofHours(24));
        return result;
    }
}
</code></pre>
<hr>
<h2 id="6-snowflake-id-generator">6. Snowflake ID Generator</h2>
<pre><code class="language-java">
@Component
public class SnowflakeIdGenerator {

    private static final long EPOCH = 1700000000000L;
    private long sequence = 0;
    private long lastTimestamp = -1;

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis() - EPOCH;

        if (timestamp == lastTimestamp) {
            sequence++;
        } else {
            sequence = 0;
        }

        lastTimestamp = timestamp;
        return (timestamp &lt;&lt; 12) | sequence;
    }
}
</code></pre>
<hr>
<h2 id="7-entity-with-version-etag-support">7. Entity with <code>@Version</code> (ETag support)</h2>
<pre><code class="language-java">
@Entity
public class Order {

    @Id
    private Long id;

    private String status;

    @Version
    private Long version;

    // getters &amp; setters
}
</code></pre>
<hr>
<h2 id="8-repository">8. Repository</h2>
<pre><code class="language-java">
public interface OrderRepository extends JpaRepository&lt;Order, Long&gt; {
}
</code></pre>
<hr>
<h2 id="9-service-layer">9. Service Layer</h2>
<pre><code class="language-java">
@Service
public class OrderService {

    private final OrderRepository repo;
    private final SnowflakeIdGenerator idGen;

    public OrderService(OrderRepository repo, SnowflakeIdGenerator idGen) {
        this.repo = repo;
        this.idGen = idGen;
    }

    public Order create(String status) {
        Order order = new Order();
        order.setId(idGen.nextId());
        order.setStatus(status);
        return repo.save(order);
    }
}
</code></pre>
<hr>
<h2 id="10-controller-idempotency-etag">10. Controller (Idempotency + ETag)</h2>
<pre><code class="language-java">
@RestController
@RequestMapping(&quot;/orders&quot;)
public class OrderController {

    private final OrderService service;
    private final OrderRepository repo;
    private final IdempotencyService idem;

    public OrderController(OrderService service,
                           OrderRepository repo,
                           IdempotencyService idem) {
        this.service = service;
        this.repo = repo;
        this.idem = idem;
    }

    @PostMapping
    public ResponseEntity&lt;Order&gt; create(
            @RequestHeader(&quot;Idempotency-Key&quot;) String key,
            @RequestParam String status) {

        return idem.execute(key, () -&gt;
                ResponseEntity.ok(service.create(status)));
    }

    @GetMapping(&quot;/{id}&quot;)
    public ResponseEntity&lt;Order&gt; get(@PathVariable Long id) {
        Order order = repo.findById(id).orElseThrow();
        return ResponseEntity.ok()
                .eTag(&quot;\&quot;&quot; + order.getVersion() + &quot;\&quot;&quot;)
                .body(order);
    }

    @PatchMapping(&quot;/{id}&quot;)
    public ResponseEntity&lt;?&gt; update(
            @PathVariable Long id,
            @RequestHeader(&quot;If-Match&quot;) String etag,
            @RequestParam String status) {

        Order order = repo.findById(id).orElseThrow();

        if (!etag.equals(&quot;\&quot;&quot; + order.getVersion() + &quot;\&quot;&quot;)) {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).build();
        }

        order.setStatus(status);
        return ResponseEntity.ok(repo.save(order));
    }
}
</code></pre>
<hr>
<h2 id="11-shedlock-config-job">11. ShedLock Config + Job</h2>
<pre><code class="language-java">
@Configuration
@EnableScheduling
public class ShedLockConfig {

    @Bean
    public LockProvider lockProvider(DataSource ds) {
        return new JdbcTemplateLockProvider(ds);
    }
}
</code></pre>
<pre><code class="language-java">
@Scheduled(cron = &quot;0 0 * * * *&quot;)
@SchedulerLock(name = &quot;cleanupJob&quot;)
public void cleanup() {
    // runs on only one instance
}
</code></pre>
<hr>
<h1 id="12-applicationyml">12. <code>application.yml</code></h1>
<pre><code class="language-yaml">
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: update

  redis:
    host: localhost
    port: 6379
</code></pre>
<hr>
<h2 id="13-what-this-template-gives-you">13. What This Template Gives You 🚀</h2>
<p>✔ Safe API retries</p>
<p>✔ Full request tracing</p>
<p>✔ Distributed-safe IDs</p>
<p>✔ REST concurrency protection</p>
<p>✔ Cluster-safe schedulers</p>
<p>✔ Interview-grade architecture</p>
<hr>
<h1 id="key-components-of-microservices-architecture">🧩 Key Components of Microservices Architecture</h1>
<details>  
<summary>🧩 Key Components of Microservices Architecture</summary>  
<p>Build scalable, flexible, and robust systems by mastering these building blocks 👇</p>
<hr>
<details>  
<summary>1️⃣ 🛠 API Gateway</summary>  
<ul>
<li>Entry point for <strong>all client requests</strong>.</li>
<li>Handles <strong>routing, auth, rate limiting, and logging</strong>.</li>
<li>Examples: <strong>Spring Cloud Gateway, Zuul</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>2️⃣ 📘 Service Registry & Discovery</summary>  
<ul>
<li>Dynamically tracks services and their <strong>network locations</strong>.</li>
<li>Avoids <strong>hardcoded IPs</strong>.</li>
<li>Examples: <strong>Eureka, Consul, Zookeeper</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>3️⃣ ⚖️ Load Balancer</summary>  
<ul>
<li>Distributes requests evenly across <strong>multiple service instances</strong>.</li>
<li>Ensures <strong>high availability and performance</strong>.</li>
<li>Examples: <strong>Ribbon, NGINX, Kubernetes Services</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>4️⃣ ⚙️ Configuration Server</summary>  
<ul>
<li>Centralized management of <strong>application configs</strong>.</li>
<li>Enables <strong>dynamic updates</strong> without redeployment.</li>
<li>Examples: <strong>Spring Cloud Config, Consul KV</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>5️⃣ 🗄️ Database per Service</summary>  
<ul>
<li>Each microservice owns its <strong>own database/schema</strong>.</li>
<li>Prevents <strong>tight coupling</strong> and enables independent scaling.</li>
</ul>
</details>  
<hr>
<details>  
<summary>6️⃣ 📊 Monitoring & Logging</summary>  
<ul>
<li>Provides <strong>observability</strong> into microservices health and performance.</li>
<li>Tools: <strong>ELK Stack, Prometheus, Grafana, Zipkin, Jaeger</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>7️⃣ 🔐 Security Layer</summary>  
<ul>
<li>Protects service communication and endpoints.</li>
<li>Techniques: <strong>JWT, OAuth2, HTTPS, Role-Based Access (RBAC)</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>8️⃣ 📤 Message Broker (Optional)</summary>  
<ul>
<li>Enables <strong>asynchronous communication</strong> between services.</li>
<li>Improves <strong>decoupling and resilience</strong>.</li>
<li>Examples: <strong>Kafka, RabbitMQ, ActiveMQ</strong>.</li>
</ul>
<pre><code class="language-text">
   🌍 Client Request
           |
           v
     🛠 API Gateway
           |
           v
📘 Service Discovery &lt;--&gt; ⚖️ Load Balancer
           |
           v
     🗄️ Microservice
     /        |        \
DB (own)   Logs 📊   🔐 Secure
           |
           v
 📤 Message Broker (async)
</code></pre>
</details>  
<hr>
<details>  
<summary>📋 Quick Reference Table</summary>  
<table>
<thead><tr>
<th>Component</th>
<th>Purpose</th>
<th>Examples</th>
</tr></thead><tbody>
<tr>
<td>🛠 API Gateway</td>
<td>Entry point, routing, security</td>
<td>Spring Cloud Gateway, Zuul</td>
</tr>
<tr>
<td>📘 Service Registry</td>
<td>Service discovery, avoid hardcoding</td>
<td>Eureka, Consul, Zookeeper</td>
</tr>
<tr>
<td>⚖️ Load Balancer</td>
<td>Distribute traffic, improve uptime</td>
<td>Ribbon, NGINX, K8s Services</td>
</tr>
<tr>
<td>⚙️ Config Server</td>
<td>Centralized configs, dynamic updates</td>
<td>Spring Cloud Config, Consul KV</td>
</tr>
<tr>
<td>🗄️ DB per Service</td>
<td>Data isolation, avoid coupling</td>
<td>Independent schema per service</td>
</tr>
<tr>
<td>📊 Monitoring &amp; Logging</td>
<td>Observability, debugging</td>
<td>ELK, Prometheus, Grafana, Zipkin</td>
</tr>
<tr>
<td>🔐 Security Layer</td>
<td>Auth, encryption, RBAC</td>
<td>JWT, OAuth2, HTTPS</td>
</tr>
<tr>
<td>📤 Message Broker</td>
<td>Async comms, decoupling</td>
<td>Kafka, RabbitMQ, ActiveMQ</td>
</tr>
</tbody></table>
</details>  
<hr>
<p>✅ <strong>Summary</strong>:</p>
<p>Microservices architecture is powered by <strong>API gateways, service discovery, load balancers, config servers, independent databases, observability tools, security, and optional message brokers</strong>. Mastering these ensures a <strong>scalable, secure, and resilient</strong> system 🚀.</p>
</details>  
<hr>
<details>  
<summary>✅ How to Handle Microservice Slowness due to External API Calls</summary>  
<p>“When a microservice slows down due to external API calls, I focus on making the system <strong>faster, more resilient, and non-blocking</strong>. Here’s my approach 👇”</p>
<hr>
<details>  
<summary>1️⃣ Analyze with Tracing & Logs</summary>  
<ul>
<li>Use <strong>Spring Cloud Sleuth + Zipkin</strong>, <strong>New Relic</strong>, or <strong>Jaeger</strong>.</li>
<li>Identify <strong>slow API dependencies, latency, and failure points</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>2️⃣ Add Timeouts ⏳</summary>  
<ul>
<li>Configure <strong>connection &amp; read timeouts</strong> in <code>RestTemplate</code> / <code>WebClient</code>.</li>
<li>Prevents <strong>threads hanging indefinitely</strong> on external calls.</li>
</ul>
</details>  
<hr>
<details>  
<summary>3️⃣ Use Circuit Breaker ⚡</summary>  
<ul>
<li>Implement <strong>Resilience4j</strong> or <strong>Hystrix</strong>.</li>
<li>Breaks the circuit after repeated failures.</li>
<li>Avoids <strong>cascading failures</strong> across the system.</li>
</ul>
</details>  
<hr>
<details>  
<summary>4️⃣ Apply Fallback Logic 🔄</summary>  
<ul>
<li>Return <strong>default response</strong> or <strong>cached data</strong> when API fails.</li>
<li>Enables <strong>graceful degradation</strong> for better UX.</li>
</ul>
</details>  
<hr>
<details>  
<summary>5️⃣ Make Calls Asynchronous 🧵</summary>  
<ul>
<li>Use <code>@Async</code>, <code>CompletableFuture</code>, or <strong>Project Reactor</strong> (<code>WebClient</code>).</li>
<li>Makes calls <strong>non-blocking</strong>.</li>
<li>Improves <strong>throughput and scalability</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>6️⃣ Implement Caching (Redis) ⚡</summary>  
<ul>
<li>Cache <strong>frequent or predictable responses</strong>.</li>
<li>Reduces repeated external API calls.</li>
<li>Improves <strong>latency</strong> and <strong>availability</strong>.</li>
</ul>
</details>  
<hr>
<details>  
<summary>7️⃣ Use Bulkhead Pattern 🧱</summary>  
<ul>
<li>Assign <strong>dedicated thread pool</strong> for external API calls.</li>
<li>Prevents <strong>one slow API</strong> from blocking the entire microservice.</li>
</ul>
</details>  
<hr>
<details>  
<summary>📊 ASCII Flow</summary>  
<pre><code class="language-text">
 Client Request
        |
        v
   Microservice
   [External API Call]
        |
   ┌───────────────┐
   │ Resilience Layer│
   │ Timeouts ⏳     │
   │ Circuit Breaker⚡│
   │ Bulkheads 🧱    │
   └───────────────┘
        |
   Fallback / Cache 🔄
        |
        v
 Response to Client ✅
</code></pre>
</details>  
<hr>
<details>  
<summary>📋 Quick Reference Table</summary>  
<table>
<thead><tr>
<th>Strategy</th>
<th>Tool/Tech Examples</th>
<th>Purpose 🚀</th>
</tr></thead><tbody>
<tr>
<td>Tracing &amp; Logs</td>
<td>Sleuth, Zipkin, Jaeger</td>
<td>Detect bottlenecks</td>
</tr>
<tr>
<td>Timeouts ⏳</td>
<td>RestTemplate, WebClient</td>
<td>Avoid thread blocking</td>
</tr>
<tr>
<td>Circuit Breaker ⚡</td>
<td>Resilience4j, Hystrix</td>
<td>Stop cascading failures</td>
</tr>
<tr>
<td>Fallback Logic 🔄</td>
<td>Custom defaults, Cache</td>
<td>Graceful degradation</td>
</tr>
<tr>
<td>Async Calls 🧵</td>
<td>CompletableFuture, Reactor</td>
<td>Free up main threads</td>
</tr>
<tr>
<td>Caching ⚡</td>
<td>Redis, Hazelcast</td>
<td>Faster responses</td>
</tr>
<tr>
<td>Bulkhead Pattern 🧱</td>
<td>Resilience4j Thread Pools</td>
<td>Isolate failures</td>
</tr>
</tbody></table>
</details>  
<hr>
<p>🧠 <strong>Final Note</strong>:</p>
<p>By combining <strong>timeouts, circuit breakers, async patterns, caching, and bulkheads</strong>, you can make microservices <strong>resilient to external slowness</strong> while still serving users smoothly ✅.</p>
</details>  
<hr>
<ul>
<li>✅ <code>WebClient</code> with <strong>timeouts</strong></li>
<li>✅ <strong>Resilience4j</strong> circuit breaker + fallback</li>
<li>✅ <strong>Async execution</strong></li>
<li>✅ <strong>Redis caching</strong> for fallback</li>
</ul>
<hr>
<details>  
<summary>📄 Spring Boot Sample Code – Resilient External API Call</summary>  
<pre><code class="language-java">
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
                .clientConnector(
                        new ReactorClientHttpConnector(
                                HttpClient.create()
                                        .responseTimeout(Duration.ofSeconds(3)) // ⏳ Timeout
                        )
                )
                .build();
    }
}
</code></pre>
<pre><code class="language-java">
@Service
public class ExternalApiService {

    private final WebClient webClient;
    private final RedisTemplate&lt;String, String&gt; redisTemplate;

    public ExternalApiService(WebClient webClient, RedisTemplate&lt;String, String&gt; redisTemplate) {
        this.webClient = webClient;
        this.redisTemplate = redisTemplate;
    }

    @CircuitBreaker(name = &quot;externalApi&quot;, fallbackMethod = &quot;fallbackResponse&quot;) // ⚡ Circuit Breaker
    @Async // 🧵 Async execution
    public CompletableFuture&lt;String&gt; callExternalApi() {
        return webClient.get()
                .uri(&quot;https://slow-api.com/data&quot;)
                .retrieve()
                .bodyToMono(String.class)
                .toFuture()
                .thenApply(response -&gt; {
                    // Cache successful response
                    redisTemplate.opsForValue().set(&quot;externalApiCache&quot;, response, Duration.ofMinutes(5));
                    return response;
                });
    }

    // 🔄 Fallback logic
    private CompletableFuture&lt;String&gt; fallbackResponse(Throwable ex) {
        String cached = redisTemplate.opsForValue().get(&quot;externalApiCache&quot;);
        if (cached != null) {
            return CompletableFuture.completedFuture(&quot;[CACHE] &quot; + cached);
        }
        return CompletableFuture.completedFuture(&quot;[DEFAULT RESPONSE] External API unavailable&quot;);
    }
}
</code></pre>
<pre><code class="language-yaml">
# application.yml
resilience4j:
  circuitbreaker:
    instances:
      externalApi:
        failureRateThreshold: 50       # % of failures before opening circuit
        waitDurationInOpenState: 10s   # how long before retry
        permittedNumberOfCallsInHalfOpenState: 3
        slidingWindowSize: 10
</code></pre>
</details>  
<hr>
<details>  
<summary>📊 ASCII Flow</summary>  
<pre><code class="language-text">
 Client Request
       |
       v
  ExternalApiService
       |
       v
   WebClient (3s timeout) ⏳
       |
   Resilience4j Circuit Breaker ⚡
       |
   ┌───────────────┐
   │ API Response   │
   │ OR             │
   │ Fallback 🔄    │
   └───────────────┘
       |
   Redis Cache ⚡ (if API fails)
       |
       v
 Response to Client ✅
</code></pre>
</details>  
<hr>
<details>  
<summary>📋 Quick Reference Table</summary>  
<table>
<thead><tr>
<th>Feature</th>
<th>Implementation</th>
<th>Purpose 🚀</th>
</tr></thead><tbody>
<tr>
<td>Timeout ⏳</td>
<td><code>responseTimeout(3s)</code></td>
<td>Avoid hanging calls</td>
</tr>
<tr>
<td>Circuit Breaker ⚡</td>
<td>Resilience4j (<code>@CircuitBreaker</code>)</td>
<td>Stop cascading failures</td>
</tr>
<tr>
<td>Fallback 🔄</td>
<td><code>fallbackResponse()</code> method</td>
<td>Graceful degradation</td>
</tr>
<tr>
<td>Async Execution 🧵</td>
<td><code>@Async CompletableFuture</code></td>
<td>Non-blocking threads</td>
</tr>
<tr>
<td>Cache ⚡</td>
<td>RedisTemplate</td>
<td>Faster fallback responses</td>
</tr>
</tbody></table>
</details>  
<hr>
<p>✅ With this setup:</p>
<ul>
<li>If the <strong>API is fast</strong> → return &amp; cache response.</li>
<li>If the <strong>API is slow/unavailable</strong> → circuit breaker trips → return <strong>cached or default fallback</strong>.</li>
<li>All calls are <strong>async &amp; non-blocking</strong>.</li>
</ul>
<hr>
<p>Alright 👍</p>
<h3 id="real-world-microservice-example-graceful-shutdown-flag-in-spring-boot"><strong>Real-World Microservice Example: Graceful Shutdown Flag in Spring Boot</strong></h3>
<p>In microservices, you often have <strong>background tasks</strong> (e.g., polling a queue, scheduled jobs). When shutting down the application, you want to <strong>signal those threads to stop gracefully</strong>.</p>
<hr>
<h3 id="example-background-job-with-volatile-flag"><strong>Example: Background Job with <code>volatile</code> flag</strong></h3>
<pre><code class="language-java">
import org.springframework.stereotype.Component;

@Component
public class BackgroundJob implements Runnable {

    private volatile boolean running = true; // shutdown flag

    @Override
    public void run() {
        while (running) {
            System.out.println(&quot;Processing background task...&quot;);

            try {
                Thread.sleep(2000); // simulate work
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        System.out.println(&quot;Background job stopped.&quot;);
    }

    public void stopJob() {
        running = false; // ensure visibility across threads
    }
}
</code></pre>
<hr>
<h3 id="triggering-stop-on-shutdown"><strong>Triggering Stop on Shutdown</strong></h3>
<p>Use Spring Boot’s <strong>lifecycle hooks</strong> to stop the job when the application shuts down:</p>
<pre><code class="language-java">
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShutdownManager {

    @Autowired
    private BackgroundJob backgroundJob;

    @PreDestroy
    public void onShutdown() {
        System.out.println(&quot;Application shutting down... stopping background job.&quot;);
        backgroundJob.stopJob();
    }
}
</code></pre>
<hr>
<h3 id="main-application"><strong>Main Application</strong></h3>
<pre><code class="language-java">
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

    private final BackgroundJob backgroundJob;

    public DemoApplication(BackgroundJob backgroundJob) {
        this.backgroundJob = backgroundJob;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) {
        new Thread(backgroundJob).start(); // start job in separate thread
    }
}
</code></pre>
<h3 id="how-it-works"><strong>How it works</strong></h3>
<ul>
<li>The background job runs in its own thread.</li>
<li>On shutdown, Spring calls <code>@PreDestroy</code>, setting the <code>volatile running</code> flag to <code>false</code>.</li>
<li>The worker thread immediately <strong>sees the update</strong> and exits the loop gracefully.</li>
</ul>
<p>✅ <strong>This is a classic real-world use of <code>volatile</code>:</strong> a <strong>lightweight shutdown flag</strong> for background workers in microservices.</p>
<hr>
<h3 id="scenario-counter-increment"><strong>Scenario: Counter Increment</strong></h3>
<p>Suppose we want to count requests in a Spring Boot app.</p>
<h4 id="using-volatile-only-wrong">❌ Using <code>volatile</code> only (WRONG)</h4>
<pre><code class="language-java">
public class RequestCounter {
    private volatile int count = 0;

    public void increment() {
        count++; // not atomic!
    }

    public int getCount() {
        return count;
    }
}
</code></pre>
<ul>
<li>Problem: <code>count++</code> is actually <strong>three steps</strong>:</li>
</ul>
<ul>
<li>Read value</li>
<li>Increment</li>
<li>Write back</li>
</ul>
<p>Even if <code>count</code> is <code>volatile</code>, <strong>two threads can read the same old value and overwrite each other’s increment</strong>.</p>
<p>This causes <strong>lost updates</strong>.</p>
<hr>
<h4 id="correct-approach-use-atomicinteger">✅ Correct Approach: Use <code>AtomicInteger</code></h4>
<pre><code class="language-java">
import java.util.concurrent.atomic.AtomicInteger;

public class RequestCounter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet(); // atomic operation
    }

    public int getCount() {
        return count.get();
    }
}
</code></pre>
<ul>
<li><code>AtomicInteger</code> ensures <strong>atomicity + visibility</strong>.</li>
<li>No updates are lost, even with 100s of threads.</li>
</ul>
<hr>
<h3 id="real-world-microservice-example"><strong>Real-World Microservice Example</strong></h3>
<p>Counting API requests in Spring Boot:</p>
<pre><code class="language-java">
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class RequestController {

    private final AtomicInteger counter = new AtomicInteger();

    @GetMapping(&quot;/api/hello&quot;)
    public String hello() {
        int requestNumber = counter.incrementAndGet();
        return &quot;Hello! You are visitor #&quot; + requestNumber;
    }
}
</code></pre>
<ul>
<li>Each request increments the counter <strong>safely</strong> across multiple threads.</li>
</ul>
<hr>
<p><strong>✅ Key Takeaway</strong></p>
<ul>
<li>Use <code>volatile</code> when you need <strong>visibility</strong> only (flags, shutdown signals).</li>
<li>Use <code>AtomicInteger</code>, <code>AtomicLong</code>, or <code>synchronized</code> when you also need <strong>atomicity</strong> (counters, financial transactions, etc.).</li>
</ul>
<hr>
<h1 id="microservice-questions">Microservice questions</h1>
<ul>
<li>What are microservices, and how do they differ from monolithic architecture?</li>
<li>What are the main advantages of using microservices?</li>
<li>What are the challenges of microservice architectures?</li>
<li>How do microservices communicate with each other?</li>
<li>What is service discovery, and why is it needed in microservices?</li>
<li>Can you explain API Gateway and its role in microservices?</li>
<li>How do you handle data consistency across multiple microservices?</li>
<li>What is the difference between synchronous and asynchronous communication in microservices?</li>
<li>How do you handle transactions in microservices?</li>
<li>What patterns are used to ensure reliability in microservices (e.g., Circuit Breaker)?</li>
<li>How do you monitor and log across distributed microservices?</li>
<li>What is the role of containerization (e.g., Docker) in microservices?</li>
<li>How do orchestration tools like Kubernetes help in microservices?</li>
<li>What is eventual consistency, and how does it apply to microservices?</li>
<li>How do you manage database per service vs. shared database in microservices?</li>
<li>What are some best practices for designing RESTful APIs for microservices?</li>
<li>How do you secure microservices communication?</li>
<li>What is distributed tracing, and why is it important?</li>
<li>Can you explain the concept of “bounded context” in microservices?</li>
<li>How do you test microservices (unit, integration, contract testing)?</li>
<li>What is the Saga pattern, and when would you use it?</li>
<li>How do you handle versioning of microservices APIs?</li>
<li>What is idempotency, and why is it important in microservices?</li>
<li>How do you deal with inter-service failures?</li>
<li>What design patterns are commonly used in microservices?</li>
<li>How do you handle configuration management in microservices?</li>
<li>What is the difference between orchestration and choreography in microservices?</li>
<li>How do you deploy and scale microservices?</li>
<li>What role does CI/CD play in microservices development?</li>
<li>What are some anti-patterns in microservices?</li>
</ul>
<hr>
<h3 id="1-what-are-microservices-and-how-do-they-differ-from-monolithic-architecture"><strong>1. What are microservices, and how do they differ from monolithic architecture?</strong></h3>
<ul>
<li><strong>Microservices</strong>: An architectural style where an application is built as a collection of small, independent services that communicate via APIs.</li>
<li><strong>Monolithic</strong>: A single, tightly coupled codebase where all functionality (UI, business logic, data access) is bundled together.</li>
<li><strong>Difference</strong>:</li>
</ul>
<ul>
<li>Microservices = modular, independently deployable, scalable.</li>
<li>Monolith = tightly coupled, hard to scale and maintain.</li>
</ul>
<hr>
<h3 id="2-what-are-the-main-advantages-of-using-microservices"><strong>2. What are the main advantages of using microservices?</strong></h3>
<ul>
<li><strong>Scalability</strong> – each service can be scaled independently.</li>
<li><strong>Flexibility in technology</strong> – different services can use different programming languages, databases, or frameworks.</li>
<li><strong>Faster development &amp; deployment</strong> – teams can work on services independently and deploy without affecting the whole system.</li>
<li><strong>Fault isolation</strong> – failure in one service doesn’t bring down the entire system.</li>
<li><strong>Better maintainability</strong> – smaller codebases are easier to understand and modify.</li>
<li><strong>Continuous delivery support</strong> – microservices fit naturally with CI/CD pipelines.</li>
</ul>
<hr>
<h3 id="3-what-are-the-challenges-of-microservice-architectures"><strong>3. What are the challenges of microservice architectures?</strong></h3>
<ul>
<li><strong>Complexity</strong> – more moving parts than a monolith; requires orchestration and governance.</li>
<li><strong>Data consistency</strong> – harder to maintain ACID transactions across services.</li>
<li><strong>Network latency &amp; failures</strong> – communication between services adds overhead and failure points.</li>
<li><strong>Monitoring &amp; debugging</strong> – tracing issues across distributed services is more difficult.</li>
<li><strong>Deployment &amp; configuration management</strong> – need automation tools (CI/CD, Kubernetes).</li>
<li><strong>Security</strong> – more endpoints → larger attack surface.</li>
<li><strong>Team coordination</strong> – requires strong DevOps and collaboration practices.</li>
</ul>
<hr>
<h3 id="4-how-do-microservices-communicate-with-each-other"><strong>4. How do microservices communicate with each other?</strong></h3>
<ul>
<li><strong>Synchronous communication</strong> – direct request/response, usually via HTTP (REST, gRPC).</li>
<li><strong>Asynchronous communication</strong> – using message brokers (Kafka, RabbitMQ, ActiveMQ) for event-driven communication.</li>
<li><strong>Service discovery</strong> – helps services locate each other dynamically.</li>
<li>Choice depends on use case: synchronous for real-time queries, asynchronous for decoupling and scalability.</li>
</ul>
<hr>
<h3 id="5-what-is-service-discovery-and-why-is-it-needed-in-microservices"><strong>5. What is service discovery, and why is it needed in microservices?</strong></h3>
<ul>
<li><strong>Service discovery</strong> is the process by which microservices automatically find the network locations of other services they need to communicate with.</li>
<li><strong>Why needed:</strong></li>
</ul>
<ul>
<li>In dynamic environments (like containers), services can move or scale, so hardcoding addresses is not feasible.</li>
<li>Ensures requests always reach the correct instance of a service.</li>
<li><strong>Methods:</strong></li>
</ul>
<ul>
<li><strong>Client-side discovery:</strong> service queries a registry to find other services.</li>
<li><strong>Server-side discovery:</strong> a load balancer or API gateway routes requests to available services.</li>
</ul>
<hr>
<h3 id="6-can-you-explain-api-gateway-and-its-role-in-microservices"><strong>6. Can you explain API Gateway and its role in microservices?</strong></h3>
<ul>
<li><strong>API Gateway</strong> is a server that acts as a single entry point for all client requests to microservices.</li>
<li><strong>Roles:</strong></li>
</ul>
<ul>
<li>Request routing to appropriate services</li>
<li>Authentication and authorization</li>
<li>Rate limiting and throttling</li>
<li>Aggregating responses from multiple services</li>
<li>Protocol translation (e.g., HTTP ↔ WebSocket)</li>
</ul>
<hr>
<h3 id="7-how-do-you-handle-data-consistency-across-multiple-microservices"><strong>7. How do you handle data consistency across multiple microservices?</strong></h3>
<ul>
<li><strong>Eventual consistency</strong> – updates propagate asynchronously, and systems eventually reach a consistent state.</li>
<li><strong>Saga pattern</strong> – breaking a transaction into a series of local transactions across services, with compensating actions on failure.</li>
<li><strong>Two-phase commit (less common)</strong> – a distributed transaction protocol to ensure ACID consistency, but it’s complex and less scalable.</li>
<li><strong>Design approach:</strong> prefer eventual consistency and idempotent operations.</li>
</ul>
<hr>
<h3 id="8-what-is-the-difference-between-synchronous-and-asynchronous-communication-in-microservices"><strong>8. What is the difference between synchronous and asynchronous communication in microservices?</strong></h3>
<ul>
<li><strong>Synchronous:</strong></li>
</ul>
<ul>
<li>Client waits for the service to respond before continuing.</li>
<li>Examples: HTTP REST calls, gRPC.</li>
<li>Pros: simple, real-time responses.</li>
<li>Cons: tighter coupling, higher risk of cascading failures.</li>
<li><strong>Asynchronous:</strong></li>
</ul>
<ul>
<li>Client sends a message/event and continues without waiting.</li>
<li>Examples: message queues (Kafka, RabbitMQ).</li>
<li>Pros: decoupled, resilient, better scalability.</li>
<li>Cons: more complex, eventual consistency required.</li>
</ul>
<hr>
<p>Alright 👍</p>
<h3 id="9-how-do-you-handle-transactions-in-microservices"><strong>9. How do you handle transactions in microservices?</strong></h3>
<ul>
<li><strong>Distributed transactions</strong> are tricky because each service has its own database.</li>
<li><strong>Approaches:</strong></li>
</ul>
<ul>
<li><strong>Saga pattern:</strong> split a transaction into a series of local transactions with compensating actions if one fails.</li>
<li><strong>Event-driven architecture:</strong> services react to events to update state asynchronously.</li>
<li>Avoid using traditional two-phase commit unless absolutely necessary due to complexity.</li>
</ul>
<hr>
<h3 id="10-what-patterns-are-used-to-ensure-reliability-in-microservices-eg-circuit-breaker"><strong>10. What patterns are used to ensure reliability in microservices (e.g., Circuit Breaker)?</strong></h3>
<ul>
<li><strong>Circuit Breaker:</strong> stops requests to a failing service to prevent cascading failures.</li>
<li><strong>Retry pattern:</strong> retries failed requests with backoff.</li>
<li><strong>Timeouts:</strong> prevent long-running calls from blocking resources.</li>
<li><strong>Bulkhead:</strong> isolates service components so failures in one don’t affect others.</li>
<li><strong>Fallbacks:</strong> provide default responses if a service fails.</li>
</ul>
<hr>
<h3 id="11-how-do-you-monitor-and-log-across-distributed-microservices"><strong>11. How do you monitor and log across distributed microservices?</strong></h3>
<ul>
<li><strong>Centralized logging:</strong> collect logs from all services in one place (e.g., ELK Stack, Splunk).</li>
<li><strong>Distributed tracing:</strong> track requests across services (e.g., Jaeger, Zipkin).</li>
<li><strong>Metrics monitoring:</strong> track service health, latency, and throughput (Prometheus, Grafana).</li>
<li><strong>Alerting:</strong> trigger alerts when failures or anomalies occur.</li>
</ul>
<p><img src="../images/Microservice/LogTraceMetrics.gif" alt="LogTraceMetrics"></p>
<hr>
<p>Alright 👍</p>
<h3 id="12-what-is-the-role-of-containerization-eg-docker-in-microservices"><strong>12. What is the role of containerization (e.g., Docker) in microservices?</strong></h3>
<ul>
<li>Packages a service with its dependencies into a portable container.</li>
<li>Ensures consistent environments across development, testing, and production.</li>
<li>Simplifies deployment, scaling, and isolation of services.</li>
<li>Works well with orchestration tools like Kubernetes for managing multiple microservices.</li>
</ul>
<hr>
<h3 id="13-how-do-orchestration-tools-like-kubernetes-help-in-microservices"><strong>13. How do orchestration tools like Kubernetes help in microservices?</strong></h3>
<ul>
<li>Automates deployment, scaling, and management of containerized microservices.</li>
<li>Provides service discovery, load balancing, and health checks.</li>
<li>Manages rolling updates, self-healing, and resource allocation.</li>
<li>Makes microservices more resilient and easier to operate at scale.</li>
</ul>
<hr>
<h3 id="14-what-is-eventual-consistency-and-how-does-it-apply-to-microservices"><strong>14. What is eventual consistency, and how does it apply to microservices?</strong></h3>
<ul>
<li><strong>Eventual consistency:</strong> data across distributed systems will become consistent over time, but may be temporarily inconsistent.</li>
<li><strong>Application in microservices:</strong></li>
</ul>
<ul>
<li>Each service manages its own data, so updates are propagated asynchronously.</li>
<li>Useful in high-scale systems where strong consistency (ACID) is hard to achieve.</li>
<li>Requires idempotent operations and careful design to avoid conflicts.</li>
</ul>
<hr>
<p>Alright 👍</p>
<h3 id="15-how-do-you-manage-database-per-service-vs-shared-database-in-microservices"><strong>15. How do you manage database per service vs. shared database in microservices?</strong></h3>
<ul>
<li><strong>Database per service (preferred):</strong></li>
<li>Each service owns its database and schema.</li>
<li>Promotes loose coupling and independence.</li>
<li>Requires patterns like event-driven updates or sagas for cross-service data consistency.</li>
<li><strong>Shared database (not recommended):</strong></li>
<li>Multiple services access the same database.</li>
<li>Easier to maintain initially but leads to tight coupling and scalability issues.</li>
</ul>
<hr>
<h3 id="16-what-are-some-best-practices-for-designing-restful-apis-for-microservices"><strong>16. What are some best practices for designing RESTful APIs for microservices?</strong></h3>
<ul>
<li>Use <strong>resource-based URLs</strong> (<code>/users</code>, <code>/orders</code>).</li>
<li>Use <strong>HTTP methods</strong> correctly (GET, POST, PUT, DELETE).</li>
<li>Include <strong>status codes</strong> for success and errors.</li>
<li>Support <strong>pagination, filtering, and sorting</strong> for collections.</li>
<li>Maintain <strong>versioning</strong> (<code>/v1/users</code>) for backward compatibility.</li>
<li>Keep APIs <strong>stateless</strong> and idempotent when possible.</li>
</ul>
<hr>
<h3 id="17-how-do-you-secure-microservices-communication"><strong>17. How do you secure microservices communication?</strong></h3>
<ul>
<li><strong>Authentication &amp; authorization:</strong> JWT tokens, OAuth2, API keys.</li>
<li><strong>Transport security:</strong> TLS/HTTPS for all communication.</li>
<li><strong>Network policies:</strong> firewalls, service mesh policies (Istio, Linkerd).</li>
<li><strong>Rate limiting &amp; throttling:</strong> prevent abuse and DoS attacks.</li>
<li><strong>Secret management:</strong> store credentials and keys securely (Vault, Kubernetes secrets).  </li>
</ul>
<hr>
<p>Alright 👍</p>
<h3 id="18-what-is-distributed-tracing-and-why-is-it-important"><strong>18. What is distributed tracing, and why is it important?</strong></h3>
<ul>
<li><strong>Distributed tracing</strong> tracks requests as they flow through multiple microservices.</li>
<li>Helps identify:</li>
</ul>
<ul>
<li>Latency bottlenecks</li>
<li>Service failures</li>
<li>Performance issues</li>
<li>Tools: <strong>Jaeger, Zipkin, OpenTelemetry</strong></li>
<li>Important because microservices are distributed and traditional logging alone doesn’t show the full request path.</li>
</ul>
<hr>
<p>Alright 👍</p>
<h3 id="19-can-you-explain-the-concept-of-bounded-context-in-microservices"><strong>19. Can you explain the concept of “bounded context” in microservices?</strong></h3>
<ul>
<li><strong>Bounded context</strong> comes from Domain-Driven Design (DDD).</li>
<li>It defines a <strong>clear boundary</strong> within which a service has a specific responsibility and domain model.</li>
<li>Ensures services do not overlap or share responsibilities unnecessarily, promoting loose coupling and clarity.</li>
</ul>
<hr>
<h3 id="20-how-do-you-test-microservices-unit-integration-contract-testing"><strong>20. How do you test microservices (unit, integration, contract testing)?</strong></h3>
<ul>
<li><strong>Unit testing:</strong> test individual service logic in isolation.</li>
<li><strong>Integration testing:</strong> test interaction between services or with databases.</li>
<li><strong>Contract testing:</strong> ensure communication between services adheres to agreed API contracts.</li>
<li><strong>End-to-end testing:</strong> optional, tests full workflow across services.</li>
</ul>
<hr>
<h3 id="21-what-is-the-saga-pattern-and-when-would-you-use-it"><strong>21. What is the Saga pattern, and when would you use it?</strong></h3>
<ul>
<li><strong>Saga pattern:</strong> manages distributed transactions across multiple services by breaking them into <strong>local transactions</strong> with <strong>compensating actions</strong> on failure.</li>
<li><strong>Use case:</strong> when multiple microservices need to update data consistently without locking distributed databases.</li>
</ul>
<hr>
<h3 id="22-how-do-you-handle-versioning-of-microservices-apis"><strong>22. How do you handle versioning of microservices APIs?</strong></h3>
<ul>
<li><strong>URL versioning:</strong> <code>/v1/users</code>, <code>/v2/users</code></li>
<li><strong>Header versioning:</strong> specify version in HTTP headers</li>
<li><strong>Query parameter versioning:</strong> <code>?version=1</code></li>
<li>Maintain backward compatibility to avoid breaking clients.</li>
</ul>
<hr>
<h3 id="23-what-is-idempotency-and-why-is-it-important-in-microservices"><strong>23. What is idempotency, and why is it important in microservices?</strong></h3>
<ul>
<li><strong>Idempotency:</strong> performing the same operation multiple times has the <strong>same effect as once</strong>.</li>
<li>Important for:</li>
</ul>
<ul>
<li>Retry mechanisms</li>
<li>Network failures</li>
<li>Preventing duplicate updates or orders</li>
</ul>
<h3 id="idempotency-in-rest-api-simple-clear">🔁 Idempotency in REST API (Simple &amp; Clear)</h3>
<p><strong>Idempotent</strong> means:</p>
<p>👉 <em>Calling the same API multiple times gives the <strong>same result</strong> as calling it once.</em></p>
<hr>
<h2 id="1-why-idempotency-is-needed">1️⃣ Why Idempotency is needed</h2>
<p>In real systems:</p>
<ul>
<li>Network timeouts</li>
<li>Client retries</li>
<li>Double-click / refresh</li>
<li>Mobile app re-sending requests</li>
</ul>
<p>Without idempotency → <strong>duplicate data / duplicate actions</strong> ❌</p>
<hr>
<h2 id="2-http-methods-idempotency">2️⃣ HTTP Methods &amp; Idempotency</h2>
<table>
<thead><tr>
<th>Method</th>
<th>Idempotent</th>
<th>Why</th>
</tr></thead><tbody>
<tr>
<td>GET</td>
<td>✅ Yes</td>
<td>Only reads data</td>
</tr>
<tr>
<td>PUT</td>
<td>✅ Yes</td>
<td>Replaces resource</td>
</tr>
<tr>
<td>DELETE</td>
<td>✅ Yes</td>
<td>Deleting again has no effect</td>
</tr>
<tr>
<td>POST</td>
<td>❌ No</td>
<td>Creates new resource each time</td>
</tr>
</tbody></table>
<hr>
<h2 id="3-real-life-example-problem">3️⃣ Real-Life Example (Problem)</h2>
<pre><code class="language-http">
POST /payments
{
  &quot;amount&quot;: 1000
}
</code></pre>
<p>Client retries → <strong>Payment happens twice</strong> 💸💸</p>
<hr>
<h2 id="4-solution-idempotency-key">4️⃣ Solution: Idempotency Key 🔑</h2>
<p>Client sends a <strong>unique key</strong> in header:</p>
<pre><code class="language-http">
POST /payments
Idempotency-Key: abc123

{
  &quot;amount&quot;: 1000
}
</code></pre>
<h3 id="server-logic">Server Logic:</h3>
<ul>
<li>If key is <strong>new</strong> → process request</li>
<li>If key <strong>already exists</strong> → return <strong>previous response</strong></li>
</ul>
<hr>
<h2 id="5-ascii-flow-diagram-complete">5️⃣ ASCII Flow Diagram (Complete)</h2>
<pre><code class="language-">
Client
  |
  | POST /payments
  | Idempotency-Key: abc123
  v
API Server
  |
  |-- Check Idempotency-Key
        |
        |-- Exists?
        |      |
        |      |-- YES --&gt; Return cached response (200 OK)
        |      |
        |      |-- NO
        |             |
        |             |-- Execute business logic
        |             |-- Store result with key (TTL 24h)
        |             |-- Return response (201 Created)
</code></pre>
<hr>
<h2 id="6-where-to-store-idempotency-keys">6️⃣ Where to Store Idempotency Keys</h2>
<table>
<thead><tr>
<th>Storage</th>
<th>Usage</th>
</tr></thead><tbody>
<tr>
<td>Redis</td>
<td>Best (fast, TTL support)</td>
</tr>
<tr>
<td>Database</td>
<td>Durable but slower</td>
</tr>
<tr>
<td>In-memory</td>
<td>Not safe for multiple instances</td>
</tr>
</tbody></table>
<hr>
<h2 id="7-idempotency-vs-request-id-vs-etag">7️⃣ Idempotency vs Request ID vs ETag</h2>
<table>
<thead><tr>
<th>Key Type</th>
<th>Purpose</th>
<th>Persistence</th>
<th>Generated By</th>
</tr></thead><tbody>
<tr>
<td><strong>Idempotency-Key</strong></td>
<td>Prevent duplicate operations</td>
<td>Short-lived (24h)</td>
<td>Client</td>
</tr>
<tr>
<td><strong>Request-ID</strong></td>
<td>Trace a request</td>
<td>Short-lived</td>
<td>Client/Server</td>
</tr>
<tr>
<td><strong>ETag</strong></td>
<td>Cache validation</td>
<td>Until resource changes</td>
<td>Server</td>
</tr>
</tbody></table>
<h3 id="why-etag-is-not-in-flow">Why ETag is not in flow?</h3>
<ul>
<li><strong>ETag = caching &amp; concurrency</strong></li>
<li><strong>Idempotency = safe retries</strong></li>
</ul>
<p>  ➡ Different problems, different solutions</p>
<hr>
<h2 id="8-when-to-use-idempotency">8️⃣ When to Use Idempotency ✅</h2>
<p>Use it for:</p>
<ul>
<li>Payments</li>
<li>Orders</li>
<li>Bookings</li>
<li>Wallet transactions</li>
<li>Email/SMS triggers</li>
</ul>
<p>❌ Not needed for:</p>
<ul>
<li>GET APIs</li>
<li>Read-only operations</li>
</ul>
<hr>
<h2 id="9-spring-boot-simple-example">9️⃣ Spring Boot – Simple Example</h2>
<pre><code class="language-java">
@PostMapping(&quot;/payments&quot;)
public ResponseEntity&lt;?&gt; pay(
        @RequestHeader(&quot;Idempotency-Key&quot;) String key) {

    if (redis.exists(key)) {
        return redis.get(key); // return cached response
    }

    ResponseEntity&lt;?&gt; response = processPayment();
    redis.save(key, response, 24, TimeUnit.HOURS);

    return response;
}
</code></pre>
<hr>
<h2 id="key-takeaway">🔑 Key Takeaway</h2>
<blockquote><strong>Idempotency ensures safety in distributed systems by making retries harmless.</strong></blockquote>
<hr>
<h3 id="24-how-do-you-deal-with-inter-service-failures"><strong>24. How do you deal with inter-service failures?</strong></h3>
<ul>
<li>Use <strong>circuit breakers</strong> to stop calls to failing services temporarily.</li>
<li>Implement <strong>retries with exponential backoff</strong>.</li>
<li>Provide <strong>fallback responses</strong> when a service is down.</li>
<li>Use <strong>timeouts</strong> to prevent long waits.</li>
<li>Monitor and alert on failures for rapid resolution.</li>
</ul>
<hr>
<h3 id="25-what-design-patterns-are-commonly-used-in-microservices"><strong>25. What design patterns are commonly used in microservices?</strong></h3>
<ul>
<li><strong>Circuit Breaker</strong> – prevent cascading failures.</li>
<li><strong>Saga</strong> – manage distributed transactions.</li>
<li><strong>API Gateway</strong> – single entry point for clients.</li>
<li><strong>Event Sourcing</strong> – capture state changes as events.</li>
<li><strong>CQRS (Command Query Responsibility Segregation)</strong> – separate read/write models.</li>
<li><strong>Bulkhead</strong> – isolate services to contain failures.</li>
</ul>
<hr>
<h3 id="26-how-do-you-handle-configuration-management-in-microservices"><strong>26. How do you handle configuration management in microservices?</strong></h3>
<ul>
<li>Use <strong>centralized configuration services</strong> (e.g., Spring Cloud Config, Consul).</li>
<li>Store environment-specific configs outside the codebase.</li>
<li>Support <strong>dynamic updates</strong> without redeploying services.</li>
<li>Keep secrets encrypted and secure.</li>
</ul>
<hr>
<h3 id="27-what-is-the-difference-between-orchestration-and-choreography-in-microservices"><strong>27. What is the difference between orchestration and choreography in microservices?</strong></h3>
<ul>
<li><strong>Orchestration:</strong> a central service controls the flow between microservices.</li>
<li><strong>Choreography:</strong> services react to events independently, no central controller.</li>
<li><strong>Trade-off:</strong> orchestration = easier to manage complex workflows; choreography = more decoupled and scalable.</li>
</ul>
<hr>
<h3 id="28-how-do-you-deploy-and-scale-microservices"><strong>28. How do you deploy and scale microservices?</strong></h3>
<ul>
<li><strong>Deployment:</strong> use containerization (Docker) and orchestration platforms (Kubernetes, ECS).</li>
<li><strong>Scaling:</strong></li>
</ul>
<ul>
<li><strong>Horizontal scaling:</strong> add more instances of a service.</li>
<li><strong>Vertical scaling:</strong> increase resources (CPU/memory) for a service.</li>
<li>Use <strong>auto-scaling policies</strong> and <strong>load balancers</strong> to handle traffic dynamically.</li>
</ul>
<hr>
<h3 id="29-what-role-does-cicd-play-in-microservices-development"><strong>29. What role does CI/CD play in microservices development?</strong></h3>
<ul>
<li>Automates building, testing, and deploying individual services.</li>
<li>Ensures <strong>faster and more reliable releases</strong>.</li>
<li>Supports <strong>independent deployment</strong> of microservices without affecting others.</li>
<li>Enables <strong>rollback</strong>, monitoring, and zero-downtime deployments.</li>
</ul>
<hr>
<h3 id="30-what-are-some-anti-patterns-in-microservices"><strong>30. What are some anti-patterns in microservices?</strong></h3>
<ul>
<li><strong>Shared database</strong> across services → tight coupling.</li>
<li><strong>God service / huge service</strong> → monolith disguised as microservice.</li>
<li><strong>Chatty communication</strong> → too many synchronous calls between services.</li>
<li><strong>Ignoring monitoring/logging</strong> → difficult to debug distributed issues.</li>
<li><strong>No versioning of APIs</strong> → breaking clients on updates.</li>
</ul>
<hr>
<h2 id="16-how-would-you-design-inter-service-communication-to-be-fault-tolerant"><strong>16️⃣ How would you design inter-service communication to be fault-tolerant?</strong></h2>
<h3 id="problem">💡 Problem</h3>
<p>In microservices, network calls <strong>fail</strong> — due to latency, timeouts, or partial outages.</p>
<p>We need to design communication that <em>fails gracefully</em> and <em>recovers automatically.</em></p>
<hr>
<h3 id="fault-tolerance-techniques">🧩 Fault-tolerance Techniques</h3>
<table>
<thead><tr>
<th>Technique</th>
<th>Description</th>
<th>Example</th>
</tr></thead><tbody>
<tr>
<td><strong>Retries with backoff</strong></td>
<td>Retry transient failures with exponential delays</td>
<td>Spring Cloud Retry, Resilience4j <code>Retry</code></td>
</tr>
<tr>
<td><strong>Circuit Breaker</strong></td>
<td>Stop calling a failing service temporarily to avoid cascading failures</td>
<td>Resilience4j <code>CircuitBreaker</code></td>
</tr>
<tr>
<td><strong>Bulkhead isolation</strong></td>
<td>Limit concurrent calls per dependency to prevent total thread exhaustion</td>
<td>Thread-pool or semaphore isolation</td>
</tr>
<tr>
<td><strong>Timeouts</strong></td>
<td>Don’t wait indefinitely — fail fast</td>
<td><code>WebClient.timeout(Duration.ofSeconds(2))</code></td>
</tr>
<tr>
<td><strong>Fallbacks / graceful degradation</strong></td>
<td>Return cached or default responses when downstream unavailable</td>
<td><code>fallbackMethod()</code> in Resilience4j</td>
</tr>
<tr>
<td><strong>Rate limiting</strong></td>
<td>Protect services from overload</td>
<td>Bucket4j / API Gateway limits</td>
</tr>
<tr>
<td><strong>Async / event-driven</strong></td>
<td>Use messaging (Kafka, RabbitMQ) to decouple services</td>
<td>Non-blocking, retryable events</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-resilience4j">✅ Example (Resilience4j)</h3>
<pre><code class="language-java">
@CircuitBreaker(name = &quot;inventoryService&quot;, fallbackMethod = &quot;fallback&quot;)
@Retry(name = &quot;inventoryRetry&quot;)
public Product getProduct(String id) {
    return webClient.get()
        .uri(&quot;http://inventory-service/products/&quot; + id)
        .retrieve()
        .bodyToMono(Product.class)
        .block();
}

public Product fallback(String id, Throwable t) {
    return new Product(id, &quot;Unknown&quot;, 0);
}
</code></pre>
<h3 id="tip">🧠 Tip</h3>
<p>Combine <strong>Resilience4j + Spring Cloud CircuitBreaker + Service Discovery (Eureka/Consul)</strong> for full fault-tolerant communication.</p>
<hr>
<h2 id="17-whats-the-difference-between-api-gateway-vs-load-balancer"><strong>17️⃣ What’s the difference between API Gateway vs Load Balancer?</strong></h2>
<table>
<thead><tr>
<th>Feature</th>
<th><strong>API Gateway</strong></th>
<th><strong>Load Balancer</strong></th>
</tr></thead><tbody>
<tr>
<td><strong>Purpose</strong></td>
<td>Single entry point for client → handles routing, authentication, rate limiting, etc.</td>
<td>Distributes traffic among multiple instances of the <em>same</em> service</td>
</tr>
<tr>
<td><strong>Layer</strong></td>
<td>Application layer (L7)</td>
<td>Transport/network layer (L4 / L7)</td>
</tr>
<tr>
<td><strong>Routing logic</strong></td>
<td>Can route by path, header, or user</td>
<td>Purely round-robin / least-connections</td>
</tr>
<tr>
<td><strong>Responsibilities</strong></td>
<td>Auth, throttling, caching, metrics, protocol translation (REST↔gRPC)</td>
<td>Traffic distribution only</td>
</tr>
<tr>
<td><strong>Examples</strong></td>
<td>Spring Cloud Gateway, Kong, NGINX Ingress, Zuul</td>
<td>AWS ALB/ELB, NGINX, HAProxy</td>
</tr>
<tr>
<td><strong>Scope</strong></td>
<td>Cross-service</td>
<td>Single-service instance group</td>
</tr>
</tbody></table>
<p><strong>👉 Rule of thumb:</strong></p>
<ul>
<li>Use a <strong>Load Balancer</strong> <em>inside</em> a cluster to distribute load among replicas.</li>
<li>Use an <strong>API Gateway</strong> <em>outside</em> as the single client entry point and policy enforcement layer.</li>
</ul>
<hr>
<h2 id="18-how-do-you-implement-distributed-tracing-in-microservices"><strong>18️⃣ How do you implement distributed tracing in microservices?</strong></h2>
<h3 id="goal">💡 Goal</h3>
<p>Trace a request across multiple services → understand latency, bottlenecks, and failures.</p>
<hr>
<h3 id="how-it-works">⚙️ How It Works</h3>
<ul>
<li>Each request carries a <strong>trace ID</strong> and <strong>span ID</strong> via HTTP headers.</li>
<li>Every service logs and propagates these IDs downstream.</li>
<li>A tracing backend (e.g., Zipkin, Jaeger, Tempo) aggregates spans into a timeline.</li>
</ul>
<hr>
<h3 id="implementation-steps">🔧 Implementation Steps</h3>
<ul>
<li><strong>Add tracing dependencies</strong></li>
</ul>
<pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;io.micrometer&lt;/groupId&gt;
    &lt;artifactId&gt;micrometer-tracing-bridge-brave&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.zipkin.reporter2&lt;/groupId&gt;
    &lt;artifactId&gt;zipkin-reporter-brave&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre>
<ul>
<li><strong>Spring Boot integration</strong></li>
</ul>
<ul>
<li>Spring Boot 3.x + Micrometer Tracing (replaces Sleuth)</li>
<li>Automatically instruments <code>WebClient</code>, <code>RestTemplate</code>, and Feign.</li>
</ul>
<ul>
<li><strong>Trace context propagation</strong></li>
</ul>
<ul>
<li>Headers: <code>traceparent</code>, <code>b3</code>, or <code>x-b3-traceid</code>.</li>
<li>Example (manual):</li>
</ul>
<pre><code class="language-java">
webClient.get()
  .header(&quot;traceparent&quot;, traceContext.traceId())
  .retrieve();
</code></pre>
<ul>
<li><strong>Visualization</strong></li>
</ul>
<ul>
<li>Run <strong>Zipkin</strong> or <strong>Jaeger</strong> server.</li>
<li>View end-to-end request latency timeline.</li>
</ul>
<hr>
<h3 id="benefits">🧠 Benefits</h3>
<ul>
<li>Detect slow downstream services.</li>
<li>Trace asynchronous and message-based calls.</li>
<li>Enable correlation with logs (via <code>traceId</code> in log pattern).</li>
</ul>
<hr>
<h2 id="19-explain-the-saga-pattern-in-distributed-transactions"><strong>19️⃣ Explain the Saga pattern in distributed transactions</strong></h2>
<h3 id="problem">💡 Problem</h3>
<p>In microservices, a transaction may span multiple services, but <strong>2-Phase Commit (XA)</strong> is too slow and complex.</p>
<h3 id="saga-pattern">✅ <strong>Saga Pattern</strong></h3>
<p>Break a distributed transaction into a <strong>series of local transactions</strong>, coordinated via events or a saga orchestrator.</p>
<hr>
<h3 id="types">🔹 Types</h3>
<table>
<thead><tr>
<th>Type</th>
<th>Coordination</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Choreography</strong></td>
<td>Event-based (no central coordinator)</td>
<td>Each service listens to previous event and emits the next</td>
</tr>
<tr>
<td><strong>Orchestration</strong></td>
<td>Central Saga Orchestrator</td>
<td>A controller directs each step and compensations</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-order-payment-inventory">🧩 Example (Order → Payment → Inventory)</h3>
<p><strong>Choreography Flow:</strong></p>
<pre><code class="language-">
OrderService → publish(OrderCreated)
PaymentService → on(OrderCreated) → processPayment → publish(PaymentDone)
InventoryService → on(PaymentDone) → reserveStock → publish(InventoryReserved)
</code></pre>
<p><strong>If failure occurs</strong>, emit compensating events:</p>
<ul>
<li>Payment failed → <code>OrderCancelled</code></li>
<li>Inventory failed → <code>PaymentRefunded</code>, <code>OrderCancelled</code></li>
</ul>
<hr>
<h3 id="key-points">🧠 Key Points</h3>
<ul>
<li>Each step has a <strong>compensating action</strong> (undo logic).</li>
<li>Event bus or message broker (Kafka/RabbitMQ) ensures <strong>eventual consistency</strong>.</li>
<li>Avoid long-lived distributed locks.</li>
</ul>
<hr>
<h2 id="20-how-would-you-secure-internal-service-to-service-communication"><strong>20️⃣ How would you secure internal service-to-service communication?</strong></h2>
<h3 id="layers-of-security">🧩 Layers of Security</h3>
<table>
<thead><tr>
<th>Layer</th>
<th>Mechanism</th>
<th>Description</th>
</tr></thead><tbody>
<tr>
<td><strong>Transport (Network)</strong></td>
<td><strong>mTLS (Mutual TLS)</strong></td>
<td>Both client &amp; server authenticate via certificates</td>
</tr>
<tr>
<td><strong>Application (Identity)</strong></td>
<td><strong>OAuth2 / JWT tokens</strong></td>
<td>Each service validates identity of caller</td>
</tr>
<tr>
<td><strong>Network isolation</strong></td>
<td>Private VPC / Service mesh</td>
<td>Restrict external access</td>
</tr>
<tr>
<td><strong>API Gateway enforcement</strong></td>
<td>Token validation &amp; rate limiting</td>
<td>Central security policies</td>
</tr>
<tr>
<td><strong>Secrets management</strong></td>
<td>Vault / AWS Secrets Manager</td>
<td>Rotate API keys, DB creds securely</td>
</tr>
</tbody></table>
<hr>
<h3 id="example-mtls">🔐 Example (mTLS)</h3>
<ul>
<li>Generate certs for each service.</li>
<li>Configure both ends to trust the same CA:</li>
</ul>
<pre><code class="language-yaml">
server:
  ssl:
    key-store: classpath:server-keystore.jks
    trust-store: classpath:truststore.jks
</code></pre>
<h3 id="example-jwt-propagation">🔐 Example (JWT propagation)</h3>
<ul>
<li>Service A authenticates via API Gateway → gets a JWT.</li>
<li>Pass the JWT to downstream services via <code>Authorization: Bearer ...</code>.</li>
<li>Each internal service validates the token (signature + claims).</li>
</ul>
<p><img src="../images/API/JWT.gif" alt="jwt"></p>
<h2 id="what-is-jwt-and-how-does-it-work">What is JWT and how does it work?</h2>
<p>JWT (JSON Web Token) is a compact, URL-safe token used to securely transmit information between a client and a server.</p>
<p>It is most commonly used for authentication in modern web apps.</p>
<p>A JWT has three parts separated by dots:</p>
<p><code>xxxxx.yyyyy.zzzzz</code></p>
<hr>
<h3 id="1-header">1. Header</h3>
<p>Contains:</p>
<ul>
<li>The signing algorithm (e.g., <code>HS256</code>, <code>RS256</code>)</li>
<li>The token type (<code>JWT</code>)</li>
</ul>
<hr>
<h3 id="2-payload">2. Payload</h3>
<p>Contains the <strong>claims</strong> — statements about an entity (typically, the user) and additional data.</p>
<hr>
<h3 id="3-signature">3. Signature</h3>
<p>Ensures the token hasn’t been tampered with.  </p>
<p>It’s created by signing the encoded header + payload using:</p>
<ul>
<li>A secret (HMAC), or</li>
<li>A private key (RSA/ECDSA)</li>
</ul>
<hr>
<h2 id="how-jwt-authentication-works">How JWT Authentication Works</h2>
<ul>
<li>The user logs in with credentials.</li>
<li>The server validates credentials and generates a signed JWT.</li>
<li>The server sends the JWT back to the client.</li>
<li>The client stores the JWT (usually in an HttpOnly cookie or secure storage).</li>
<li>On future requests, the client sends the JWT (typically via the header):</li>
</ul>
<p><code>Authorization: Bearer &lt;token&gt;</code></p>
<hr>
<h3 id="key-benefits">Key Benefits</h3>
<ul>
<li><strong>Stateless</strong>: No server-side session storage required, which makes scaling easier.</li>
<li><strong>Tamper-resistant</strong>: A valid signature proves the token content wasn’t modified.</li>
<li><strong>Lightweight</strong>: Small and efficient to transmit on every request.</li>
</ul>
<hr>
<h3 id="jwt-security-best-practices">JWT Security Best Practices</h3>
<ul>
<li>Always use HTTPS</li>
<li>Keep access tokens short-lived (ideally 5–10 minutes)</li>
<li>Use refresh tokens for long sessions</li>
<li>Prefer HttpOnly cookies over <code>localStorage</code> to reduce XSS risk</li>
<li>Rotate signing keys and plan for revocation (especially for refresh tokens)</li>
</ul>
<hr>
<h3 id="advanced-service-mesh">🧠 Advanced: Service Mesh</h3>
<p>Tools like <strong>Istio</strong>, <strong>Linkerd</strong>, or <strong>Consul Connect</strong> automate:</p>
<ul>
<li>mTLS between services.</li>
<li>Policy enforcement.</li>
<li>Observability + retries.</li>
</ul>
<hr>
<h3 id="summary-table">✅ <strong>Summary Table</strong></h3>
<table>
<thead><tr>
<th>#</th>
<th>Topic</th>
<th>Key Takeaway</th>
</tr></thead><tbody>
<tr>
<td>16</td>
<td>Fault-tolerant comms</td>
<td>Use retry, circuit-breaker, timeouts, async messaging</td>
</tr>
<tr>
<td>17</td>
<td>API Gateway vs LB</td>
<td>Gateway = smart entry point; LB = traffic distributor</td>
</tr>
<tr>
<td>18</td>
<td>Distributed tracing</td>
<td>Trace &amp; span IDs + Zipkin/Jaeger/Micrometer Tracing</td>
</tr>
<tr>
<td>19</td>
<td>Saga pattern</td>
<td>Event-driven or orchestrated compensation instead of XA</td>
</tr>
<tr>
<td>20</td>
<td>Service-to-service security</td>
<td>mTLS + JWT + network isolation + Vault + service mesh</td>
</tr>
</tbody></table>
<hr>
<p>Absolutely! Here’s a <strong>concise, interview-friendly version</strong> of your microservices &amp; design questions:</p>
<hr>
<h2 id="11-data-consistency-without-distributed-transactions"><strong>11️⃣ Data Consistency Without Distributed Transactions</strong></h2>
<ul>
<li>Use <strong>event-driven architecture</strong> instead of 2PC/XA.</li>
<li>Techniques:</li>
</ul>
<ul>
<li><strong>Eventual consistency</strong> via <strong>async events</strong> (Kafka, RabbitMQ).</li>
<li><strong>Outbox pattern</strong>: write DB + event in the same transaction, then publish.</li>
<li>Avoid blocking distributed transactions; embrace <strong>eventual consistency</strong>.</li>
</ul>
<hr>
<h2 id="12-saga-pattern-example"><strong>12️⃣ Saga Pattern Example</strong></h2>
<ul>
<li><strong>Definition:</strong> Break a distributed transaction into <strong>local transactions</strong> with <strong>compensating actions</strong>.</li>
<li><strong>Example:</strong> Order → Payment → Inventory</li>
</ul>
<ul>
<li><strong>Choreography style:</strong></li>
</ul>
<ul>
<li>Order created → publish <code>OrderCreated</code></li>
<li>Payment service → process payment → publish <code>PaymentDone</code></li>
<li>Inventory → reserve stock → publish <code>InventoryReserved</code></li>
<li>If payment fails → publish <code>OrderCancelled</code> → rollback previous steps.</li>
</ul>
<hr>
<h2 id="13-securing-microservices"><strong>13️⃣ Securing Microservices</strong></h2>
<ul>
<li><strong>Transport Layer:</strong> <strong>mTLS</strong> for encrypted, authenticated communication.</li>
<li><strong>Identity:</strong> <strong>JWT / OAuth2</strong> for service-to-service authentication.</li>
<li><strong>Gateway:</strong> API Gateway enforces authentication, rate-limiting, and central policies.</li>
<li><strong>Secrets:</strong> Use <strong>Vault / AWS Secrets Manager</strong> for API keys and credentials.</li>
</ul>
<hr>
<h2 id="14-kafka-consumer-slower-than-producer"><strong>14️⃣ Kafka Consumer Slower Than Producer</strong></h2>
<ul>
<li>Problem: <strong>backpressure / growing consumer lag</strong>.</li>
<li>Solutions:</li>
</ul>
<ul>
<li>Increase <strong>consumer parallelism / partitions</strong>.</li>
<li><strong>Batch processing</strong> and <strong>asynchronous processing</strong>.</li>
<li>Use <strong>flow control</strong> or <strong>pause/resume</strong> consumption.</li>
<li>Monitor lag and set alerting; consider <strong>dead-letter queue</strong>.</li>
</ul>
<hr>
<h2 id="15-preventing-cascade-failure"><strong>15️⃣ Preventing Cascade Failure</strong></h2>
<ul>
<li>Techniques to prevent cascading service failures:</li>
</ul>
<ul>
<li><strong>Circuit breaker</strong> (Resilience4j, Hystrix) → stop calling a failing service.</li>
<li><strong>Timeouts</strong> → fail fast.</li>
<li><strong>Fallbacks / default responses</strong> → graceful degradation.</li>
<li><strong>Bulkheads</strong> → isolate resources per service.</li>
<li><strong>Goal:</strong> One failing service doesn’t crash the entire system.</li>
</ul>
<hr>
<h2 id="15-key-api-design-rules-best-practices"><strong>15 Key API Design Rules / Best Practices</strong></h2>
<ul>
<li><strong>Use Nouns, Not Verbs</strong></li>
</ul>
<ul>
<li><code>/users</code> instead of <code>/getUsers</code></li>
</ul>
<ul>
<li><strong>Use Proper HTTP Methods</strong></li>
</ul>
<ul>
<li>GET, POST, PUT, PATCH, DELETE</li>
</ul>
<ul>
<li><strong>Use Consistent Naming Conventions</strong></li>
</ul>
<ul>
<li>Plural nouns, camelCase or snake_case consistently</li>
</ul>
<ul>
<li><strong>Version Your API</strong></li>
</ul>
<ul>
<li><code>/api/v1/users</code></li>
</ul>
<ul>
<li><strong>Statelessness</strong></li>
</ul>
<ul>
<li>Each request contains all needed info</li>
</ul>
<ul>
<li><strong>Use Standard HTTP Status Codes</strong></li>
</ul>
<ul>
<li>200, 201, 204, 400, 401, 403, 404, 500</li>
</ul>
<ul>
<li><strong>Consistent Request/Response Format</strong></li>
</ul>
<ul>
<li>JSON is standard; include <code>code</code>, <code>message</code> for errors</li>
</ul>
<ul>
<li><strong>Pagination, Filtering, Sorting</strong></li>
</ul>
<ul>
<li><code>/users?limit=20&amp;offset=0&amp;sort=createdAt,desc</code></li>
</ul>
<ul>
<li><strong>Input Validation &amp; Error Handling</strong></li>
</ul>
<ul>
<li>Prevent invalid data; provide meaningful error messages</li>
</ul>
<ul>
<li><strong>Security Best Practices</strong></li>
</ul>
<ul>
<li>HTTPS, JWT/OAuth2, RBAC, rate limiting</li>
</ul>
<ul>
<li><strong>Idempotency for PUT/DELETE</strong></li>
</ul>
<ul>
<li>Repeated calls produce same result</li>
</ul>
<ul>
<li><strong>Backward Compatibility</strong></li>
</ul>
<ul>
<li>Avoid breaking changes; add new fields instead of changing existing ones</li>
</ul>
<ul>
<li><strong>Document APIs</strong></li>
</ul>
<ul>
<li>Swagger / OpenAPI; keep docs up-to-date</li>
</ul>
<ul>
<li><strong>Logging &amp; Monitoring</strong></li>
</ul>
<ul>
<li>Track request IDs, errors, response times</li>
</ul>
<ul>
<li><strong>Optional: HATEOAS / Hypermedia Links</strong></li>
</ul>
<ul>
<li>Include links to related resources for discoverability</li>
</ul>
<hr>
<h3 id="quick-tip">✅ Quick Tip</h3>
<blockquote>“Think like a client”: easy-to-use, predictable, secure, versioned, and properly documented APIs are always preferred.</blockquote>
<hr>`;

if (document.getElementById('content')) {
    document.getElementById('content').innerHTML = microserviceContentData;
}
