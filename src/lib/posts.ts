import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** 已发布的文章，按日期从新到旧。开发模式下草稿也显示。 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getAllTags(posts: Post[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))];
}
