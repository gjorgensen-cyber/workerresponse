function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== '/secure' && url.pathname !== '/secure/') {
      return new Response('Not found', { status: 404 });
    }

    if (!ctx.access) {
      return new Response('Access authentication required', { status: 401 });
    }

    const identity = await ctx.access.getIdentity();
    const email = identity?.email ?? 'unknown';
    const timestamp = new Date().toISOString();
    const country = request.cf?.country ?? 'UNKNOWN';
    const countryPath = `/secure/${encodeURIComponent(country)}`;

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

    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=UTF-8' },
    });
  },
};
