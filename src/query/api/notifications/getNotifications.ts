import { postApi } from '@query/index'
import { NotificationsRes } from './types'

export function getNotifications() {
  return postApi<NotificationsRes>('notifications')
}
