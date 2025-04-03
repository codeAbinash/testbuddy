import { postApi } from '@query/index'
import { NotificationsRes } from './types'

export function getAllNotifications() {
  return postApi<NotificationsRes>('notifications/all')
}
