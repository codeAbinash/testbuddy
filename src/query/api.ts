import { postApi } from '.'
import { versionName } from '../constants'

export type checkForUpdatesT = {
  updateRequired?: boolean
  critical?: boolean
  latestVersion?: string
  versionCode?: number
  message?: string
}

function verifyOtp(d: { mobile: string; otp: string }) {
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
    stream?: string
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

function notifications() {
  type Notification = {
    _id?: string
    body?: string
    createdAt?: Date
    notificationType?: 'group' | 'general' | 'specific'
    redirectTo?: string
  }
  return postApi<Notification[]>('notifications')
}

function notificationsPage() {
  type Notification = {
    _id?: string
    body?: string
    createdAt?: Date
    notificationType?: 'group' | 'general' | 'specific'
    redirectTo?: string
  }
  return postApi<Notification[]>('page/notifications')
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
    questionType?: string
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
  }

  type Option = {
    option?: string
    content?: string
  }

  return postApi<Test>('test/start', data)
}

const api = {
  startTest,
  updateProfilePic,
  sendEmailOtp,
  updateProfile,
  notificationsPage,
  notifications,
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
}

export default api
