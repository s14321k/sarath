#!/usr/bin/env python3
"""
Batch Markdown to HTML Converter
Automatically converts all markdown files in a directory to interactive HTML pages
"""

import os
import sys
import re
import json
import html as html_module

def create_id(title):
    """Create URL-friendly ID from title"""
    # Remove markdown links/images but preserve visible text: [text](url) -> text, ![alt](url) -> alt
    cleaned = re.sub(r'!\[([^\]]*)\]\([^\)]+\)', r'\1', title)
    cleaned = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', cleaned)
    header_id = re.sub(r'[^\w\s-]', '', cleaned.lower())
    header_id = re.sub(r'[\s_]+', '-', header_id)
    # Collapse multiple dashes and strip leading/trailing dashes
    header_id = re.sub(r'-{2,}', '-', header_id)
    header_id = header_id.strip('-')
    return header_id


def process_inline(text: str) -> str:
    """Safely process inline Markdown in `text` to HTML.

    Steps:
    - Extract inline code spans and replace with placeholders.
    - Escape remaining text to avoid XSS.
    - Replace images and links (escaping captured groups).
    - Replace bold (**) then emphasis (* or _).
    - Restore code placeholders (escaped inside <code>).
    """
    # 1) Extract code spans and replace with placeholders
    # First, normalize triple backticks to single backticks for inline code
    # ```code``` -> `code`
    text = re.sub(r'```([^`\n]+?)```', r'`\1`', text)

    code_placeholders = {}
    def _code_repl(m):
        idx = len(code_placeholders)
        # Use a placeholder that avoids markdown delimiter characters so links/images still parse.
        key = f"@@CODE{idx}@@"
        # store escaped content
        code_placeholders[key] = html_module.escape(m.group(1))
        return key

    text_with_placeholders = re.sub(r'`([^`]+?)`', _code_repl, text)

    # 2) Escape what's left to prevent HTML injection
    escaped = html_module.escape(text_with_placeholders)

    # 3) Images: ![alt](url)
    def _img_repl(m):
        # m.group(1) and m.group(2) are from the escaped string, so group(1) is already escaped
        alt = m.group(1)
        src = html_module.escape(m.group(2))
        return f'<img src="{src}" alt="{alt}">'
    escaped = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', _img_repl, escaped)

    # 4) Links: [text](url)
    def _link_repl(m):
        # m.group(1) is already escaped (from html.escape above), avoid double-escaping
        text_inner = m.group(1)
        href = html_module.escape(m.group(2))
        return f'<a href="{href}">{text_inner}</a>'
    escaped = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', _link_repl, escaped)

    # 5) Bold **text** then italics *text* and _text_
    escaped = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', escaped)
    # handle underscore italics as well
    escaped = re.sub(r'_(.+?)_', r'<em>\1</em>', escaped)
    # handle single asterisk italics (avoid matching bold which is already replaced)
    escaped = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', escaped)

    # 6) Restore code placeholders
    for key, value in code_placeholders.items():
        escaped = escaped.replace(key, f'<code>{value}</code>')

    return escaped

def convert_markdown_to_html(markdown_content):
    """Convert markdown content to HTML with TOC"""
    lines = markdown_content.split('\n')

    html_parts = []
    toc_items = []
    in_code_block = False
    code_lang = ''
    code_indent = 0  # Track indentation of opening fence
    in_list = False
    in_table = False

    def split_table_row(raw_line: str):
        """Split a markdown table row by unescaped pipes outside inline code."""
        cells = []
        buf = []
        in_code = False
        i = 0
        while i < len(raw_line):
            ch = raw_line[i]
            if ch == '`':
                # Track inline code spans (single backtick)
                run = 1
                while i + run < len(raw_line) and raw_line[i + run] == '`':
                    run += 1
                buf.append('`' * run)
                if run == 1:
                    in_code = not in_code
                i += run
                continue
            if ch == '\\' and i + 1 < len(raw_line) and raw_line[i + 1] == '|':
                buf.append('|')
                i += 2
                continue
            if ch == '|' and not in_code:
                cells.append(''.join(buf))
                buf = []
                i += 1
                continue
            buf.append(ch)
            i += 1
        cells.append(''.join(buf))
        return cells

    for i, line in enumerate(lines):
        if line.startswith('<!--'):
            continue

        # Check for code fence (with or without leading spaces)
        stripped = line.lstrip()
        if stripped.startswith('```'):
            if not in_code_block:
                # Opening fence - track its indentation
                in_code_block = True
                code_indent = len(line) - len(stripped)  # Calculate leading spaces
                code_lang = stripped[3:].strip()
                if code_lang.lower() == 'mermaid':
                    html_parts.append('<div class="mermaid">')
                else:
                    html_parts.append(f'<pre><code class="language-{code_lang}">')
            else:
                # Closing fence
                in_code_block = False
                code_indent = 0
                if code_lang.lower() == 'mermaid':
                    html_parts.append('</div>')
                else:
                    html_parts.append('</code></pre>')
            continue

        # After handling code fence open/close, if we're inside a code block
        # treat the current line as literal content (escaped) and continue.
        if in_code_block:
            # Remove the same amount of indentation as the opening fence
            if line.startswith(' ' * code_indent):
                line = line[code_indent:]
            # Escape HTML, then replace backticks with &#96;
            escaped_line = html_module.escape(line)
            escaped_line = escaped_line.replace('`', '&#96;')
            html_parts.append(escaped_line)
            continue

        # Emit raw HTML tag lines as-is so HTML blocks like <details> render correctly
        if re.match(r'^\s*<\s*/?\s*[a-zA-Z0-9\-]+', line):
            # append line without escaping so tags like <details>, <summary>, </details> stay functional
            html_parts.append(line)
            continue

        header_match = re.match(r'^(#{1,6})\s+(.+)$', line)
        if header_match:
            if in_list:
                html_parts.append('</ul>')
                in_list = False

            level = len(header_match.group(1))
            title = header_match.group(2).strip()
            header_id = create_id(title)
            # Render the header title with inline processing (so links/emphasis show correctly)
            rendered_title = process_inline(title)
            html_parts.append(f'<h{level} id="{header_id}">{rendered_title}</h{level}>')

            # For TOC, prepare a label without link markup and process inline markdown (so `code` becomes <code>)
            toc_label = re.sub(r'!\[([^\]]*)\]\([^\)]+\)', r'\1', title)
            toc_label = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', toc_label)
            toc_label_html = process_inline(toc_label)
            if level <= 3:
                toc_items.append({'level': level, 'title': toc_label_html, 'id': header_id})
            continue

        if line.strip() in ['---', '***', '___']:
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            html_parts.append('<hr>')
            continue

        list_match = re.match(r'^(\s*)([-*+]|\d+\.)\s+(.+)$', line)
        if list_match:
            if not in_list:
                html_parts.append('<ul>')
                in_list = True
            content_text = list_match.group(3)
            # Safely process inline markdown in list items
            content_text = process_inline(content_text)
            html_parts.append(f'<li>{content_text}</li>')
            continue
        else:
            if in_list:
                html_parts.append('</ul>')
                in_list = False

        if line.startswith('>'):
            # Process inline markdown inside blockquotes as well
            bq = line[1:].strip()
            html_parts.append(f'<blockquote>{process_inline(bq)}</blockquote>')
            continue

        if '|' in line and len(line.strip()) > 2:
            cells = [cell.strip() for cell in split_table_row(line)]
            cells = [c for c in cells if c]

            if cells and not all(c in ['-', ':', ' '] or set(c) <= set('-: ') for c in cells):
                if not in_table:
                    html_parts.append('<table>')
                    in_table = True
                    if i + 1 < len(lines) and set(lines[i+1].replace('|', '').replace(' ', '')) <= set('-:'):
                        html_parts.append('<thead><tr>')
                        for cell in cells:
                            html_parts.append(f'<th>{process_inline(cell)}</th>')
                        html_parts.append('</tr></thead><tbody>')
                    else:
                        html_parts.append('<tr>')
                        for cell in cells:
                            html_parts.append(f'<td>{process_inline(cell)}</td>')
                        html_parts.append('</tr>')
                else:
                    html_parts.append('<tr>')
                    for cell in cells:
                        html_parts.append(f'<td>{process_inline(cell)}</td>')
                    html_parts.append('</tr>')
                continue
            elif in_table and all(c in ['-', ':', ' ', '|'] for c in line):
                continue
        else:
            if in_table:
                html_parts.append('</tbody></table>')
                in_table = False

        if line.strip() and not line.startswith('#'):
            text = line
            # Safely process inline markdown for paragraphs
            text = process_inline(text)
            html_parts.append(f'<p>{text}</p>')

    if in_list:
        html_parts.append('</ul>')
    if in_table:
        html_parts.append('</tbody></table>')

    toc_html_parts = []
    for item in toc_items:
        indent = (item['level'] - 1) * 20
        toc_html_parts.append(
            f'<a href="#{item["id"]}" class="toc-item toc-level-{item["level"]}" '
            f'style="padding-left: {indent}px" data-target="{item["id"]}">'  # noqa: E501
            f'{item["title"]}</a>'
        )

    return '\n'.join(html_parts), '\n'.join(toc_html_parts), len(toc_items)

def create_page_files(page_name, page_title, description, icon, content_html, toc_html, output_dir, pages_subdir='pages', write_public_js=False):
    """
    Create JSON data files for a page (no individual HTML files).
    Uses a generic page.html template that loads data dynamically via query parameter.
    """
    # Create data directory
    data_dir = os.path.join(output_dir, 'data', 'pages')
    os.makedirs(data_dir, exist_ok=True)

    # Write combined page JSON with both TOC and content
    page_json_path = os.path.join(data_dir, f'{page_name}.json')
    page_data = {
        'title': page_title,
        'description': description,
        'icon': icon,
        'tocHtml': toc_html,
        'contentHtml': content_html
    }
    with open(page_json_path, 'w', encoding='utf-8') as f:
        json.dump(page_data, f, ensure_ascii=False, indent=2)

    # For backwards compatibility, also write legacy separate toc/content JSON files if needed
    toc_json_path = os.path.join(data_dir, f'{page_name}-toc.json')
    content_json_path = os.path.join(data_dir, f'{page_name}-content.json')
    with open(toc_json_path, 'w', encoding='utf-8') as f:
        json.dump({'html': toc_html}, f, ensure_ascii=False, indent=2)
    with open(content_json_path, 'w', encoding='utf-8') as f:
        json.dump({'html': content_html}, f, ensure_ascii=False, indent=2)

    json_size = len(json.dumps(page_data))

    return {
        'page_name': page_name,
        'page_title': page_title,
        'description': description,
        'icon': icon,
        'json_size': json_size
    }

# New helper: build a card HTML snippet
def create_card_html(page_name, config):
    """Return the HTML snippet for a card to insert into index.html"""
    # Use generic page.html template with page parameter instead of individual HTML files
    page_dir = config.get('page_dir', 'pages')
    href = f'{page_dir}/page.html?page={page_name}'
    icon = config.get('icon', '')
    title = config.get('title', page_name)
    description = config.get('description', '')
    card = (
        f'            <a href="{href}" class="card">\n'
        f'                <div class="card-icon">{icon}</div>\n'
        f'                <h2>{title}</h2>\n'
        f'                <p>{description}</p>\n'
        f'                <span class="card-status available">Available</span>\n'
        f'            </a>\n'
    )
    return card

# New helper: insert card(s) into index.html, skipping duplicates
def update_index_file(index_path, page_name, config):
    """Insert a card for page_name into index.html if not already present."""
    if not os.path.exists(index_path):
        print(f'⚠️  index.html not found at {index_path}, skipping index update')
        return False

    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    page_dir = config.get('page_dir', 'pages')
    href = f'{page_dir}/page.html?page={page_name}'
    card_html = create_card_html(page_name, config)

    # If card already exists, replace it to keep content in sync
    if f'page.html?page={page_name}' in content:
        pattern = re.compile(
            rf'(<a\s+href="{re.escape(href)}"\s+class="card"[^>]*>.*?</a>)',
            re.DOTALL
        )
        if pattern.search(content):
            new_content = pattern.sub(card_html.rstrip(), content, count=1)
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False

    # Try to insert into the cards-grid div (match the correct closing div)
    start = content.find('<div class="cards-grid">')
    if start != -1:
        start_tag_end = content.find('>', start)
        if start_tag_end != -1:
            depth = 1
            tail = content[start_tag_end + 1:]
            for match in re.finditer(r'</div>|<div\b[^>]*>', tail, flags=re.IGNORECASE):
                if match.group(0).startswith('</div'):
                    depth -= 1
                else:
                    depth += 1
                if depth == 0:
                    insert_pos = start_tag_end + 1 + match.start()
                    new_content = (
                            content[:insert_pos]
                            + '\n'
                            + card_html
                            + content[insert_pos:]
                    )
                    with open(index_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    return True

    # Fallback: try to insert before footer (common structure in index.html)
    footer_pattern = re.compile(r'(</div>\s*<footer)', re.DOTALL)
    m2 = footer_pattern.search(content)
    if m2:
        insert_pos = m2.start(1)
        new_content = content[:insert_pos] + '\n' + card_html + '\n' + content[insert_pos:]
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True

    # Last fallback: insert before </body>
    if '</body>' in content:
        new_content = content.replace('</body>', card_html + '\n</body>')
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True

    # If all else fails, append to file
    with open(index_path, 'a', encoding='utf-8') as f:
        f.write('\n' + card_html)
    return True


def regenerate_index_cards(index_path, card_configs):
    """Completely regenerate the cards section in index.html"""
    if not os.path.exists(index_path):
        print(f"⚠️  Index file not found: {index_path}")
        return False

    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'id="cardsGrid"' in content:
        # The refactored frontend renders cards from data/index.json.
        return True

    # Fixed library tiles (kept at top)
    pdf_card_html = '''
            <div class="card pdf-card">
                <div class="card-icon">📄</div>
                <h2>PDF Library</h2>
                <p>Browse all PDFs from the library.</p>
                <ul class="pdf-list" id="pdfList"></ul>
            </div>

            <div class="card pdf-card">
                <div class="card-icon">🌐</div>
                <h2>HTML Library</h2>
                <p>Browse all HTML files from the library.</p>
                <ul class="pdf-list" id="htmlList"></ul>
            </div>'''

    # Generate all card HTML
    cards_html = []
    cards_html.append(pdf_card_html)
    for config in sorted(card_configs, key=lambda x: x['title']):
        card = f'''
            <a href="{config.get('page_dir', 'pages')}/page.html?page={config['page_name']}" class="card">
                <div class="card-icon">{config['icon']}</div>
                <h2>{config['title']}</h2>
                <p>{config['description']}</p>
                <span class="card-status available">Available</span>
            </a>'''
        cards_html.append(card)

    all_cards = '\n'.join(cards_html)

    # Find the cards-grid div and replace its content
    # Pattern to match: <div class="cards-grid"> ... </div> (before footer)
    pattern = re.compile(
        r'(<div\s+class="cards-grid">)(.*?)(</div>\s*<footer)',
        re.DOTALL
    )

    match = pattern.search(content)
    if match:
        # Replace the content between cards-grid opening and its closing
        new_content = (
                content[:match.start(2)] +
                all_cards + '\n' +
                content[match.start(3):]
        )

        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True

    print("⚠️  Could not find cards-grid section in index.html")
    return False

def build_index_cards(card_configs):
    """Build the JSON card model used by the login-gated frontend index."""
    cards = [
        {
            'type': 'pdf-list',
            'icon': 'PDF',
            'title': 'PDF Library',
            'description': 'Browse all PDFs from the library.'
        },
        {
            'type': 'html-list',
            'icon': 'HTML',
            'title': 'HTML Library',
            'description': 'Browse all HTML files from the library.'
        }
    ]
    for config in sorted(card_configs, key=lambda x: x['title']):
        cards.append({
            'type': 'page',
            'href': f"{config.get('page_dir', 'pages')}/page.html?page={config['page_name']}",
            'icon': config.get('icon', ''),
            'title': config.get('title', config['page_name']),
            'description': config.get('description', '')
        })
    return cards

def write_index_json(output_dir, private_pages_dir, card_configs):
    """Write frontend and private-repo index JSON."""
    payload = {'cards': build_index_cards(card_configs)}
    data_dir = os.path.join(output_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)
    with open(os.path.join(data_dir, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False)

    if private_pages_dir:
        private_data_dir = os.path.dirname(private_pages_dir)
        os.makedirs(private_data_dir, exist_ok=True)
        with open(os.path.join(private_data_dir, 'index.json'), 'w', encoding='utf-8') as f:
            json.dump(payload, f, ensure_ascii=False)

def generate_pdf_list_js(output_dir):
    """Generate js/pdf-list.js from files in output_dir/pdf"""
    pdf_dir = os.path.join(output_dir, 'pdf')
    js_dir = os.path.join(output_dir, 'js')
    os.makedirs(js_dir, exist_ok=True)

    pdf_files = []
    if os.path.isdir(pdf_dir):
        for name in os.listdir(pdf_dir):
            if name.lower().endswith('.pdf'):
                pdf_files.append(name)
    pdf_files.sort(key=lambda x: x.lower())

    payload = f"window.pdfFiles = {json.dumps(pdf_files, ensure_ascii=False)};"
    out_path = os.path.join(js_dir, 'pdf-list.js')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(payload + '\n')
    return len(pdf_files)

def generate_html_list_js(output_dir):
    """Generate js/html-list.js from files in output_dir/htmls"""
    html_dir = os.path.join(output_dir, 'htmls')
    js_dir = os.path.join(output_dir, 'js')
    os.makedirs(js_dir, exist_ok=True)

    html_files = []
    if os.path.isdir(html_dir):
        for name in os.listdir(html_dir):
            if name.lower().endswith('.html'):
                html_files.append(name)
    html_files.sort(key=lambda x: x.lower())

    payload = f"window.htmlFiles = {json.dumps(html_files, ensure_ascii=False)};"
    out_path = os.path.join(js_dir, 'html-list.js')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(payload + '\n')
    return len(html_files)

def write_private_page_json(private_pages_dir, page_name, toc_html, content_html):
    """Write combined and legacy split page JSON into private repo pages directory."""
    if not private_pages_dir:
        return False
    os.makedirs(private_pages_dir, exist_ok=True)
    page_path = os.path.join(private_pages_dir, f'{page_name}.json')
    toc_path = os.path.join(private_pages_dir, f'{page_name}-toc.json')
    content_path = os.path.join(private_pages_dir, f'{page_name}-content.json')
    with open(page_path, 'w', encoding='utf-8') as f:
        json.dump({'tocHtml': toc_html, 'contentHtml': content_html}, f, ensure_ascii=False)
    with open(toc_path, 'w', encoding='utf-8') as f:
        json.dump({'html': toc_html}, f, ensure_ascii=False)
    with open(content_path, 'w', encoding='utf-8') as f:
        json.dump({'html': content_html}, f, ensure_ascii=False)
    return True

def markdown_to_text(markdown_content):
    """Convert markdown content to plain text for search indexing."""
    text = markdown_content
    # Remove code fences
    text = re.sub(r'```[\s\S]*?```', ' ', text)
    # Remove inline code backticks
    text = re.sub(r'`([^`]+)`', r'\1', text)
    # Replace links/images with visible text
    text = re.sub(r'!\[([^\]]*)\]\([^\)]+\)', r'\1', text)
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    # Remove markdown symbols
    text = re.sub(r'[#>*_~\-]+', ' ', text)
    # Collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def strip_html(raw_html):
    """Remove HTML tags and collapse whitespace."""
    text = re.sub(r'<script[\s\S]*?</script>', ' ', raw_html, flags=re.IGNORECASE)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html_module.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_text_from_html(html):
    """Extract searchable text from HTML content and inline template strings."""
    chunks = []
    patterns = [
        r'innerHTML\s*=\s*`([\s\S]*?)`;',
        r'const\s+\w+ContentData\s*=\s*`([\s\S]*?)`;',
        r'const\s+\w+TocData\s*=\s*`([\s\S]*?)`;'
    ]
    for pat in patterns:
        matches = re.findall(pat, html, flags=re.IGNORECASE)
        for m in matches:
            chunks.append(strip_html(m))
    if chunks:
        return re.sub(r'\s+', ' ', ' '.join(chunks)).strip()
    return strip_html(html)

# Configuration for different page types
PAGE_CONFIGS = {
    'java': {
        'icon': '☕',
        'title': 'Java Basics',
        'description': 'Comprehensive guide to Java fundamentals, OOP, collections, and advanced concepts'
    },
    'spring': {
        'icon': '🍃',
        'title': 'Spring',
        'description': 'Guide to Spring framework topics and patterns'
    },
    'batch': {
        'icon': '🔄',
        'title': 'Spring Batch',
        'description': 'Enterprise batch processing with Spring Batch framework'
    },
    'javascript': {
        'icon': '⚡',
        'title': 'JavaScript',
        'description': 'ES6+, async programming, and modern web development'
    },
    'js': {
        'icon': '⚡',
        'title': 'JavaScript',
        'description': 'JavaScript programming guide and best practices'
    },
    'react': {
        'icon': '⚛️',
        'title': 'React',
        'description': 'React library for building user interfaces'
    },
    'python': {
        'icon': '🐍',
        'title': 'Python Essentials',
        'description': 'Python fundamentals, data structures, libraries, and best practices'
    },
    'database': {
        'icon': '🗄️',
        'title': 'Database Design',
        'description': 'SQL, NoSQL, database optimization, and data modeling'
    },
    'sql': {
        'icon': '🗄️',
        'title': 'SQL',
        'description': 'SQL queries, database design, and optimization'
    },
    'quarkus': {
        'icon': '🔷',
        'title': 'Quarkus',
        'description': 'Kubernetes-native Java framework for cloud applications'
    },
    'api': {
        'icon': '🔌',
        'title': 'API',
        'description': 'API design, development, and best practices'
    },
    'system': {
        'icon': '🏗️',
        'title': 'System Design',
        'description': 'Scalability, microservices, and architecture best practices'
    },
    'default': {
        'icon': '📘',
        'title': 'Guide',
        'description': 'Programming guide and documentation'
    }
}

def detect_page_type(filename):
    """Detect page type from filename with priority for more specific matches."""
    filename_lower = filename.lower()
    # Priority order: more specific matches first
    priority = [
        'batch',
        'quarkus',
        'spring',
        'react',
        'java',
        'javascript',
        'python',
        'database',
        'sql',
        'api',
        'system',
        'js'
    ]
    for key in priority:
        if key in filename_lower:
            return key
    # Always return 'default' so no file is skipped
    return 'default'


def title_from_filename(filename):
    """Create a human-friendly title from a filename."""
    base = os.path.splitext(filename)[0]
    base = re.sub(r'[_-]+', ' ', base).strip()
    return base.title()


def main():
    """Batch convert all markdown files"""
    print("╔════════════════════════════════════════════╗")
    print("║  Batch Markdown to HTML Converter          ║")
    print("║  with Dynamic Index Generation             ║")
    print("╚════════════════════════════════════════════╝\n")

    if len(sys.argv) < 2:
        print("Usage: python batch-converter.py <markdown_directory[,markdown_directory2,...]> [output_directory]")
        print("Example: python batch-converter.py /path/to/markdown/files")
        print("         python batch-converter.py md2 ../project")
        print("         python batch-converter.py md1,md2 .")
        sys.exit(1)

    md_dir_arg = sys.argv[1]
    md_dirs = [part.strip() for part in re.split(r'[;,]', md_dir_arg) if part.strip()]
    if not md_dirs:
        print("❌ No markdown directories provided")
        sys.exit(1)

    # Use provided output directory or auto-detect
    if len(sys.argv) >= 3:
        output_dir = sys.argv[2]
    else:
        # Try to find project directory relative to script location
        script_dir = os.path.dirname(os.path.abspath(__file__))
        output_dir = os.path.join(script_dir, '..')

    # Ensure output directory exists
    if not os.path.exists(output_dir):
        print(f"⚠️  Creating output directory: {output_dir}")
        os.makedirs(output_dir, exist_ok=True)

    for md_dir in md_dirs:
        if not os.path.exists(md_dir):
            print(f"❌ Directory not found: {md_dir}")
            sys.exit(1)

    # Determine private pages dir (optional)
    private_pages_dir = os.environ.get('PRIVATE_PAGES_DIR', '').strip()
    if not private_pages_dir:
        default_private = os.path.join(output_dir, 'private-repo', 'visit-data-repo', 'data', 'pages')
        if os.path.isdir(os.path.join(output_dir, 'private-repo')) or os.path.isdir(os.path.dirname(default_private)):
            private_pages_dir = default_private

    # Find all markdown files
    md_files = []
    for md_dir in md_dirs:
        files = [f for f in os.listdir(md_dir) if f.lower().endswith('.md')]
        md_files.extend([(md_dir, f) for f in files])

    if not md_files:
        print(f"❌ No markdown files found in {', '.join(md_dirs)}")
        sys.exit(1)

    print(f"Found {len(md_files)} markdown file(s) across {len(md_dirs)} folder(s):\n")

    results = []
    card_configs = []
    search_index = []
    indexed_hrefs = set()

    # Path to index.html in the project output dir (default: output_dir/index.html)
    index_html_path = os.path.join(output_dir, 'index.html')

    seen_page_names = set()
    for md_dir, md_file in md_files:
        filepath = os.path.join(md_dir, md_file)
        print(f"Processing: {md_file}")

        # Detect page type (now always returns a value, never None)
        page_type = detect_page_type(md_file)

        config = dict(PAGE_CONFIGS[page_type])
        md_dir_name = os.path.basename(os.path.normpath(md_dir)).lower()
        if md_dir_name == 'md1':
            config['page_dir'] = 'pages1'
        elif md_dir_name == 'md2':
            config['page_dir'] = 'pages'
        else:
            config['page_dir'] = 'pages'
        page_name = md_file.replace('.md', '').lower().replace(' ', '-')
        page_name = re.sub(r'[^a-z0-9-]', '', page_name)
        if page_name in seen_page_names:
            print(f"  ⚠️  Skipping duplicate page name: {page_name}")
            print()
            continue
        seen_page_names.add(page_name)
        dynamic_title = title_from_filename(md_file)
        config['title'] = dynamic_title
        config['description'] = f'Guide to {dynamic_title}.'
        config['page_name'] = page_name

        # Read and convert
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        content_html, toc_html, toc_count = convert_markdown_to_html(content)
        search_index.append({
            'href': f"{config['page_dir']}/page.html?page={page_name}",
            'title': config['title'],
            'text': markdown_to_text(content)
        })
        indexed_hrefs.add(f"{config['page_dir']}/page.html?page={page_name}")
        write_private_page_json(private_pages_dir, page_name, toc_html, content_html)

        # Create files
        result = create_page_files(
            page_name,
            config['title'],
            config['description'],
            config['icon'],
            content_html,
            toc_html,
            output_dir,
            pages_subdir=config.get('page_dir', 'pages')
        )

        result['toc_count'] = toc_count
        result['filename'] = md_file
        results.append(result)
        card_configs.append(config)

        print(f"  ✅ Generated {toc_count} TOC items")
        print()

    # Regenerate index.html cards section
    if card_configs:
        print("Regenerating index.html cards section...")
        if regenerate_index_cards(index_html_path, card_configs):
            print(f"  ✅ index.html cards section regenerated with {len(card_configs)} cards\n")
        else:
            print(f"  ⚠️  Could not regenerate index.html cards section\n")

    if card_configs:
        write_index_json(output_dir, private_pages_dir, card_configs)
        print("  index JSON regenerated\n")

    # Generate library list js for index page
    pdf_count = generate_pdf_list_js(output_dir)
    html_count = generate_html_list_js(output_dir)
    # Generate search index json
    pages_dirs = ['pages', 'pages1']
    for subdir in pages_dirs:
        pages_dir = os.path.join(output_dir, subdir)
        if not os.path.isdir(pages_dir):
            continue
        for name in os.listdir(pages_dir):
            if not name.lower().endswith('.html'):
                continue
            href = f'{subdir}/{name}'
            if href in indexed_hrefs:
                continue
            page_path = os.path.join(pages_dir, name)
            try:
                with open(page_path, 'r', encoding='utf-8') as f:
                    html = f.read()
            except Exception:
                continue
            title_match = re.search(r'<title>(.*?)</title>', html, flags=re.IGNORECASE | re.DOTALL)
            title = strip_html(title_match.group(1)) if title_match else os.path.splitext(name)[0]
            text = extract_text_from_html(html)
            if not text:
                continue
            search_index.append({
                'href': href,
                'title': title,
                'text': text
            })
            indexed_hrefs.add(href)

    if search_index:
        search_path = os.path.join(output_dir, 'search-index.json')
        with open(search_path, 'w', encoding='utf-8') as f:
            json.dump(search_index, f, ensure_ascii=False)
        print(f"  search-index.json generated with {len(search_index)} item(s)\n")
    print(f"  ✅ pdf-list.js generated with {pdf_count} file(s)")
    print(f"  ✅ html-list.js generated with {html_count} file(s)\n")

    # Print summary
    print("╔════════════════════════════════════════════╗")
    print("║           Conversion Summary               ║")
    print("╚════════════════════════════════════════════╝\n")

    for r in results:
        print(f"{r['icon']} {r['page_title']}")
        print(f"   File: {r['filename']}")
        print(f"   TOC Items: {r['toc_count']}")
        print(f"   Data: data/pages/{r['page_name']}.json ({r['json_size']} bytes)")
        print(f"   Page: pages/page.html?page={r['page_name']}")
        print()

    print(f"✅ Successfully converted {len(results)} page(s)!")
    print("✅ All pages use the generic template (pages/page.html)")
    print("✅ Page data stored as JSON in data/pages/")
    print("✅ Index.html cards section updated dynamically!")

if __name__ == '__main__':
    main()
