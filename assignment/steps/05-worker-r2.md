# Step 5: Worker And Private R2

## Purpose

Use a Worker to return authenticated identity information and use private R2
storage for the country flag asset.

## Planned Worker Behavior

`/secure` returns HTML containing:

```text
${EMAIL} authenticated at ${TIMESTAMP} from ${COUNTRY}
```

The country value is an HTML link to:

```text
/secure/${COUNTRY}
```

`/secure/${COUNTRY}` retrieves the matching flag from the private R2 bucket and
returns it with the correct image content type.

## What We Use

- Wrangler CLI: creates and deploys the Worker.
- Cloudflare Access: authenticates the user.
- Worker request metadata: supplies the request country.
- R2 binding: lets the Worker read the flag without making the bucket public.

Worker code and its Wrangler configuration will be added after the origin,
Tunnel, and Access path are working.
