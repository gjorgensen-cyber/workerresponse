# Step 1: Origin On Fly.io

## Purpose

Create the backend that Cloudflare will eventually protect. The origin must
provide an endpoint that returns all HTTP request headers in the response body.

## What We Use

- Fly.io: runs the origin application.
- HTTPBin: an existing HTTP request and response diagnostic service.
- `curl`: sends controlled test requests.

HTTPBin is appropriate here because the assignment permits a third-party
application and its `/headers` endpoint already implements the required
behavior. We do not need to write a second HTTP server for this requirement.

## Required Endpoint

```text
/headers
```

HTTPBin has other diagnostic endpoints, but only `/headers` is part of this
assignment's tested surface. Do not send real cookies, authorization tokens, or
other secrets because the endpoint reflects request headers.

## Deployment Files

- `origin/httpbin/`: imported HTTPBin application source.
- `deploy/fly/Dockerfile`: assignment-specific container build.
- `deploy/fly/fly.toml`: Fly.io app, region, port, and machine settings.
- `origin/httpbin/Dockerfile`: upstream HTTPBin Dockerfile retained unchanged.

The assignment Dockerfile copies only `origin/httpbin/` into the image, installs
HTTPBin with its standalone-service dependencies, and runs Gunicorn on
`0.0.0.0:8080`. Fly's `internal_port` is also 8080, so the Fly proxy and the
container agree on the service port.

## Deployment

Run these commands from the repository root:

```sh
fly auth login
flyctl config validate --config fly.toml
flyctl deploy --remote-only --config fly.toml
```

The app name is defined in `deploy/fly/fly.toml`; it should not be supplied as
an ad-hoc command-line value.

## Direct Test

After deployment, send a synthetic header and inspect the JSON response:

```sh
curl -H 'X-Assignment-Test: origin-direct' \
  https://gregjorgensen-httpbin.fly.dev/headers
```

The response should contain `X-Assignment-Test` and the normal request headers.
This establishes the baseline before Cloudflare is introduced.
