import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from 'App'

export type StackNav = StackNavigationProp<RootStackParamList>
export type NavProps = { navigation: StackNav }
export type DrawerNav = DrawerNavigationProp<RootStackParamList>
export type DrawerProps = { navigation: DrawerNav }

export type Theme = {
  gradient: [string, string]
  content: 'light-content' | 'dark-content' | 'default'
  color: { color: string }
}

export type ColorScheme = 'light' | 'dark' | undefined

export type mode = 'solution' | 'test'

export type NU = null | undefined
