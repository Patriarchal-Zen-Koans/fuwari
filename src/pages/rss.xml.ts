import rss from '@astrojs/rss';
import {profileConfig} from '@/config';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: any) {
    const blog = await getCollection('posts');
  return rss({
    title: profileConfig.name,
    description: profileConfig.bio || 'No description',
    site: context.site,
    items: blog.map((post) => ({
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        }),
      })),
    customData: `<language>en-us</language>`,
  });
}