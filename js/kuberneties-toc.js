// Kuberneties - Table of Contents Data
const kubernetiesTocData = `<a href="#kubernetes" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="kubernetes">Kubernetes</a>
<a href="#gke-overview" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="gke-overview">🏗️ GKE Overview</a>
<a href="#key-components" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="key-components">🧱 Key Components</a>
<a href="#𝐊𝐮𝐛𝐞𝐫𝐧𝐞𝐭𝐞𝐬-𝐊𝟖𝐬-𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="𝐊𝐮𝐛𝐞𝐫𝐧𝐞𝐭𝐞𝐬-𝐊𝟖𝐬-𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰">☸️ 𝐊𝐮𝐛𝐞𝐫𝐧𝐞𝐭𝐞𝐬 (𝐊𝟖𝐬) 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰</a>
<a href="#𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞-𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞-𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰">🏗️ 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰</a>
<a href="#𝐂𝐨𝐧𝐭𝐫𝐨𝐥-𝐏𝐥𝐚𝐧𝐞-𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="𝐂𝐨𝐧𝐭𝐫𝐨𝐥-𝐏𝐥𝐚𝐧𝐞-𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬">🧭 𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐏𝐥𝐚𝐧𝐞 𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬</a>
<a href="#𝐖𝐨𝐫𝐤𝐞𝐫-𝐍𝐨𝐝𝐞𝐬" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="𝐖𝐨𝐫𝐤𝐞𝐫-𝐍𝐨𝐝𝐞𝐬">⚙️ 𝐖𝐨𝐫𝐤𝐞𝐫 𝐍𝐨𝐝𝐞𝐬</a>
<a href="#𝐒𝐮𝐦𝐦𝐚𝐫𝐲-𝐓𝐚𝐛𝐥𝐞" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="𝐒𝐮𝐦𝐦𝐚𝐫𝐲-𝐓𝐚𝐛𝐥𝐞">🧩 𝐒𝐮𝐦𝐦𝐚𝐫𝐲 𝐓𝐚𝐛𝐥𝐞</a>
<a href="#architecture-diagram-text" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="architecture-diagram-text">🔗 Architecture Diagram (Text)</a>
<a href="#deployment-options" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="deployment-options">🧠 Deployment Options</a>
<a href="#part-1-create-a-sample-website-using-docker-container" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="part-1-create-a-sample-website-using-docker-container">Part 1: Create a Sample Website Using Docker Container</a>
<a href="#part-2-deploying-container-in-gke-cluster" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="part-2-deploying-container-in-gke-cluster">Part 2: Deploying Container in GKE Cluster</a>
<a href="#sources" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="sources">Sources</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = kubernetiesTocData;
}
