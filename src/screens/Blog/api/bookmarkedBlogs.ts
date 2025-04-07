import { postApi } from '@query/index'

export type BookmarkedBlogsRes = {
  _id: string
  blogType: string
  title: string
  tags: string[]
  chapter: string
  isBookmark: boolean
  isLik: boolean
  noOfLikes: number
  noOfViews: number
}

export function bookmarkedBlogs() {
  return postApi<BookmarkedBlogsRes[]>('bookmarks/blogs')
}
