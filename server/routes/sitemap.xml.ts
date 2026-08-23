import { eventHandler, getRequestHost, getRequestProtocol, setHeader } from "h3";

export default eventHandler((event) => {
  const config = useRuntimeConfig(event);
  const configuredSiteUrl = config.public.siteUrl as string | undefined;
  const requestBaseUrl = `${getRequestProtocol(event)}://${getRequestHost(event)}`;
  const siteUrl = (configuredSiteUrl || requestBaseUrl).replace(/\/$/, "");
  const lastmod = new Date().toISOString().split("T")[0];

  setHeader(event, "content-type", "application/xml; charset=utf-8");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
  <url>
    <loc>${siteUrl}/en</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
</urlset>
`;
});
