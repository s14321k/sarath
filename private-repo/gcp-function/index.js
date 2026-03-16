const https = require('https');

exports.ingest = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type');
        return res.status(204).send('');
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const name = validateName(req.body?.name || '');
    if (!name) {
        return res.status(400).json({ error: 'Invalid name' });
    }

    const payload = {
        name,
        clientTime: safeStr(req.body?.clientTime, 64),
        timezone: safeStr(req.body?.timezone, 64),
        locale: safeStr(req.body?.locale, 64),
        page: safeStr(req.body?.page, 200),
        referrer: safeStr(req.body?.referrer, 200),
        userAgent: safeStr(req.body?.userAgent, 200),
        ip: req.headers['x-forwarded-for'] || '',
        place: {}
    };

    try {
        await dispatchToGitHub(payload);
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({ ok: true });
    } catch (e) {
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(502).json({ error: 'GitHub dispatch failed', detail: String(e) });
    }
};

function validateName(value) {
    const name = String(value || '').trim();
    if (name.length < 2 || name.length > 40) return '';
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(name)) return '';
    return name;
}

function safeStr(value, maxLen) {
    if (value == null) return '';
    const s = String(value).trim();
    if (s.length > maxLen) return s.slice(0, maxLen);
    return s;
}

function dispatchToGitHub(payload) {
    const owner = process.env.GH_OWNER;
    const repo = process.env.GH_REPO;
    const token = process.env.GH_TOKEN;

    const body = JSON.stringify({
        event_type: 'append_visit',
        client_payload: payload
    });

    const options = {
        hostname: 'api.github.com',
        path: `/repos/${owner}/${repo}/dispatches`,
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'gcp-visit-ingest',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (resp) => {
            let data = '';
            resp.on('data', (c) => { data += c; });
            resp.on('end', () => {
                if (resp.statusCode >= 200 && resp.statusCode < 300) resolve();
                else reject(`Status ${resp.statusCode}: ${data}`);
            });
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}
