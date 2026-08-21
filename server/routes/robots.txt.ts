import { eventHandler, getRequestHost, getRequestProtocol, setHeader } from "h3";

export default eventHandler((event) => {
  const config = useRuntimeConfig(event);
  const configuredSiteUrl = config.public.siteUrl as string | undefined;
  const requestBaseUrl = `${getRequestProtocol(event)}://${getRequestHost(event)}`;
  const siteUrl = (configuredSiteUrl || requestBaseUrl).replace(/\/$/, "");

  setHeader(event, "content-type", "text/plain; charset=utf-8");

  return [
    "User-agent: *",
    "Allow: /",
    "",
    "# Zones techniques à ne pas indexer",
    "Disallow: /api/",
    "Disallow: /_nuxt/",
    "Disallow: /admin/",
    "Disallow: /preview/",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
});
