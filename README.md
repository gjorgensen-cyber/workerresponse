# Worker Response Assignment

This repository contains the implementation for the Cloudflare Application
Services assignment.

## Repository Map

- `origin/`: backend services that run before Cloudflare.
- `origin/httpbin/`: imported HTTPBin source used for the origin.
- `fly.toml`: Fly.io application configuration.
- `deploy/fly/`: Fly.io-specific Dockerfile.
- `assignment/`: chronological implementation plan and testing evidence.
- `tools/`: explanation of each CLI and platform used.

## Current Origin

HTTPBin is used as the origin because the assignment permits a third-party
application. Its `/headers` endpoint returns the headers received by the
origin as JSON.

The origin is not deployed yet. The Fly application resource exists, but the
first remote image builds timed out before an image or Fly Machine was created.

## Start Here

Read [Step 1: Origin on Fly.io](assignment/steps/01-origin-fly-httpbin.md),
then review [the repository tool guide](tools/README.md).
