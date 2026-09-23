// Escape dynamic values before placing them into HTML.
function escapeHtml(value) {
  // Convert the value to text and replace HTML-significant characters.
  return String(value).replace(/[&<>'"]/g, (character) => ({
    // Escape ampersands first so generated entities remain valid.
    '&': '&amp;',
    // Prevent a value from creating an HTML element.
    '<': '&lt;',
    // Prevent a value from closing or creating an HTML element.
    '>': '&gt;',
    // Prevent a value from creating an HTML attribute boundary.
    "'": '&#39;',
    // Prevent a value from creating an HTML attribute boundary.
    '"': '&quot;',
    // Return the escaped replacement for the current character.
  })[character]);
}

// Export the module Worker so Wrangler can deploy this handler.
export default {
  // Handle every request routed to the Worker.
  async fetch(request, env, ctx) {
    // Parse the URL so routing decisions use the request path only.
    const url = new URL(request.url);

    // Require Access authentication for both /secure and /secure/<country>.
    if (!ctx.access) {
      return new Response('Access authentication required', { status: 401 });
    }

    // Match a two-letter country path such as /secure/PT.
    const countryMatch = url.pathname.match(/^\/secure\/([A-Za-z]{2})\/?$/);

    // Serve a private R2 flag when the request targets a country path.
    if (countryMatch) {
      // Normalize the URL country code before constructing the object key.
      const country = countryMatch[1].toUpperCase();
      // Read the matching SVG through the private R2 binding.
      const object = await env.FLAGS.get(`flags/${country}.svg`);

      // Return a clear missing-object response instead of an empty image.
      if (!object) {
        return new Response('Flag not found', { status: 404 });
      }

      // Stream the private R2 object back with its image content type.
      return new Response(object.body, {
        headers: {
          // Allow short private browser caching without making the object public.
          'cache-control': 'private, max-age=300',
          // Preserve R2 metadata and use SVG as the safe fallback type.
          'content-type': object.httpMetadata?.contentType ?? 'image/svg+xml',
        },
      });
    }

    // Only the identity page belongs to the non-country secure path.
    if (url.pathname !== '/secure' && url.pathname !== '/secure/') {
      return new Response('Not found', { status: 404 });
    }

    // Read the verified identity supplied by the Access-integrated runtime.
    const identity = await ctx.access.getIdentity();
    // Use the authenticated email as the user-facing identity value.
    const email = identity?.email ?? 'unknown';
    // Generate the response timestamp at the Worker edge.
    const timestamp = new Date().toISOString();
    // Read Cloudflare's two-letter country metadata with a fallback.
    const country = request.cf?.country ?? 'UNKNOWN';
    // Link to the Worker route that will retrieve the private flag.
    const countryPath = `/secure/${encodeURIComponent(country)}`;

    // Construct the required HTML response from escaped dynamic values.
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Authenticated request</title>
  </head>
  <body>
    <p>${escapeHtml(email)} authenticated at ${escapeHtml(timestamp)} from
      <a href="${countryPath}">${escapeHtml(country)}</a>
    </p>
  </body>
</html>`;

    // Return HTML rather than JSON because the requirement specifies HTML.
    return new Response(html, {
      // Tell the browser how to interpret the response body.
      headers: { 'content-type': 'text/html; charset=UTF-8' },
    });
  },
};
