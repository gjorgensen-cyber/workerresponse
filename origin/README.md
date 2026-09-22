# Origin Services

This directory contains software that runs at the backend origin, before
Cloudflare is introduced.

## HTTPBin

`httpbin/` is the upstream HTTPBin application imported from `psf/httpbin`.
It is a diagnostic HTTP service used here because the assignment permits a
third-party origin application.

The assignment uses this endpoint:

```text
/headers
```

The home page and other HTTPBin endpoints remain available to the origin, but
they are not part of the assignment's tested surface.

The Fly-specific container build is kept separately under `deploy/fly/` so the
upstream application and our deployment instructions are not mixed together.
