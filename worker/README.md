# Cloudflare Worker

This directory contains the initial Worker implementation for the assignment.

The Worker will eventually:

- Return authenticated identity information from `/secure`.
- Link the country value to `/secure/${COUNTRY}`.
- Read the country flag from a private R2 bucket in the next implementation
  slice.

## Wrangler

Run Wrangler from the repository root:

```sh
wrangler deploy --config worker/wrangler.jsonc --dry-run
wrangler deploy --config worker/wrangler.jsonc
```

The Worker route is `tunnel.greginthecloud.com/secure*`. Access is configured
to authenticate this path before the Worker runs.
