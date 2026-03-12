// Gcp - Table of Contents Data
const gcpTocData = `<a href="#gcp-commands" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="gcp-commands">GCP Commands</a>
<a href="#to-run-cloud-postgresql" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="to-run-cloud-postgresql">To run Cloud PostgreSQL</a>
<a href="#to-get-ssl-certificates-for-cloud-sql" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="to-get-ssl-certificates-for-cloud-sql">To get SSL certificates for Cloud SQL</a>
<a href="#local-development" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="local-development">Local Development</a>
<a href="#push-docker-image-from-local" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="push-docker-image-from-local">Push Docker Image from Local</a>
<a href="#gcp-compute-services-comparison" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="gcp-compute-services-comparison">🚀 GCP Compute Services Comparison</a>
<a href="#use-case-recommendations" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="use-case-recommendations">🔍 Use Case Recommendations</a>
<a href="#visual-summary" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="visual-summary">🎯 Visual Summary</a>
<a href="#why-pubsub-instead-of-kafka-or-grpc-in-cloud-run-cloud-functions" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="why-pubsub-instead-of-kafka-or-grpc-in-cloud-run-cloud-functions">⚖️ Why <strong>Pub/Sub</strong> instead of <strong>Kafka</strong> or <strong>gRPC</strong> in Cloud Run / Cloud Functions?</a>
<a href="#1-cloud-functions-cloud-run-are-serverless-event-driven" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-cloud-functions-cloud-run-are-serverless-event-driven">1. <strong>Cloud Functions / Cloud Run are serverless &amp; event-driven</strong></a>
<a href="#2-grpc-is-synchronous-but-functions-are-async" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-grpc-is-synchronous-but-functions-are-async">2. <strong>gRPC is synchronous, but Functions are async</strong></a>
<a href="#3-pubsub-fits-the-fire-and-forget-event-model" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="3-pubsub-fits-the-fire-and-forget-event-model">3. <strong>Pub/Sub fits the “fire-and-forget” event model</strong></a>
<a href="#4-simplicity-and-ecosystem-integration" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="4-simplicity-and-ecosystem-integration">4. <strong>Simplicity and ecosystem integration</strong></a>
<a href="#when-to-choose-what-rule-of-thumb" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="when-to-choose-what-rule-of-thumb">✅ When to choose what (Rule of Thumb)</a>
<a href="#1-cloud-functions" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-cloud-functions"><strong>1. Cloud Functions</strong></a>
<a href="#2-cloud-run" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-cloud-run"><strong>2. Cloud Run</strong></a>
<a href="#decision-guide" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="decision-guide"><strong>Decision Guide</strong></a>
<a href="#1-google-compute-engine-gce-virtual-machines-iaas" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="1-google-compute-engine-gce-virtual-machines-iaas">🧩 <strong>1. Google Compute Engine (GCE)</strong> — <em>Virtual Machines (IaaS)</em></a>
<a href="#you-can-run" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="you-can-run">✅ You can run:</a>
<a href="#2-app-engine-gae-platform-as-a-service-paas" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="2-app-engine-gae-platform-as-a-service-paas">🚀 <strong>2. App Engine (GAE)</strong> — <em>Platform-as-a-Service (PaaS)</em></a>
<a href="#you-can-run" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="you-can-run">✅ You can run:</a>
<a href="#not-suitable-for" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="not-suitable-for">❌ Not suitable for:</a>
<a href="#3-cloud-run-serverless-containers-caas" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="3-cloud-run-serverless-containers-caas">🐳 <strong>3. Cloud Run</strong> — <em>Serverless Containers (CaaS)</em></a>
<a href="#you-can-run" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="you-can-run">✅ You can run:</a>
<a href="#not-suitable-for" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="not-suitable-for">❌ Not suitable for:</a>
<a href="#4-google-kubernetes-engine-gke-managed-kubernetes" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="4-google-kubernetes-engine-gke-managed-kubernetes">☸️ <strong>4. Google Kubernetes Engine (GKE)</strong> — <em>Managed Kubernetes</em></a>
<a href="#you-can-run" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="you-can-run">✅ You can run:</a>
<a href="#not-ideal-for" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="not-ideal-for">❌ Not ideal for:</a>
<a href="#5-cloud-functions-serverless-functions-faas" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="5-cloud-functions-serverless-functions-faas">⚙️ <strong>5. Cloud Functions</strong> — <em>Serverless Functions (FaaS)</em></a>
<a href="#you-can-run" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="you-can-run">✅ You can run:</a>
<a href="#not-suitable-for" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="not-suitable-for">❌ Not suitable for:</a>
<a href="#summary-table" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="summary-table">🧱 <strong>Summary Table</strong></a>
<a href="#example-use-case-mapping" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="example-use-case-mapping">⚡ Example Use Case Mapping</a>
<a href="#stack-trace" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="stack-trace">Stack Trace</a>
<a href="#opentelemetry" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="opentelemetry">OpenTelemetry</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = gcpTocData;
}
