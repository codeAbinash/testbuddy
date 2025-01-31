import {
  AnalyticsUpIcon,
  AnalyticsUpStrokeRoundedIcon,
  BookOpen01Icon,
  BookOpen01StrokeRoundedIcon,
  Home01Icon,
  Home01StrokeRoundedIcon,
  LicenseDraftIcon,
  LicenseDraftStrokeRoundedIcon,
  UserIcon,
  UserStrokeRoundedIcon,
} from '@assets/icons/icons'
import { PaddingBottom } from '@components/SafePadding'
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { SemiBold } from '@utils/fonts'
import type { DrawerProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import React, { type ReactNode } from 'react'
import { TouchableOpacity, View, type ColorSchemeName } from 'react-native'
import colors from 'tailwindcss/colors'
import HomeScreen from './HomeScreen'
import TopArea from './components/TopArea'

const Tab = createBottomTabNavigator()

function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <TabBar
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
    />
  )
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colorScheme } = useColorScheme()
  return (
    <View className='bg-white dark:bg-zinc-950'>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]!
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          const color = isFocused ? getFocusedColor(colorScheme) : getColor(colorScheme)

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.6}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              className='flex items-center justify-center p-1'
              style={{ flex: 1, paddingTop: 13.5, paddingBottom: 8 }}
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color, size: 23 })}
              <SemiBold style={{ color, marginTop: 3.5, fontSize: 8.5 }}>{label as ReactNode}</SemiBold>
            </TouchableOpacity>
          )
        })}
      </View>
      <PaddingBottom />
    </View>
  )
}

function getFocusedColor(theme: ColorSchemeName) {
  return theme === 'dark' ? colors.zinc[200] : colors.zinc[800]
}

function getColor(theme: ColorSchemeName) {
  return theme === 'dark' ? colors.zinc[400] : colors.zinc[600]
}

const screens = [
  { name: 'HomeScreen', label: 'Home', focusedIcon: Home01Icon, defaultIcon: Home01StrokeRoundedIcon },
  { name: 'Learn', label: 'Learn', focusedIcon: BookOpen01Icon, defaultIcon: BookOpen01StrokeRoundedIcon },
  { name: 'Tests', label: 'Tests', focusedIcon: LicenseDraftIcon, defaultIcon: LicenseDraftStrokeRoundedIcon },
  { name: 'Analyse', label: 'Analyse', focusedIcon: AnalyticsUpIcon, defaultIcon: AnalyticsUpStrokeRoundedIcon },
  { name: 'Profile', label: 'Profile', focusedIcon: UserIcon, defaultIcon: UserStrokeRoundedIcon },
]

export default function Home({ navigation }: DrawerProps) {
  return (
    <>
      <TopArea navigation={navigation} />
      <Tab.Navigator tabBar={BottomTabBar} screenOptions={{ animation: 'shift' }}>
        {screens.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={HomeScreen}
            options={{
              tabBarLabel: screen.label,
              headerShown: false,
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: (props) => (
                <TabIcon {...props} focusedIcon={screen.focusedIcon} defaultIcon={screen.defaultIcon} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}

type TabIconT = {
  focused: boolean
  color: string
  size: number
  focusedIcon: React.ComponentType<any>
  defaultIcon: React.ComponentType<any>
}

function TabIcon({ focused, color, size, focusedIcon: FocusedIcon, defaultIcon: DefaultIcon }: TabIconT) {
  return focused ? (
    <FocusedIcon height={size} width={size} color={color} />
  ) : (
    <DefaultIcon height={size} width={size} color={color} />
  )
}
