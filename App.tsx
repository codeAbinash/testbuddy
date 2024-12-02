import './src/global.css'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/index'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import Login from '@screens/Auth/Login'
import Register from '@screens/Auth/Register'
import VerifyOtp, { type OtpParamList } from '@screens/Auth/VerifyOtp'
import Home from '@screens/Home'
import Splash from '@screens/Splash'
import { QueryClientProvider } from '@tanstack/react-query'
import { H, W } from '@utils/dimensions'
import { DarkTheme, DefaultTheme } from '@utils/themes'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
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

const { width, height } = Dimensions.get('window')

function App(): React.JSX.Element {
  const { colorScheme } = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ height: height, flex: 1 }}>
          <AutoStatusBar scheme={colorScheme} />
          <Navigation />
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

function Navigation(): React.JSX.Element {
  const { colorScheme } = useColorScheme()
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          gestureResponseDistance: W,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name='Splash' component={Splash} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='VerifyOtp' component={VerifyOtp} initialParams={{} as OtpParamList} />
        <Stack.Screen name='Home' component={Home} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Login' component={Login} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export type RootStackParamList = {
  VerifyOtp: OtpParamList
  Home: undefined
  Splash: undefined
  Login: undefined
  Register: undefined
}

export default App
