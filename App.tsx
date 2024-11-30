import './src/global.css'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Press from '@components/Press'
import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import { H, W } from '@utils/dimensions'
import { SemiBold } from '@utils/fonts'
import { DarkTheme, DefaultTheme } from '@utils/themes'
import React from 'react'
import { Dimensions, SafeAreaView, StatusBar, useColorScheme, View } from 'react-native'
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

type RootStackParamList = {
  Home: undefined
}

const GestureEnabled = { gestureEnabled: true }

const Stack = createStackNavigator<RootStackParamList>()

const { width, height } = Dimensions.get('window')

function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <Press>
        <SemiBold className='text-4xl text-gray-800 active:text-lime-500 dark:text-white dark:active:text-red-500'>
          Testbuddy
        </SemiBold>
      </Press>
    </View>
  )
}

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
        <Stack.Screen name='Home' component={HomeScreen} options={IOS_BOTTOM_STYLE} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
