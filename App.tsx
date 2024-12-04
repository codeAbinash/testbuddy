import './src/global.css'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Popups } from '@components/Popup'
import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/index'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import Login from '@screens/Auth/Login'
import Register from '@screens/Auth/Register'
import VerifyOtp, { type OtpParamList } from '@screens/Auth/VerifyOtp'
import Home from '@screens/Home'
import Splash from '@screens/Splash'
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

export const Stack = createStackNavigator<RootStackParamList>()

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
        <Stack.Screen name='Home' component={Home} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Test' component={Test} />
        <Stack.Screen name='Update' component={Update} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export type RootStackParamList = {
  Update: UpdateParamList
  Test: undefined
  VerifyOtp: OtpParamList
  Home: undefined
  Splash: undefined
  Login: undefined
  Register: undefined
}

export default App
