# Assignment Guide

This directory contains the implementation plan and evidence notes for the
Cloudflare Application Services assignment.

The HTTPBin origin is maintained separately in the `httpbin-origin` project.
This repository is reserved for the Cloudflare Worker and assignment notes.

## Steps

1. [Origin on Fly.io](steps/01-origin-fly-httpbin.md)
2. [Cloudflare proxy and origin TLS](steps/02-cloudflare-proxy-tls.md)
3. [Cloudflare Tunnel](steps/03-cloudflare-tunnel.md)
4. [Zero Trust Access](steps/04-zero-trust-access.md)
5. [Worker and private R2](steps/05-worker-r2.md)
6. [Testing and evidence](steps/06-testing-evidence.md)

## Resource Naming

- Fly.io origin app: `httpbin-origin`
- Cloudflare zone: `greginthecloud.com`
- Tunnel hostname: `tunnel.greginthecloud.com`
- Required origin endpoint: `/headers`
- Protected Worker paths: `/secure` and `/secure/${COUNTRY}`

## Current Status

- HTTPBin source and Fly.io deployment files moved to the separate
  `httpbin-origin` project.
- All previously created Fly apps were deleted.
- No Cloudflare resources have been changed.
