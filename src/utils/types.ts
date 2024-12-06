import { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from 'App'

export type StackNav = StackNavigationProp<RootStackParamList>
export type NavProp = { navigation: StackNav }

export type Theme = {
  gradient: [string, string]
  content: 'light-content' | 'dark-content' | 'default'
  color: { color: string }
}

export type ColorScheme = 'light' | 'dark' | undefined

export type NU = null | undefined
