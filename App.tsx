import './src/global.css'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import Login from '@screens/Auth/Login'
import Home from '@screens/Home'
import Splash from '@screens/Splash'
import { H, W } from '@utils/dimensions'
import { DarkTheme, DefaultTheme } from '@utils/themes'
import React from 'react'
import { Dimensions, SafeAreaView, useColorScheme } from 'react-native'
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

export type RootStackParamList = {
  Home: undefined
  Splash: undefined
  Login: undefined
}

const GestureEnabled = { gestureEnabled: true }

const Stack = createStackNavigator<RootStackParamList>()

const { width, height } = Dimensions.get('window')

function App(): React.JSX.Element {
  const scheme = useColorScheme()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ height: height, flex: 1 }}>
        <AutoStatusBar scheme={scheme} />
        <Navigation />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

function Navigation(): React.JSX.Element {
  return (
    <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          gestureResponseDistance: W,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name='Splash' component={Splash} options={NO_ANIMATION} />
        <Stack.Screen name='Home' component={Home} options={NO_ANIMATION} />
        <Stack.Screen name='Login' component={Login} options={NO_ANIMATION} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
