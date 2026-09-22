# Step 4: Zero Trust Access

## Purpose

Require authentication before users can reach the protected application path.

## Identity Provider

This assignment uses Cloudflare as the Access identity provider. Access remains
the policy enforcement layer; Cloudflare authenticates the user and supplies
identity claims for policy evaluation.

This avoids an additional Google, GitHub, Okta, or SAML/OIDC application while
demonstrating a current Cloudflare identity-provider capability.

## Planned Policy

- Application: `tunnel.greginthecloud.com/secure`
- Allow Greg's Cloudflare identity.
- Allow users whose email ends in `@cloudflare.com`.
- Deny users who match neither condition.
- Leave unrelated existing Access applications unchanged.

## Tests

- Unauthenticated request is redirected to Access login.
- Greg is allowed after authenticating.
- An allowed `@cloudflare.com` identity is allowed.
- An unauthorized identity is denied.
