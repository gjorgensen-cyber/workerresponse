# Fly Build Files

This directory contains the Dockerfile used to build the origin image.

The Fly application configuration is intentionally at the repository root as
`fly.toml`. Fly uses the repository root as the build context, allowing the
Dockerfile to copy `origin/httpbin/` without duplicating or hiding the source.
