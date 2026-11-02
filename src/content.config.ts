import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 每篇文章一个文件夹：src/content/posts/<slug>/index.md，图片放在同一个文件夹里
const posts = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      date: z.coerce.date(),
      summary: z.string().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
