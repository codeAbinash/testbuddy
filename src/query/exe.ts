import { secureLs } from '@utils/storage'
import axios from 'axios'

export function setAuthToken() {
  const token = secureLs.getString('token')
  if (token) axios.defaults.headers.common.Authorization = 'Bearer ' + token
}

export default function exe() {
  setAuthToken()
}
