import sitemap, { type SitemapOptions } from '@astrojs/sitemap';
import type { StarlightConfig } from '../types';

/**
 * A wrapped version of the `@astrojs/sitemap` integration configured based
 * on Starlight i18n config.
 */
export function starlightSitemap(_: StarlightConfig) {
	const sitemapConfig: SitemapOptions = {};
	return sitemap(sitemapConfig);
}
