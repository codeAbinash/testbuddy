import { Alert, Share } from 'react-native'
import { FadeIn } from 'react-native-reanimated'
import { SCREEN_TRANSITION } from './constants'

export type TimeFormat = '12h' | '24h'

export async function shareText(message: string) {
  try {
    await Share.share({ message })
  } catch (error) {}
}

export function formattedDate(date: Date | null) {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

export function niceDate(date: Date | null) {
  if (!date) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Utils
export const p = console.log
export const e = console.error

// each message string will be displayed on a new line
export const showAlert = (title: string, messages?: string[]) => {
  const message = messages?.reduce((acc, s) => (s.length > 0 ? `${acc}\n${s}` : acc), '')
  Alert.alert(title, message, [{ text: 'OK' }])
}

export const prettyJSON = (obj: any) => JSON.stringify(obj, null, 2)

export function blank_fn() {}

export function greetingByTime() {
  const now = new Date()
  const hour = now.getHours()
  if (hour >= 0 && hour < 4) return 'Good Night'
  if (hour >= 4 && hour < 12) return 'Good Morning'
  if (hour >= 12 && hour < 18) return 'Good Afternoon'
  if (hour >= 18 && hour < 24) return 'Good Evening'
  return 'Hello'
}

export function getLocalDate() {
  return new Date().toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

export function toLocalDateString(date: Date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function getS(data: any) {
  return data > 1 ? 's' : ''
}

export function screenDelay(fn: () => void, ms: number = SCREEN_TRANSITION) {
  return setTimeout(fn, ms)
}

/**
 *
 * @param num  number to round
 * @param places  number of decimal places
 * @returns rounded number
 */
function roundToDecimal(num: number, places: number) {
  const factor = Math.pow(10, places)
  return Math.round(num * factor) / factor
}

/**
 *
 * @param ms milliseconds
 * @returns minutes
 */
export const msToMin = (ms: number) => Math.round(ms / 1000 / 60)

/**
 *
 * @returns current timestamp
 */
export function timeStamp() {
  return new Date().getTime()
}

/**
 * Prints the provided arguments to the console. If an argument is an object,
 * it will be stringified with a 2-space indentation for better readability.
 *
 * @param {...any[]} args - The arguments to be printed. Can be of any type.
 */
export function print(...args: any[]) {
  for (const arg of args) console.log(typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)
}

export function getHour(unix: number, unit: TimeFormat) {
  if (unit === '24h') return getTime24(unix)
  return getTime12(unix)
}

export function getHoursMinutes(unix: number, unit: TimeFormat) {
  const date = new Date(unix * 1000)
  let hours: string | number = date.getHours()
  let minutes: string | number = date.getMinutes()

  if (unit === '12h') {
    if (hours > 12) hours = hours - 12
    if (hours === 0) hours = 12
  }

  // if (hours < 10) hours = '0' + hours
  if (minutes < 10) minutes = '0' + minutes
  return `${hours}:${minutes}`
}

function getTime24(unix: number) {
  const date = new Date(unix * 1000)
  let hours: string | number = date.getHours()
  if (hours < 10) hours = '0' + hours
  return `${hours}`
}

function getTime12(unix: number) {
  const date = new Date(unix * 1000)
  let hours: string | number = date.getHours()
  if (hours > 12) hours = hours - 12
  if (hours === 0) hours = 12
  return hours
}

export function getAp(unix: number, unit: TimeFormat) {
  if (unit === '24h') return ''
  const date = new Date(unix * 1000)
  let hours: string | number = date.getHours()
  if (hours >= 12) return 'PM'
  else return 'AM'
}

export function getDay(dt: number) {
  const date = new Date(dt * 1000)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
  })
}

export function delayedFadeAnimationSearch(search: string, i: number) {
  return FadeIn.duration(250).delay(search.trim().length === 0 ? Math.min((i + 1) * 25, 500) : 20)
}

export function delayedFadeAnimation(i: number) {
  return FadeIn.duration(250).delay(Math.min((i + 1) * 25, 500))
}

export const T_5_MIN = 5 * 60 * 1000

/**
 *
 * @param name full name
 * @returns first name
 */
export function getFirstName(name: string | undefined) {
  if (!name) return ''
  return name.split(' ')[0]
}

export function secToMinSec(seconds: number | undefined) {
  if (!seconds) return ''
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}m ${secs}s`
}

export function secToHrMinSec(seconds: number) {
  if (!seconds) return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours}h ${minutes}m ${secs}s`
}

export function timeDiffFromNow(time: number) {
  return Math.floor((new Date().getTime() - time) / 1000)
}
