import { Result } from '@screens/Test/Result/types/result'
import timeStore from '@screens/Test/zustand/timeStore'
import type { Stream } from '@utils/types'
import { getApi, postApi } from '..'
import { versionName } from '../../constants'
import { StartReq } from './start'

export type checkForUpdatesT = {
  updateRequired?: boolean
  critical?: boolean
  latestVersion?: string
  versionCode?: number
  message?: string
}

function verifyOtp(d: { mobile: string; otp: string } & StartReq) {
  type VerifyOtpT = {
    verified?: boolean
    newUser?: boolean
    user?: {
      _id?: string
      mobile?: string
      emailVerified?: boolean
      profilePic?: string
      name?: string
      stream?: string
      std?: string
    }
    token?: string
  }
  return postApi<VerifyOtpT>('auth/verifyotp', d)
}

function profile() {
  type Profile = {
    _id?: string
    mobile?: string
    emailVerified?: boolean
    profilePic?: string
    name?: string
    stream?: Stream
    std?: string
    newUser?: boolean
    email?: string
    state?: string
    city?: string
    birthday?: string
    bio?: string
  }
  return postApi<Profile>('profile')
}

function homeScreen() {
  return postApi('page/home')
}

function updateProfile(data: {
  name?: string
  gender?: string
  std?: string
  email?: string
  bio?: string
  stream?: string
  referralKey?: string
  birthday?: string
  state?: string
  city?: string
}) {
  type UpdateProfile = {
    name?: string
    stream?: string
    std?: string
    email?: string
    emailVerified?: boolean
    primary?: string
    profilePic?: string
    gender?: string
  }
  return postApi<UpdateProfile>('updateprofile', data)
}

function sendEmailOtp(data: { email: string }) {
  return postApi('authchange/sendotp', data)
}

function updateProfilePic(data: FormData) {
  return postApi('profilepic', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

function startTest(data: { testId: string }) {
  type Test = {
    completed?: boolean
    status?: string
    test?: TestClass
    testSeriesId?: string
    resumeEnabled?: boolean
    currQuestion?: string
    totalTimeCompleted?: number
    totalTimeLeft?: number
    result?: Result
  }

  type TestClass = {
    _id?: string
    exam?: string
    testTitle?: string
    testName?: string
    testDescription?: string
    qCount?: number
    attemptTime?: number
    maxMarks?: number
    subjects?: string[]
    language?: string
    instructions?: string
    sectionPartition?: boolean
    sections?: Section[]
  }

  type Section = {
    qCount?: number
    questions?: Question[]
    subject?: string
    _id?: string
  }

  type Question = {
    _id?: string
    questionKey?: string
    language?: string
    questionType?: 'mcq' | 'numerical' | 'multi-correct'
    section?: string
    questionContent?: string
    options?: Option[]
    marks?: number
    negMarks?: number
    isPartialMarks?: boolean
    subject?: string
    paperTitle?: string
    questionId?: string
    marked?: boolean
    visited?: boolean
    totalTimeSpent?: number
    isBookMarked?: boolean
    markedAnswer?: string
    correctOptions?: string[]
    answerExplanation?: string
    isCorrect?: boolean
    answer?: string
  }

  type Option = {
    option?: string
    content?: string
  }

  return postApi<Test>('test/start', data)
}

export type UpdateTestT = {
  testSeriesId: string
  resData: {
    question: string
    action: 'answer-update' | 'time-update' | 'submit-test' | 'question-change'
    time: number
    marked: boolean
    nextQuestion: string
    markedAnswer?: string
    isBookMarked?: boolean
  }[]
}

function updateTest(data: UpdateTestT) {
  const now = new Date().getTime()
  timeStore.getState().setLastApiCallTime(now)
  return postApi('test/update', data)
}

export type ProgramList = {
  examTitle?: string
  examName?: string
  logo?: string
  programs?: Program[]
}

type Program = {
  _id?: string
  title?: string
}
function programList(data: { stream: 'engineering' | 'medical' }) {
  return postApi<ProgramList[]>('tests', data)
}

function testList(programId: string) {
  type TestList = {
    programId: string
    programTitle: string
    examName: string
    testCombinations: TestCombinations
    status: string
    tests: Test[]
  }

  type TestCombinations = {
    partTests: number
    unitTests: number
    FullTests: number
  }

  type Test = {
    testId: string
    testTitle: string
    programName: string
    testAbr: string
    testDescription: string
    syllabus: string
    qCount: number
    maxMarks: number
    attemptTime: number
    subjects: string[]
    attemptsCount: number
    language: string
    status: 'inactive' | 'locked' | 'unlocked' | 'in-progress' | 'completed'
    totalTimeCompleted: number
  }
  return postApi<TestList[]>('tests/details', { programId })
}

export type Blog = {
  organization: {
    sameAs: any[]
  }
  blogImages: any[]
  _id: string
  blogType: string
  title: string
  description: string
  blogContent: string
  tags: string[]
  category: string
  readTime: string
  subject: string
  chapter: string
  postedBy: {
    _id: string
    name: string
  }
  isBookmark: boolean
  isLike: boolean
  relatedBlogs: any[]
  status: string
  createdAt: Date
  updatedAt: Date
  noOfLikes: number
  noOfViews: number
}

function testBlog() {
  return getApi<Blog>('test/blog')
}

export interface Blogs {
  totalPages: number
  totalBlogs: number
  blogs: Blog[]
}

function blogs() {
  return postApi<Blogs>('blogs')
}

function blog(id: string) {
  return getApi<Blog>(`blog/${id}`)
}

const api = {
  blog,
  blogs,
  testBlog,
  testList,
  programList,
  startTest,
  updateProfilePic,
  sendEmailOtp,
  updateProfile,
  verifyOtp,
  profile,
  homeScreen,
  sendOtp: (d: { mobile: string }) =>
    postApi<{
      newUser?: boolean
      otpSent?: boolean
    }>('auth/otp', d),
  checkForUpdates: () =>
    postApi<checkForUpdatesT>('app/version', {
      platform: 'android',
      versionName: versionName,
    }),
  updateTest,
}

export default api
