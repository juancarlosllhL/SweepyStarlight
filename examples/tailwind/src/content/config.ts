import { defineCollection } from 'astro:content';
import { docsSchema } from '@lansweeper/sweepy-starlight/schema';

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
};
