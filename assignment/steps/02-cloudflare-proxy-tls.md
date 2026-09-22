# Step 2: Cloudflare Proxy And Origin TLS

## Purpose

Place the Fly.io origin behind Cloudflare and prove that Cloudflare can make a
strictly validated TLS connection to the origin.

## What We Use

- Cloudflare DNS: maps the chosen hostname to the origin.
- Cloudflare proxy: handles the client-facing request.
- Origin certificate: a certificate not provisioned by Cloudflare.
- SSL/TLS mode `Full (strict)`: validates the origin certificate.

## Planned Work

1. Select a dedicated origin hostname under `greginthecloud.com`.
2. Configure the Fly.io hostname and certificate arrangement.
3. Add the required DNS record.
4. Enable proxying.
5. Set `Full (strict)`.
6. Test `/headers` through Cloudflare and compare the received headers.

This step is separate from Tunnel so the report demonstrates both direct
Cloudflare-to-origin TLS and the later Tunnel path.
