// Architect - Table of Contents Data
const architectTocData = `<a href="#system-architecture-ascii-diagram-with-zipkin-opentelemetry" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="system-architecture-ascii-diagram-with-zipkin-opentelemetry">System architecture — ASCII diagram (with Zipkin / OpenTelemetry)</a>
<a href="#whats-added-that-was-missing" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="whats-added-that-was-missing">🔑 What’s Added That Was Missing:</a>
<a href="#numbered-flow-explanation-detailed" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="numbered-flow-explanation-detailed">Numbered flow explanation (detailed)</a>
<a href="#observability-zipkin-vs-opentelemetry-how-they-fit" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="observability-zipkin-vs-opentelemetry-how-they-fit">Observability: Zipkin vs OpenTelemetry (how they fit)</a>
<a href="#quick-mapping-to-your-earlier-question-list" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="quick-mapping-to-your-earlier-question-list">Quick mapping to your earlier question list</a>
<a href="#flow-explanation" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="flow-explanation">🔑 Flow Explanation</a>
<a href="#notes" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="notes">🔑 Notes:</a>
<a href="#10-key-components-of-microservices-architecture" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="10-key-components-of-microservices-architecture">10 Key Components of Microservices Architecture</a>
<a href="#1-client" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="1-client">1. Client</a>
<a href="#2-cdn-content-delivery-network" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="2-cdn-content-delivery-network">2. CDN (Content Delivery Network)</a>
<a href="#3-load-balancer" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="3-load-balancer">3. Load Balancer</a>
<a href="#4-api-gateway" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="4-api-gateway">4. API Gateway</a>
<a href="#5-microservices" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="5-microservices">5. Microservices</a>
<a href="#6-message-broker" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="6-message-broker">6. Message Broker</a>
<a href="#7-databases" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="7-databases">7. Databases</a>
<a href="#8-identity-provider" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="8-identity-provider">8. Identity Provider</a>
<a href="#9-service-registry-and-discovery" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="9-service-registry-and-discovery">9. Service Registry and Discovery</a>
<a href="#10-service-coordination-eg-zookeeper" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="10-service-coordination-eg-zookeeper">10. Service Coordination (e.g., Zookeeper)</a>
<a href="#multi-cloud-cheat-sheet-aws-azure-google-cloud" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="multi-cloud-cheat-sheet-aws-azure-google-cloud">☁️ Multi-Cloud Cheat Sheet — AWS | Azure | Google Cloud</a>
<a href="#high-level-summary" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="high-level-summary">🧩 High-Level Summary</a>
<a href="#compute" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="compute">☁️ Compute</a>
<a href="#storage" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="storage">📦 Storage</a>
<a href="#databases" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="databases">🛠 Databases</a>
<a href="#relational-databases" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="relational-databases">Relational Databases</a>
<a href="#nosql-databases" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="nosql-databases">NoSQL Databases</a>
<a href="#data-warehousing" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="data-warehousing">Data Warehousing</a>
<a href="#networking" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="networking">🌐 Networking</a>
<a href="#security" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="security">🔐 Security</a>
<a href="#devops-cicd" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="devops-cicd">🔄 DevOps &amp; CI/CD</a>
<a href="#ai-ml" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="ai-ml">🤖 AI / ML</a>
<a href="#multi-cloud-design-tip" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="multi-cloud-design-tip">💡 Multi-Cloud Design Tip</a>
<a href="#final-takeaway" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="final-takeaway">🏁 Final Takeaway</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = architectTocData;
}
