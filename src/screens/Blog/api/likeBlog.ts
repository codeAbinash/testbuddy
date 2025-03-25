import { postApi } from '@query/index'

type BlogLikeRequest = {
  blogId: string
  like: boolean
}

export function likeBlog(data: BlogLikeRequest) {
  return postApi<{ success: boolean }>('blog/like', data)
}
