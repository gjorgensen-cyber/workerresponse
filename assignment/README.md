# Assignment Guide

This directory contains the implementation plan and evidence notes for the
Cloudflare Application Services assignment.

The upstream HTTPBin application is under `origin/httpbin/`. Assignment files
are kept separate so it is clear which files belong to HTTPBin and which files
belong to our deployment and Cloudflare configuration.

## Steps

1. [Origin on Fly.io](steps/01-origin-fly-httpbin.md)
2. [Cloudflare proxy and origin TLS](steps/02-cloudflare-proxy-tls.md)
3. [Cloudflare Tunnel](steps/03-cloudflare-tunnel.md)
4. [Zero Trust Access](steps/04-zero-trust-access.md)
5. [Worker and private R2](steps/05-worker-r2.md)
6. [Testing and evidence](steps/06-testing-evidence.md)

## Resource Naming

- Fly.io origin app: `workerresponse`
- Cloudflare zone: `greginthecloud.com`
- Tunnel hostname: `tunnel.greginthecloud.com`
- Required origin endpoint: `/headers`
- Protected Worker paths: `/secure` and `/secure/${COUNTRY}`

## Current Status

- Upstream HTTPBin source imported from `psf/httpbin` at version `0.10.4`.
- Fly.io deployment files added under `deploy/fly/`.
- Fly app created, but the first remote image builds timed out while Fly
  provisioned its builder.
- No application Machine has been deployed yet.
