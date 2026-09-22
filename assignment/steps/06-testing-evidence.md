# Step 6: Testing And Evidence

Capture evidence at each stage instead of trying to reconstruct it at the end.

## Required Evidence

- Direct Fly.io `/headers` response.
- Cloudflare-proxied origin response.
- `Full (strict)` configuration.
- Tunnel configuration and successful request.
- Access login and allowed/denied results.
- Worker HTML response.
- Country link response and image content type.
- Private R2 bucket configuration.
- Direct-origin bypass attempt after restrictions are applied.

Use synthetic headers and test identities where possible. Do not commit tokens,
cookies, private keys, Tunnel credentials, or other secrets.
