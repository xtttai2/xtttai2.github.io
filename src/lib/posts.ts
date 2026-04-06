import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;
const DEFAULT_SUMMARY_LENGTH = 120;

export interface CategoryArchive {
  name: string;
  slug: string;
  posts: PostEntry[];
  count: number;
  latestDate: Date;
}

export async function getAllPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return sortPosts(posts);
}

export function sortPosts(posts: PostEntry[]) {
  return posts.toSorted((left, right) => right.data.date.getTime() - left.data.date.getTime());
}

export async function getPostsByCategory(categoryName: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === categoryName);
}

export async function getCategoriesWithPosts() {
  const posts = await getAllPosts();
  const buckets = new Map<string, PostEntry[]>();

  for (const post of posts) {
    const bucket = buckets.get(post.data.category) ?? [];
    bucket.push(post);
    buckets.set(post.data.category, bucket);
  }

  return [...buckets.entries()]
    .map(([name, categoryPosts]) => ({
      name,
      slug: getCategorySlug(name),
      posts: sortPosts(categoryPosts),
      count: categoryPosts.length,
      latestDate: sortPosts(categoryPosts)[0].data.date
    }))
    .toSorted(
      (left, right) =>
        right.latestDate.getTime() - left.latestDate.getTime() ||
        left.name.localeCompare(right.name, 'zh-CN')
    );
}

export function getCategorySlug(category: string) {
  const normalized = category
    .trim()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-');

  return normalized || 'uncategorized';
}

export function stripMarkdown(source: string) {
  return source
    .replace(/^---[\s\S]*?---/, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ')
    .replace(/\$([^$\n]+)\$/g, ' $1 ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|=-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function summarizeText(source: string, maxLength = DEFAULT_SUMMARY_LENGTH) {
  const normalized = source.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export function getPostSummary(post: PostEntry, maxLength = DEFAULT_SUMMARY_LENGTH) {
  const manualDescription = post.data.description?.trim();

  if (manualDescription) {
    return manualDescription;
  }

  return summarizeText(stripMarkdown(post.body ?? ''), maxLength);
}
