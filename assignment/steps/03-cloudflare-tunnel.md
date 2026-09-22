# Step 3: Cloudflare Tunnel

## Purpose

Provide a private path from Cloudflare to the Fly.io origin without requiring
the origin to accept public inbound connections.

## Planned Architecture

```text
Cloudflare
  -> Cloudflare Tunnel
  -> cloudflared Fly.io app
  -> Fly private network
  -> gregjorgensen-httpbin.internal:8080
```

The Tunnel connector will be a separate Fly.io app. The HTTPBin app and the
connector remain separate containers but can communicate over Fly's private
network.

## Planned Work

1. Build a minimal `cloudflared` Fly.io app.
2. Create a named Cloudflare Tunnel.
3. Store the Tunnel token as a Fly secret.
4. Route `tunnel.greginthecloud.com` to the Tunnel.
5. Configure the connector to reach HTTPBin over Fly private networking.
6. Remove or restrict the public origin path after the direct TLS evidence is
   captured.

The private-network target must not be `localhost`; `localhost` would refer to
the Tunnel container itself.
