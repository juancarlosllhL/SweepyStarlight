import type { GetStaticPathsItem } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import { validateLogoImports } from './validateLogoImports';

// Validate any user-provided logos imported correctly.
// We do this here so all pages trigger it and at the top level so it runs just once.
validateLogoImports();

export type StarlightDocsEntry = Omit<CollectionEntry<'docs'>, 'slug'> & {
	slug: string;
};

export interface Route {
	/** Content collection entry for the current page. Includes frontmatter at `data`. */
	entry: StarlightDocsEntry;
	/** The slug, a.k.a. permalink, for this page. */
	slug: string;
	/** The unique ID for this page. */
	id: string;
	/** True if this page is untranslated in the current language and using fallback content from the default locale. */
	isFallback?: true;
	[key: string]: unknown;
}

interface Path extends GetStaticPathsItem {
	params: { slug: string | undefined };
	props: Route;
}

/**
 * Astro is inconsistent in its `index.md` slug generation. In most cases,
 * `index` is stripped, but in the root of a collection, we get a slug of `index`.
 * We map that to an empty string for consistent behaviour.
 */
const normalizeIndexSlug = (slug: string) => (slug === 'index' ? '' : slug);

/** All entries in the docs content collection. */
const docs: StarlightDocsEntry[] = ((await getCollection('docs')) ?? []).map(
	({ slug, ...entry }) => ({
		...entry,
		slug: normalizeIndexSlug(slug),
	})
);

function getRoutes(): Route[] {
	const routes: Route[] = docs.map((entry) => ({
		entry,
		slug: entry.slug,
		id: entry.id,
		entryMeta: entry.slug,
	}));

	return routes;
}
export const routes = getRoutes();

function getPaths(): Path[] {
	return routes.map((route) => ({
		params: { slug: route.slug },
		props: route,
	}));
}
export const paths = getPaths();
