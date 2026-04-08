import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;
const DEFAULT_SUMMARY_LENGTH = 120;

export interface TagArchive {
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

export function getPostSortDate(post: PostEntry) {
  return post.data.updated && post.data.updated > post.data.date ? post.data.updated : post.data.date;
}

export function sortPosts(posts: PostEntry[]) {
  return posts.toSorted((left, right) => getPostSortDate(right).getTime() - getPostSortDate(left).getTime());
}

export async function getPostsByTag(tagName: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tagName));
}

export async function getTagsWithPosts() {
  const posts = await getAllPosts();
  const buckets = new Map<string, PostEntry[]>();

  for (const post of posts) {
    for (const tag of new Set(post.data.tags)) {
      const bucket = buckets.get(tag) ?? [];
      bucket.push(post);
      buckets.set(tag, bucket);
    }
  }

  return [...buckets.entries()]
    .map(([name, tagPosts]) => ({
      name,
      slug: getTagSlug(name),
      posts: sortPosts(tagPosts),
      count: tagPosts.length,
      latestDate: getPostSortDate(sortPosts(tagPosts)[0])
    }))
    .toSorted(
      (left, right) =>
        right.latestDate.getTime() - left.latestDate.getTime() ||
        left.name.localeCompare(right.name, 'zh-CN')
    );
}

export function getTagSlug(tag: string) {
  const normalized = tag
    .trim()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-');

  return normalized || 'untagged';
}

export function getTagSearchUrl(tag: string) {
  return `/search?q=${encodeURIComponent(`#${tag} `)}`;
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
