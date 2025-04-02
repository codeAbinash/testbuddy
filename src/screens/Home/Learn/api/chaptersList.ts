import { postApi } from '@query/index'

export type ChaptersListRes = {
  _id: string
  subject: string
  description: string
  questionCount: number
  testCount: number
  icon: string
  stream: string
  permalink: string
  categories: ChaptersCategory[]
}

export type ChaptersCategory = {
  category: string
  icon: string
  chapters: ChapterCategory[]
}

export type ChapterCategory = {
  _id: string
  chapter: string
  icon: string
  topicCount: number
  testCount: number
  readingTime: number
  description: string
  permalink: string
  likesCount: number
}

type ChaptersListReq = {
  stream: 'engineering' | 'medical'
}

export function chaptersList(data: ChaptersListReq) {
  return postApi<ChaptersListRes[]>('chapters', data)
}
