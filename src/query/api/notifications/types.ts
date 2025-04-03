export type NotificationsRes = {
  success: boolean
  data: Notification[]
}

export type Notification = {
  _id: string
  notificationType: 'group' | 'general' | 'specific'
  body: string
  redirectTo: string
  createdAt: Date
}
