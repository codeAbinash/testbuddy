import { postApi } from '..'

export type College = {
  _id: string
  instituteName: string
  academicProgramName: string
  instituteType: string
  quota: string
  seatType: string
  gender: string
  openingRank: string
  closingRank: string
  year: string
  round: string
  isBlur?: boolean
}

type CollegeResponse = {
  data: College[]
}

export type CounselingRequestData = {
  mainsCRLRank: number
  mainsCategoryRank: number
  advancedCRLRank?: number
  advancedCategoryRank?: number
  homeState: string
  category: string
  quota: string
  pwdCategory: boolean
}

export const counsellingApi = async (data: CounselingRequestData) => {
  return postApi<CollegeResponse>('/jee/counselling/result', data)
}
