import { postApi } from '@query/index'

type BookmarkBlogReq = {
  blogId: string
  bookmark: boolean
}

export function bookmarkBlog(data: BookmarkBlogReq) {
  return postApi<{ success: boolean }>('blog/bookmark', data)
}
