# Architecture Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         START: User Opens App                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   index.html        │
                    │  (login required)   │
                    └──────────┬──────────┘
                               │
                               ▼
                  ┌──────────────────────────┐
                  │  index-app.js            │
                  │  - Fetch index.json      │
                  │  - Build page registry   │
                  │  - Render cards         │
                  └──────────┬───────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
    ┌──────────────────┐        ┌──────────────────┐
    │  PDF Card        │        │  Page Card       │
    │  HTML Card       │        │  (Dynamic)       │
    │  (Static)        │        │                  │
    └──────────────────┘        └────────┬─────────┘
                                         │
                                         ▼
                         ┌───────────────────────────┐
                         │ User Clicks Page Card     │
                         │ Navigate to:              │
                         │ pages/page.html?page=xxx  │
                         └───────────┬───────────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │      pages/page.html            │
                    │   (Generic Template)           │
                    │  - Sidebar with TOC            │
                    │  - Main content area           │
                    │  - Placeholder divs            │
                    └────────────┬───────────────────┘
                                 │
                                 ▼
              ┌──────────────────────────────────────┐
              │   generic-page-loader.js             │
              │                                      │
              │  1. Extract URL parameter (?page=)   │
              │  2. Sanitize page name               │
              │  3. Check window.pageRegistry        │
              │  4. Fetch data/pages/{name}.json     │
              │  5. Inject HTML into template        │
              │  6. Attach event handlers            │
              │  7. Highlight code blocks            │
              └──────────────┬───────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
    ┌──────────────────────┐    ┌──────────────────────┐
    │ Using Page Registry  │    │ Using JSON Fetch     │
    │ (Fastest, no req)    │    │ (Fallback, 1 req)    │
    │                      │    │                      │
    │ Get from memory:     │    │ GET /data/pages/     │
    │ - title              │    │     {page}.json      │
    │ - description        │    │                      │
    │ - icon               │    │ Parse JSON           │
    │                      │    │ Extract:             │
    │ Still fetch TOC &    │    │ - tocHtml            │
    │ content from JSON    │    │ - contentHtml        │
    │                      │    │ - title              │
    │                      │    │ - description        │
    └──────────┬───────────┘    │ - icon               │
               │                 └──────────┬──────────┘
               └───────────────┬────────────┘
                               │
                               ▼
                  ┌──────────────────────────┐
                  │   Render Page            │
                  │                          │
                  │  1. Set page title       │
                  │  2. Inject TOC HTML      │
                  │  3. Inject content HTML  │
                  │  4. Attach TOC handlers  │
                  │  5. Highlight code      │
                  │  6. Show scroll-top btn  │
                  └──────────┬───────────────┘
                             │
                             ▼
                  ┌──────────────────────────┐
                  │   Page Ready to View     │
                  │                          │
                  │  - User sees TOC sidebar │
                  │  - User sees content     │
                  │  - Click TOC items       │
                  │  - Click links in text   │
                  └──────────┬───────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
    ┌──────────────────────┐    ┌──────────────────────┐
    │  Click TOC Item      │    │  Click Page Card     │
    │                      │    │  (from index)        │
    │  1. Get target ID    │    │                      │
    │  2. Find element     │    │  Navigate to:        │
    │  3. Scroll to it     │    │  pages/page.html     │
    │     (smooth)         │    │  ?page=other-page    │
    │                      │    │                      │
    └──────────┬───────────┘    └──────────┬───────────┘
               │                            │
               │          ┌─────────────────┘
               │          │
               └──────────┼──────────────────┐
                          │                  │
                    Page Stays Loaded   New Page Loads
                    (Scroll animation)  (Repeat process)
```

## Data Flow Diagram

```
                    ┌─────────────────────────────────┐
                    │  Markdown Files (md1/md2)       │
                    │  - java-basics.md               │
                    │  - spring.md                    │
                    │  - database.md                  │
                    └────────────┬────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────────┐
                    │  batch-converter.py             │
                    │                                 │
                    │  Process:                       │
                    │  1. Read .md files              │
                    │  2. Convert to HTML             │
                    │  3. Generate TOC                │
                    │  4. Create JSON output          │
                    │  5. Update index.html           │
                    │  6. Build search index          │
                    └────────────┬────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
    ┌─────────────────┐ ┌────────────────┐ ┌─────────────────┐
    │  data/pages/    │ │   index.html   │ │ search-index    │
    │  {page}.json    │ │   (updated)    │ │ .json (updated) │
    │                 │ │                │ │                 │
    │ {              │ │ Cards now link │ │ Links use:      │
    │   title: "...", │ │ to:            │ │                 │
    │   icon: "...",  │ │                │ │ pages/page.html │
    │   toc: "...",   │ │ pages/         │ │ ?page=xxx       │
    │   content: "..."│ │ page.html?     │ │                 │
    │ }              │ │ page=xxx       │ │                 │
    │                 │ │                │ │                 │
    └─────────────────┘ └────────────────┘ └─────────────────┘
              │                                      │
              └──────────────────┬───────────────────┘
                                 │
                ┌────────────────┴────────────────┐
                ▼                                 ▼
        ┌─────────────────┐             ┌──────────────────┐
        │  index-app.js   │             │ search.js        │
        │                 │             │                  │
        │ Load index.json │             │ Load search idx  │
        │ Build registry  │             │ Handle queries   │
        │ Render cards    │             │ Show results     │
        │                 │             │                  │
        └─────────────────┘             └──────────────────┘
```

## File Access Pattern

```
                    ┌─────────────────────────────────┐
                    │  User in Sidebar on index.html  │
                    │  (page registry available)      │
                    └────────────┬────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────────┐
                    │  User Clicks "Java Basics"      │
                    │  From page registry:            │
                    │    title: "Java Basics"         │
                    │    icon: "☕"                    │
                    │    description: "..."           │
                    └────────────┬────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────────┐
                    │  Page Meta Available! ✓         │
                    │  No extra request needed        │
                    │                                 │
                    │  Still fetch:                   │
                    │  GET data/pages/                │
                    │      java-basics.json           │
                    │                                 │
                    │  (For TOC + content)            │
                    └────────────┬────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────────┐
                    │  Page Loads (Very Fast!)        │
                    │                                 │
                    │  Template cached:               │
                    │  ✓ page.html in browser cache   │
                    │                                 │
                    │  Data fetched:                  │
                    │  ✓ java-basics.json (~4KB)      │
                    │                                 │
                    │  Total new data: ~4KB           │
                    │  vs old: ~12KB (html+js files)  │
                    └─────────────────────────────────┘
```

## Search Result Click Flow

```
┌─────────────────────────────────┐
│  User Searches "array methods"  │
│                                 │
│  Search Query: "array methods"  │
└────────────┬────────────────────┘
             │
             ▼
  ┌──────────────────────────────┐
  │  search.js                   │
  │                              │
  │  1. Parse search-index.json  │
  │  2. Match query              │
  │  3. Build result list        │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  Search Results Shown:       │
  │                              │
  │  "Java Array Methods"        │
  │  Link: pages/page.html?page= │
  │        java-array-methods    │
  │                              │
  │  "Data Structure Arrays"     │
  │  Link: pages/page.html?page= │
  │        data-structure-arrays │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  User Clicks Result          │
  │                              │
  │  Navigate to:                │
  │  pages/page.html?page=       │
  │    java-array-methods        │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  generic-page-loader.js      │
  │                              │
  │  Load data/pages/            │
  │    java-array-methods.json   │
  │                              │
  │  Render page                 │
  └──────────────────────────────┘
```

## Caching Strategy

```
                    ┌─────────────────────────────────┐
                    │  First Visit: index.html        │
                    │  Cache Status: Empty            │
                    └────────────┬────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────────┐
                    │  Browser Downloads:             │
                    │  1. index.html (5KB)            │
                    │  2. CSS files (20KB)            │
                    │  3. JS files (50KB)             │
                    │  4. index.json (8KB)            │
                    │                                 │
                    │  Total: 83KB                    │
                    │  Cached: ✓ All files            │
                    └────────────┬────────────────────┘
                                 │
                    ┌────────────┴─────────────┐
                    │                          │
                    ▼                          ▼
        ┌─────────────────────┐    ┌──────────────────┐
        │ Click Java Card     │    │ Click Spring Card│
        │                     │    │                  │
        │ Navigate to:        │    │ Navigate to:     │
        │ page.html?page=java │    │ page.html?page=  │
        │                     │    │    spring        │
        └─────────┬───────────┘    └────────┬─────────┘
                  │                         │
                  ▼                         ▼
        ┌──────────────────────┐ ┌──────────────────┐
        │ Browser:             │ │ Browser:         │
        │ Download:            │ │ Download:        │
        │ - page.html          │ │ - page.html      │
        │   (cache HIT! 5KB)   │ │   (cache HIT!)   │
        │ - java.json (4KB)    │ │ - spring.json    │
        │                      │ │   (4KB)          │
        │ Total: 4KB           │ │                  │
        │ Saved: 5KB cache     │ │ Total: 4KB       │
        └──────────────────────┘ │ Saved: 5KB cache │
                                 └──────────────────┘
        
        NEW PAGES ARE50% SMALLER DUE TO CACHING!
        (4KB vs 8KB for full HTML+JS)
```

## Error Handling Flow

```
╔─────────────────────────────────────╗
║ URL: pages/page.html?page=xxx       ║
╚────────────┬────────────────────────╝
             │
             ▼
    ┌────────────────────┐
    │ generic-page-loader│
    │  Reads: ?page=xxx  │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Sanitize "xxx"     │
    │ Remove unsafe      │
    │ characters         │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Fetch JSON         │
    │ /data/pages/xxx    │
    │ .json              │
    └────────┬───────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
   ┌─────┐   ┌──────────────┐
   │ ✓OK │   │ ✗ 404/Error  │
   └──┬──┘   └────────┬─────┘
      │               │
      ▼               ▼
  ┌──────────┐   ┌──────────────────┐
  │ Render   │   │ Show Error:      │
  │ Page     │   │ "Page not found" │
  │          │   │ Offer link home  │
  │          │   │ Link: /index.html│
  └──────────┘   └──────────────────┘
```

## Summary

This architecture provides:
- ✅ **Simple URL Pattern** - Clear, readable query parameters
- ✅ **Efficient Caching** - Single template cached, only data varies
- ✅ **Fast Navigation** - After first load, only JSON files transfer
- ✅ **Error Handling** - Graceful fallbacks and error messages
- ✅ **Security** - Sanitized inputs, no path traversal attacks
- ✅ **Scalability** - Can handle unlimited pages with same template
- ✅ **Maintainability** - Single template, multiple data files

