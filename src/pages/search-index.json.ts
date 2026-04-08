import type { APIRoute } from 'astro';
import { formatDate } from '../lib/format';
import { getAllPosts, getPostSortDate, getPostSummary, getTagSlug, stripMarkdown } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();
  const payload = posts.map((post) => ({
    title: post.data.title,
    description: getPostSummary(post),
    content: stripMarkdown(post.body ?? ''),
    tags: post.data.tags.map((tag) => ({ name: tag, slug: getTagSlug(tag) })),
    url: `/posts/${post.id}/`,
    date: formatDate(post.data.date),
    updated: post.data.updated ? formatDate(post.data.updated) : null,
    sortDate: formatDate(getPostSortDate(post))
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
