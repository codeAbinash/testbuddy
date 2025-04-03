import { DeviceDetails } from '@utils/utils'
import { postApi } from '..'

export type StartRes = {
  loggedIn: boolean
  jeeCounsellingData: boolean
  premiumSubscription: {
    isPremium: boolean
    package: string
  }
  appVersions: AppVersions
  userDetails: UserDetails
  latestNotifications: LatestNotification[]
}

type AppVersions = {
  iosLatestVersion: string
  iosCriticalVersion: string
  androidLatestVersion: string
  androidCriticalVersion: string
}

type LatestNotification = {
  _id: string
  notificationType: string
  body: string
  redirectTo: string
  createdAt: Date
}

type UserDetails = {
  _id: string
  name: string
  stream: string
  mobile: string
  std: string
  email: string
  emailVerified: boolean
  profilePic: string
  birthday: Date
  city: string
  state: string
}

export type StartReq = DeviceDetails
export default function startApi(data?: StartReq) {
  return postApi<StartRes>('start', data)
}
