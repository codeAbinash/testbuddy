import { postApi } from '..'

export type College = {
  _id: string
  instituteName?: string
  academicProgramName?: string
  instituteType?: string
  quota?: string
  seatType?: string
  gender?: string
  openingRank?: string
  closingRank?: string
  year?: string
  round?: string
  isBlur?: boolean
  position?: 'self' | 'previous' | 'next'
}

type CollegeResponse = {
  data: College[]
  editAllowed: boolean
  rankIndex: number
  subscribed: boolean
  userDetails: {
    _id: string
    gender: string
    name: string
  }
}

export const counsellingApi = async () => {
  return postApi<CollegeResponse>('/jee/counselling/result')
}
