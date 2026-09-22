# Tools And When They Are Used

## Fly.io CLI

Used in the separate `httpbin-origin` project to create, validate, deploy,
inspect, and test the origin. It will later be used for the `cloudflared`
connector app.

Examples:

```sh
flyctl config validate --config fly.toml
flyctl deploy --remote-only --config fly.toml
flyctl status --app httpbin-origin
```

## `curl`

Used in every testing stage to send controlled HTTP requests and inspect
responses and headers.

## `cloudflared`

Used in Step 3 to run the Cloudflare Tunnel connector. It will be deployed as
its own Fly.io app and will reach HTTPBin over Fly private networking.

## Wrangler

Used in Step 5 to create and deploy the Worker, configure the R2 binding, and
publish the Worker code from this repository.

## Cloudflare Dashboard And MCP

Used for Cloudflare account configuration, read-only inventory, Access, DNS,
Tunnel, Workers, and R2 verification. Changes should be recorded in the
corresponding step README and in the final report.
