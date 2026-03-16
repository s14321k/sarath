#!/usr/bin/env python3
import json
import os
from datetime import datetime, timezone


def load_event_payload():
    event_path = os.environ.get("GITHUB_EVENT_PATH", "")
    if not event_path or not os.path.exists(event_path):
        return {}
    with open(event_path, "r", encoding="utf-8") as f:
        return json.load(f)


def safe_str(value, max_len=200):
    if value is None:
        return ""
    s = str(value).strip()
    if len(s) > max_len:
        s = s[:max_len]
    return s


def main():
    payload = load_event_payload()
    client = payload.get("client_payload", {})

    name = safe_str(client.get("name"), 80)
    if not name:
        raise SystemExit("Missing name in client_payload")

    record = {
        "name": name,
        "clientTime": safe_str(client.get("clientTime"), 64),
        "timezone": safe_str(client.get("timezone"), 64),
        "locale": safe_str(client.get("locale"), 64),
        "page": safe_str(client.get("page"), 200),
        "referrer": safe_str(client.get("referrer"), 200),
        "userAgent": safe_str(client.get("userAgent"), 200),
        "ip": safe_str(client.get("ip"), 64),
        "cf": client.get("cf", {}),
        "serverTime": datetime.now(timezone.utc).isoformat(),
    }

    data_path = os.path.join("data", "visits.json")
    os.makedirs(os.path.dirname(data_path), exist_ok=True)
    if os.path.exists(data_path):
        with open(data_path, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = []
    else:
        data = []

    if not isinstance(data, list):
        data = []

    data.append(record)

    with open(data_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
