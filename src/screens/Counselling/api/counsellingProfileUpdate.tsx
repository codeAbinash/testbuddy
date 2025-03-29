import { postApi } from '@query/index'

export type CounsellingProfileUpdateReq = {
  gender: string
  state: string
  category: string
  mainsCRLRank: number
  advancedCRLRank?: number
  mainsCategoryRank: number
  advancedCategoryRank?: number
  pwdCategory: boolean
}

export type CounsellingProfileUpdateRes = {
  subscribed: boolean
  editAllowed: boolean
  userDetails: UserDetails
}

export type UserDetails = {
  _id: string
  advancedCRLRank: number
  advancedCategoryRank: number
  category: string
  gender: string
  mainsCRLRank: number
  mainsCategoryRank: number
  pwdCategory: boolean
  state: string
}

export function counsellingProfileUpdate(data: CounsellingProfileUpdateReq) {
  return postApi<CounsellingProfileUpdateRes>('counselling/profile/update', data)
}
