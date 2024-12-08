import './global.css'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Popups } from '@components/Popup'
import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/index'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import Login from '@screens/Auth/Login'
import Register from '@screens/Auth/Register'
import VerifyOtp, { type OtpParamList } from '@screens/Auth/VerifyOtp'
import Sidebar from '@screens/components/Sidebar'
import Home from '@screens/Home'
import Notifications from '@screens/Notifications'
import Search from '@screens/Search'
import Settings from '@screens/Settings'
import Splash from '@screens/Splash'
import Streaks from '@screens/Streaks'
import Test from '@screens/Test'
import Update, { type UpdateParamList } from '@screens/Update'
import { QueryClientProvider } from '@tanstack/react-query'
import { H, W } from '@utils/dimensions'
import { DarkTheme, DefaultTheme } from '@utils/themes'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const IOS_BOTTOM_STYLE: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  gestureResponseDistance: H,
}

const NO_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
}

const SMOOTH_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  gestureResponseDistance: H,
}

const GestureEnabled = { gestureEnabled: true }

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen name='Home' component={Home} />
    </Drawer.Navigator>
  )
}

function DrawerContent({ navigation }: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView>
      <Sidebar navigation={navigation} />
    </DrawerContentScrollView>
  )
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation />
          <Popups />
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

function Navigation(): React.JSX.Element {
  const { colorScheme } = useColorScheme()
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AutoStatusBar scheme={colorScheme} />
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          gestureResponseDistance: W,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
        <Stack.Screen name='HomeDrawer' component={MyDrawer} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Login' component={Login} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Test' component={Test} options={GestureEnabled} />
        <Stack.Screen name='Update' component={Update} />
        <Stack.Screen name='Notifications' component={Notifications} options={GestureEnabled} />
        <Stack.Screen name='Streaks' component={Streaks} options={GestureEnabled} />
        <Stack.Screen name='Search' component={Search} options={GestureEnabled} />
        <Stack.Screen name='Settings' component={Settings} options={GestureEnabled} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export type RootStackParamList = {
  Settings: undefined
  Search: undefined
  Streaks: undefined
  Notifications: undefined
  Update: UpdateParamList
  Test: undefined
  VerifyOtp: OtpParamList
  HomeDrawer: undefined
  Splash: undefined
  Login: undefined
  Register: undefined
}

export default App
