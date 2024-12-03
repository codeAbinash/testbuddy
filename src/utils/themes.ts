import { Theme, DefaultTheme as Default, DarkTheme as Dark } from '@react-navigation/native'

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    ...Dark.colors,
    background: '#000',
  },
  fonts: Default.fonts,
}
export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    ...Default.colors,
    background: '#fff',
  },
  fonts: Default.fonts,
}
