// Cicd - Table of Contents Data
const cicdTocData = `<a href="#jenkins-alternatives-for-cicd" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="jenkins-alternatives-for-cicd">Jenkins Alternatives for CI/CD</a>
<a href="#production-grade-devops-cicd-architecture" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="production-grade-devops-cicd-architecture">🚀 Production-Grade DevOps CI/CD Architecture</a>
<a href="#high-level-overview" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="high-level-overview">🧩 High-Level Overview</a>
<a href="#cicd-workflow-jenkins" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="cicd-workflow-jenkins">🔁 CI/CD Workflow (Jenkins)</a>
<a href="#infrastructure-as-code-terraform" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="infrastructure-as-code-terraform">🏗️ Infrastructure as Code (Terraform)</a>
<a href="#kubernetes-on-amazon-eks" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="kubernetes-on-amazon-eks">☸️ Kubernetes on Amazon EKS</a>
<a href="#ingress-traffic-management" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="ingress-traffic-management">🌐 Ingress &amp; Traffic Management</a>
<a href="#data-layer-outside-kubernetes" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="data-layer-outside-kubernetes">🗄️ Data Layer (Outside Kubernetes)</a>
<a href="#monitoring-observability" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="monitoring-observability">📊 Monitoring &amp; Observability</a>
<a href="#alerts-incident-response" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="alerts-incident-response">🚨 Alerts &amp; Incident Response</a>
<a href="#why-this-is-real-devops" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="why-this-is-real-devops">✅ Why This Is Real DevOps</a>
<a href="#final-takeaway" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="final-takeaway">🏁 Final Takeaway</a>
<a href="#comparison-of-jenkins-terraform-and-kubernetes-in-a-table-format" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="comparison-of-jenkins-terraform-and-kubernetes-in-a-table-format">Comparison<strong> of </strong>Jenkins, Terraform, and Kubernetes** in a table format:</a>
<a href="#rollback-strategy-in-devops" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="rollback-strategy-in-devops">🔄 Rollback Strategy in DevOps</a>
<a href="#real-world-example" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="real-world-example">✅ Real-World Example</a>
<a href="#conclusion" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="conclusion">🔚 Conclusion</a>
<a href="#loading-a-shared-library-in-a-jenkinsfile" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="loading-a-shared-library-in-a-jenkinsfile">📚 Loading a Shared Library in a Jenkinsfile</a>
<a href="#how-ibm-urbancode-deploy-ucd-handles-versioning" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="how-ibm-urbancode-deploy-ucd-handles-versioning">🌟 How IBM UrbanCode Deploy (UCD) Handles Versioning</a>
<a href="#real-world-example" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="real-world-example">🔎 Real-World Example</a>
<a href="#visual-flow-ascii" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="visual-flow-ascii">📊 Visual Flow (ASCII)</a>
<a href="#openshift-vs-kubernetes" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="openshift-vs-kubernetes">🌟 OpenShift vs Kubernetes</a>
<a href="#ascii-visual-flow" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="ascii-visual-flow">📊 ASCII Visual Flow</a>
<a href="#short-interview-answer" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="short-interview-answer">✅ Short Interview Answer</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = cicdTocData;
}
