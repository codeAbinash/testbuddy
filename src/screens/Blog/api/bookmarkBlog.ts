import { postApi } from '@query/index'

type BookmarkBlogReq = {
  blogId: string
  action: 'add' | 'remove'
}

export function bookmarkBlog(data: BookmarkBlogReq) {
  return postApi<{ success: boolean }>('blog/bookmark', data)
}
