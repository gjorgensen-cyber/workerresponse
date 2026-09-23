# Cloudflare Worker

This directory contains the initial Worker implementation for the assignment.

The Worker will eventually:

- Return authenticated identity information from `/secure`.
- Link the country value to `/secure/${COUNTRY}`.
- Read the country flag from a private R2 bucket.

## Wrangler

Run Wrangler from the repository root:

```sh
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc --dry-run
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc
```

The Worker route is `tunnel.greginthecloud.com/secure*`. Access is configured
to authenticate this path before the Worker runs.

The initial Worker deployment is complete. The country flag response and R2
binding are now included in the Worker configuration. The initial flag set is
`PT`, `US`, and `GB`.

## Wrangler Corporate CA Note

On this machine, Wrangler's Node process initially failed during OAuth with a
certificate mismatch caused by the corporate proxy/VPN CA not being in Node's
default trust store. The working commands use the macOS system CA store:

```sh
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc
```

This preserves TLS verification. It does not disable certificate validation.
