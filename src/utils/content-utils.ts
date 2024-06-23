import { getCollection } from 'astro:content'
import type { CollectionEntry, ContentEntryMap,SchemaContext , } from 'astro:content';
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

type Posts = CollectionEntry<'posts'>

type  MyPosts  = Posts & {
  data: CollectionEntry<'posts'>['data'] & {
    nextPosts?: CollectionEntry<'posts'>
    nextTitle?: string;
    prevPosts?: CollectionEntry<'posts'>
    prevTitle?: string;
  }
}

export async function getSortedPosts() {
  const allBlogPosts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const sorted:Array<MyPosts> = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published)
    const dateB = new Date(b.data.published)
    return dateA > dateB ? -1 : 1
  })

  for (let i = 1; i < sorted.length; i++) {
    const nextPosts = sorted[i - 1];
    if (!nextPosts) continue;
    sorted[i].data.nextPosts = nextPosts
    sorted[i].data.nextTitle = nextPosts.data.title
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const prePosts = sorted[i - 1];
    if (!prePosts) continue;
    sorted[i].data.prevPosts =prePosts
    sorted[i].data.prevTitle =prePosts.data.title
  }

  return sorted
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getSortedPosts()
  const tagCounts = allBlogPosts.reduce(
    (acc: { [key: string]: number }, post) => {
      post.data.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    },
    {}
  )

  const tags =  Object.keys(tagCounts).map((tagName) => ({
      name: tagName,
      count: tagCounts[tagName],
    }))
// 按照 count 数量对 tags 从达到小排序
  
  return tags.sort((a, b) => {
    return b.count - a.count
  })
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })
  const count: { [key: string]: number } = {}
  allBlogPosts.map(post => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized)
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1
      return
    }
    count[post.data.category] = count[post.data.category]
      ? count[post.data.category] + 1
      : 1
  })

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  const ret: Category[] = []
  for (const c of lst) {
    ret.push({ name: c, count: count[c] })
  }
  return ret
}
