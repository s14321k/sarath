// Odata Json Query Guide - Table of Contents Data
const odataJsonQueryGuideTocData = `<a href="#odata-json-query-complete-guide" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="odata-json-query-complete-guide">OData JSON Query — Complete Guide</a>
<a href="#what-is-odata" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="what-is-odata">What is OData?</a>
<a href="#odata-json-response-structure" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="odata-json-response-structure">OData JSON Response Structure</a>
<a href="#all-odata-query-options" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="all-odata-query-options">All OData Query Options</a>
<a href="#1-filter-filter-records" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-filter-filter-records">1. <code>$filter</code> — Filter Records</a>
<a href="#2-select-select-specific-fields" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-select-select-specific-fields">2. <code>$select</code> — Select Specific Fields</a>
<a href="#3-orderby-sort-results" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="3-orderby-sort-results">3. <code>$orderby</code> — Sort Results</a>
<a href="#4-top-limit-results" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="4-top-limit-results">4. <code>$top</code> — Limit Results</a>
<a href="#5-skip-skip-records-offset" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="5-skip-skip-records-offset">5. <code>$skip</code> — Skip Records (Offset)</a>
<a href="#6-count-total-record-count" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="6-count-total-record-count">6. <code>$count</code> — Total Record Count</a>
<a href="#7-expand-expand-related-entities" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="7-expand-expand-related-entities">7. <code>$expand</code> — Expand Related Entities</a>
<a href="#8-search-full-text-search" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="8-search-full-text-search">8. <code>$search</code> — Full-Text Search</a>
<a href="#9-apply-aggregation-transformation" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="9-apply-aggregation-transformation">9. <code>$apply</code> — Aggregation &amp; Transformation</a>
<a href="#10-format-response-format" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="10-format-response-format">10. <code>$format</code> — Response Format</a>
<a href="#11-combining-query-options" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="11-combining-query-options">11. Combining Query Options</a>
<a href="#handling-large-data-with-odata" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="handling-large-data-with-odata">Handling Large Data with OData</a>
<a href="#strategy-1-server-side-pagination-with-top-skip" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-1-server-side-pagination-with-top-skip">Strategy 1: Server-Side Pagination with <code>$top</code> + <code>$skip</code></a>
<a href="#strategy-2-server-driven-pagination-with-odatanextlink" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-2-server-driven-pagination-with-odatanextlink">Strategy 2: Server-Driven Pagination with <code>@odata.nextLink</code></a>
<a href="#strategy-3-skiptoken-cursor-based-pagination" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-3-skiptoken-cursor-based-pagination">Strategy 3: <code>$skiptoken</code> — Cursor-Based Pagination</a>
<a href="#strategy-4-reduce-payload-with-select-odatametadatanone" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-4-reduce-payload-with-select-odatametadatanone">Strategy 4: Reduce Payload with <code>$select</code> + <code>odata.metadata=none</code></a>
<a href="#strategy-5-filter-before-fetching-with-filter" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-5-filter-before-fetching-with-filter">Strategy 5: Filter Before Fetching with <code>$filter</code></a>
<a href="#strategy-6-use-apply-for-server-side-aggregation" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-6-use-apply-for-server-side-aggregation">Strategy 6: Use <code>$apply</code> for Server-Side Aggregation</a>
<a href="#strategy-7-parallel-partitioned-requests" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-7-parallel-partitioned-requests">Strategy 7: Parallel Partitioned Requests</a>
<a href="#strategy-8-batch-requests-with-batch" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-8-batch-requests-with-batch">Strategy 8: Batch Requests with <code>$batch</code></a>
<a href="#strategy-9-asynchronous-requests-prefer-header" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="strategy-9-asynchronous-requests-prefer-header">Strategy 9: Asynchronous Requests (Prefer Header)</a>
<a href="#large-data-best-practices-summary" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="large-data-best-practices-summary">Large Data Best Practices — Summary</a>
<a href="#odata-v4-vs-v2-key-json-differences" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="odata-v4-vs-v2-key-json-differences">OData v4 vs v2 — Key JSON Differences</a>
<a href="#quick-reference-card" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="quick-reference-card">Quick Reference Card</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = odataJsonQueryGuideTocData;
}
