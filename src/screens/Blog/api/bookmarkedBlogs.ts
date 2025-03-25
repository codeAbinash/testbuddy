import { postApi } from '@query/index'

export interface BookmarkedBlogs {
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
  return postApi<BookmarkedBlogs[]>('bookmarks/blogs')
}
