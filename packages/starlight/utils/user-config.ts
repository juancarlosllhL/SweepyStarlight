import { z } from 'astro/zod';
import { ComponentConfigSchema } from '../schemas/components';
import { FaviconSchema } from '../schemas/favicon';
import { HeadConfigSchema } from '../schemas/head';
import { LogoConfigSchema } from '../schemas/logo';
import { SidebarItemSchema } from '../schemas/sidebar';
import { SocialLinksSchema } from '../schemas/social';
import { TableOfContentsSchema } from '../schemas/tableOfContents';


const UserConfigSchema = z.object({
	/** Title for your website. Will be used in metadata and as browser tab title. */
	title: z
		.string()
		.describe('Title for your website. Will be used in metadata and as browser tab title.'),

	/** Description metadata for your website. Can be used in page metadata. */
	description: z
		.string()
		.optional()
		.describe('Description metadata for your website. Can be used in page metadata.'),

	/** Set a logo image to show in the navigation bar alongside or instead of the site title. */
	logo: LogoConfigSchema(),

	/**
	 * Optional details about the social media accounts for this site.
	 *
	 * @example
	 * social: {
	 *   codeberg: 'https://codeberg.org/knut/examples',
	 *   discord: 'https://astro.build/chat',
	 *   github: 'https://github.com/withastro/starlight',
	 *   gitlab: 'https://gitlab.com/delucis',
	 *   linkedin: 'https://www.linkedin.com/company/astroinc',
	 *   mastodon: 'https://m.webtoo.ls/@astro',
	 *   threads: 'https://www.threads.net/@nmoodev',
	 *   twitch: 'https://www.twitch.tv/bholmesdev',
	 *   twitter: 'https://twitter.com/astrodotbuild',
	 *   youtube: 'https://youtube.com/@astrodotbuild',
	 * }
	 */
	social: SocialLinksSchema(),

	/** The tagline for your website. */
	tagline: z.string().optional().describe('The tagline for your website.'),

	/** Configure the defaults for the table of contents on each page. */
	tableOfContents: TableOfContentsSchema(),

	/** Enable and configure “Edit this page” links. */
	editLink: z
		.object({
			/** Set the base URL for edit links. The final link will be `baseUrl` + the current page path. */
			baseUrl: z.string().url().optional(),
		})
		.optional()
		.default({}),

	/** Configure your site’s sidebar navigation items. */
	sidebar: SidebarItemSchema.array().optional(),

	/**
	 * Add extra tags to your site’s `<head>`.
	 *
	 * Can also be set for a single page in a page’s frontmatter.
	 *
	 * @example
	 * // Add Fathom analytics to your site
	 * starlight({
	 *  head: [
	 *    {
	 *      tag: 'script',
	 *      attrs: {
	 *        src: 'https://cdn.usefathom.com/script.js',
	 *        'data-site': 'MY-FATHOM-ID',
	 *        defer: true,
	 *      },
	 *    },
	 *  ],
	 * })
	 */
	head: HeadConfigSchema(),

	/**
	 * Provide CSS files to customize the look and feel of your Starlight site.
	 *
	 * Supports local CSS files relative to the root of your project,
	 * e.g. `'/src/custom.css'`, and CSS you installed as an npm
	 * module, e.g. `'@fontsource/roboto'`.
	 *
	 * @example
	 * starlight({
	 *  customCss: ['/src/custom-styles.css', '@fontsource/roboto'],
	 * })
	 */
	customCss: z.string().array().optional().default([]),

	/** Define if the last update date should be visible in the page footer. */
	lastUpdated: z
		.boolean()
		.default(false)
		.describe('Define if the last update date should be visible in the page footer.'),

	/** Define if the previous and next page links should be visible in the page footer. */
	pagination: z
		.boolean()
		.default(true)
		.describe('Define if the previous and next page links should be visible in the page footer.'),

	/** The default favicon for your site which should be a path to an image in the `public/` directory. */
	favicon: FaviconSchema(),

	/** Specify paths to components that should override Starlight’s default components */
	components: ComponentConfigSchema(),

	/** Will be used as title delimiter in the generated `<title>` tag. */
	titleDelimiter: z
		.string()
		.default('|')
		.describe('Will be used as title delimiter in the generated `<title>` tag.'),
});

export const StarlightConfigSchema = UserConfigSchema.strict().transform(
	({...config }) => {
		return {
			...config,
		} as const;
	}
);

export type StarlightConfig = z.infer<typeof StarlightConfigSchema>;
export type StarlightUserConfig = z.input<typeof StarlightConfigSchema>;
