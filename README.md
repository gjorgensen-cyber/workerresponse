# Worker Response

Cloudflare Worker that returns authenticated request information and serves
private country flag assets from R2.

## Repository Tree

```text
workerresponse/
├── README.md
├── .gitignore
└── worker/
    ├── README.md
    ├── wrangler.jsonc
    ├── src/
    │   └── index.js
    └── flags/
        ├── GB.svg
        ├── PT.svg
        └── US.svg
```

## Request Flow

```text
Access authenticates the user
  -> Worker runs on /secure
  -> Worker reads ctx.access and request.cf.country
  -> Worker returns HTML with a country link
  -> /secure/${COUNTRY} reads the matching private R2 object
  -> Worker returns the SVG flag
```

## Deploy

Run from the repository root. The system CA settings are required on machines
using the corporate proxy certificate:

```sh
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc --dry-run

NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc
```

The Worker is named `workerresponse-secure` and is routed to
`tunnel.greginthecloud.com/secure*`.
