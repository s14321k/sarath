// Api Features Beyond Odata - Table of Contents Data
const apiFeaturesBeyondOdataTocData = `<a href="#api-features-beyond-odata-complete-guide" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="api-features-beyond-odata-complete-guide">API Features Beyond OData — Complete Guide</a>
<a href="#table-of-contents" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="table-of-contents">Table of Contents</a>
<a href="#1-authentication-security" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="1-authentication-security">1. Authentication &amp; Security</a>
<a href="#11-oauth-20-the-enterprise-standard" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="11-oauth-20-the-enterprise-standard">1.1 OAuth 2.0 — The Enterprise Standard</a>
<a href="#12-jwt-json-web-token" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="12-jwt-json-web-token">1.2 JWT (JSON Web Token)</a>
<a href="#13-api-keys" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="13-api-keys">1.3 API Keys</a>
<a href="#14-mtls-mutual-tls" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="14-mtls-mutual-tls">1.4 mTLS (Mutual TLS)</a>
<a href="#15-rbac-scopes" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="15-rbac-scopes">1.5 RBAC &amp; Scopes</a>
<a href="#16-security-headers" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="16-security-headers">1.6 Security Headers</a>
<a href="#17-rate-limiting-throttling" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="17-rate-limiting-throttling">1.7 Rate Limiting &amp; Throttling</a>
<a href="#2-data-retrieval-querying" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="2-data-retrieval-querying">2. Data Retrieval &amp; Querying</a>
<a href="#21-rest-query-patterns" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="21-rest-query-patterns">2.1 REST Query Patterns</a>
<a href="#22-graphql-querying-recap-for-comparison" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="22-graphql-querying-recap-for-comparison">2.2 GraphQL Querying (Recap for Comparison)</a>
<a href="#23-jsonapi-specification" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="23-jsonapi-specification">2.3 JSON:API Specification</a>
<a href="#24-cursor-based-pagination-production-standard" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="24-cursor-based-pagination-production-standard">2.4 Cursor-Based Pagination (Production Standard)</a>
<a href="#25-hypermedia-hateoas" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="25-hypermedia-hateoas">2.5 Hypermedia (HATEOAS)</a>
<a href="#3-metadata-schema-exploration" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="3-metadata-schema-exploration">3. Metadata &amp; Schema Exploration</a>
<a href="#31-openapi-swagger" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="31-openapi-swagger">3.1 OpenAPI / Swagger</a>
<a href="#32-json-schema" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="32-json-schema">3.2 JSON Schema</a>
<a href="#33-asyncapi" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="33-asyncapi">3.3 AsyncAPI</a>
<a href="#34-graphql-introspection" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="34-graphql-introspection">3.4 GraphQL Introspection</a>
<a href="#35-api-discovery-well-known-endpoints" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="35-api-discovery-well-known-endpoints">3.5 API Discovery — <code>.well-known</code> Endpoints</a>
<a href="#4-batch-async-operations" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="4-batch-async-operations">4. Batch &amp; Async Operations</a>
<a href="#41-rest-batch-requests" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="41-rest-batch-requests">4.1 REST Batch Requests</a>
<a href="#42-async-long-running-operations" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="42-async-long-running-operations">4.2 Async / Long-Running Operations</a>
<a href="#43-prefer-header-ietf-rfc-7240" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="43-prefer-header-ietf-rfc-7240">4.3 Prefer Header (IETF RFC 7240)</a>
<a href="#44-job-queue-patterns" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="44-job-queue-patterns">4.4 Job Queue Patterns</a>
<a href="#45-bulk-import-export-apis" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="45-bulk-import-export-apis">4.5 Bulk Import / Export APIs</a>
<a href="#46-idempotency-for-batch-safety" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="46-idempotency-for-batch-safety">4.6 Idempotency for Batch Safety</a>
<a href="#5-file-handling-attachments" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="5-file-handling-attachments">5. File Handling &amp; Attachments</a>
<a href="#51-multipart-upload" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="51-multipart-upload">5.1 Multipart Upload</a>
<a href="#52-chunked-resumable-upload" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="52-chunked-resumable-upload">5.2 Chunked / Resumable Upload</a>
<a href="#53-pre-signed-urls-secure-direct-uploaddownload" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="53-pre-signed-urls-secure-direct-uploaddownload">5.3 Pre-signed URLs (Secure Direct Upload/Download)</a>
<a href="#54-file-metadata-management" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="54-file-metadata-management">5.4 File Metadata &amp; Management</a>
<a href="#55-virus-scanning-validation" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="55-virus-scanning-validation">5.5 Virus Scanning &amp; Validation</a>
<a href="#6-webhooks-events-real-time" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="6-webhooks-events-real-time">6. Webhooks &amp; Events / Real-Time</a>
<a href="#61-webhooks" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="61-webhooks">6.1 Webhooks</a>
<a href="#62-server-sent-events-sse" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="62-server-sent-events-sse">6.2 Server-Sent Events (SSE)</a>
<a href="#63-websockets" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="63-websockets">6.3 WebSockets</a>
<a href="#64-long-polling-fallback-pattern" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="64-long-polling-fallback-pattern">6.4 Long Polling (Fallback Pattern)</a>
<a href="#65-event-schema-standard-cloudevents" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="65-event-schema-standard-cloudevents">6.5 Event Schema Standard (CloudEvents)</a>
<a href="#66-real-time-technology-comparison" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="66-real-time-technology-comparison">6.6 Real-Time Technology Comparison</a>
<a href="#7-quick-decision-matrix" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="7-quick-decision-matrix">7. Quick Decision Matrix</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = apiFeaturesBeyondOdataTocData;
}
