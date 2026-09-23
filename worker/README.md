# Worker Implementation

This directory contains the Worker source, Wrangler configuration, and the
small initial set of flag assets.

## Files

- `wrangler.jsonc`: tells Wrangler what to deploy, where to route it, and which
  R2 bucket binding to provide as `env.FLAGS`.
- `src/index.js`: handles `/secure` and `/secure/${COUNTRY}`.
- `flags/`: local SVG assets uploaded to the private R2 bucket.

## Wrangler

Run Wrangler from the repository root:

```sh
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc --dry-run
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc
```

The Worker route is `tunnel.greginthecloud.com/secure*`. Cloudflare Access is
configured separately to authenticate this path before the Worker runs.

The Worker is deployed with the `FLAGS` binding connected to the private
`workerresponse-flags` R2 bucket. The initial flag set is `PT`, `US`, and `GB`.

## Wrangler Corporate CA Note

On this machine, Wrangler's Node process initially failed during OAuth with a
certificate mismatch caused by the corporate proxy/VPN CA not being in Node's
default trust store. The working commands use the macOS system CA store:

```sh
NODE_USE_SYSTEM_CA=1 NODE_OPTIONS="--use-system-ca" \
  wrangler deploy --config worker/wrangler.jsonc
```

This preserves TLS verification. It does not disable certificate validation.
