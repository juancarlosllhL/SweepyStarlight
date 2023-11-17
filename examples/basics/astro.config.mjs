import { defineConfig } from 'astro/config';
import starlight from '@lansweeper/sweepy-starlight';

// plugins
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [remarkToc],
	},
	integrations: [
		starlight({
			title: 'Lansweeper docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			editLink: {
				baseUrl: 'https://github.com/withastro/starlight/edit/main/docs/',
			},
			sidebar: [
				{
					label: 'Documentation framework',
					autogenerate: { directory: 'features' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
