import { postApi } from '..'

type StartRes = {
  loggedIn: boolean
  jeeCounsellingData: boolean
  premiumSubscription: PremiumSubscription
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

type PremiumSubscription = {
  isPremium: boolean
  package: string
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

type StartReq = {
  lat: string
  lng: string
  deviceName: string
  macAddress: string
}

export default function startApi(data?: StartReq) {
  return postApi<StartRes>('start', data)
}
