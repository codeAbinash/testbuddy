import { Lottie } from '@components/Lottie'
import './global.css'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Animations from '@assets/animations/animations'
import { Popups } from '@components/Popup'
import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/query'
import { useNetInfo } from '@react-native-community/netinfo'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import Login from '@screens/Auth/Login'
import Register, { type RegisterParamList } from '@screens/Auth/Register'
import VerifyEmail, { VerifyEmailParamList } from '@screens/Auth/VerifyEmail'
import VerifyOtp, { type OtpParamList } from '@screens/Auth/VerifyOtp'
import Blog, { type BlogParamList } from '@screens/Blog/Blog'
import Blogs from '@screens/Blog/Blogs'
import OnThisPage, { OnThisPageParamList } from '@screens/Blog/OnThisPage'
import Sidebar from '@screens/components/Sidebar'
import Example from '@screens/Example'
import Home from '@screens/Home/Home'
import HomeProfile from '@screens/Home/HomeProfile/HomeProfile'
import type { TestListParamList } from '@screens/Home/Tests/TestList'
import TestList from '@screens/Home/Tests/TestList'
import Tests from '@screens/Home/Tests/Tests'
import Notifications from '@screens/Notifications'
import Premium, { PremiumParamList } from '@screens/Premium/Premium'
import PricingDetails, { PricingDetailsParamList } from '@screens/Premium/PricingDetails'
import VerifyPayment, { VerifyPaymentParamList } from '@screens/Premium/VerifyPayment'
import ChangeStream from '@screens/Profile/ChangeStream'
import EditProfile from '@screens/Profile/EditProfile'
import MyRewards from '@screens/Rewards/MyRewards'
import Refer from '@screens/Rewards/Refer'
import Search from '@screens/Search'
import Settings from '@screens/Settings'
import Splash from '@screens/Splash'
import Streaks from '@screens/Streaks'
import Instructions from '@screens/Test/Instructions'
import Analysis, { AnalysisParams } from '@screens/Test/Result/Analysis'
import Solution, { SolutionParamList } from '@screens/Test/Result/Solution'
import Test, { TestParamList } from '@screens/Test/Test'
import Update, { type UpdateParamList } from '@screens/Update'
import { QueryClientProvider } from '@tanstack/react-query'
import { H, W } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import { DarkTheme, DefaultTheme } from '@utils/themes'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Counselling from '@screens/Counselling/Counselling'

const IOS_BOTTOM_STYLE: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  gestureResponseDistance: H,
}

// eslint-disable-next-line
const NO_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
}

const SMOOTH_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  gestureResponseDistance: H,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <DrawerContentScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
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

function NoInternet() {
  return (
    <View
      className='bg-screen absolute top-0 z-10 flex-1 items-center justify-center px-5 pb-10'
      style={{ height: H, width: W }}
    >
      <Lottie source={Animations.astronaut} style={{ width: W * 0.8, height: W * 0.8 }} />
      <SemiBold className='text mt-5 text-center text-xl opacity-90'>No Internet Connection</SemiBold>
      <Medium className='text text-center opacity-70'>Please check your internet connection</Medium>
    </View>
  )
}

function Navigation(): React.JSX.Element {
  const { colorScheme } = useColorScheme()
  const netInfo = useNetInfo()

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AutoStatusBar scheme={colorScheme} />
      {!netInfo.isConnected ? <NoInternet /> : null}
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
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='HomeDrawer' component={MyDrawer} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Login' component={Login} options={SMOOTH_ANIMATION} />
        <Stack.Screen name='Example' component={Example} />
        <Stack.Screen name='Test' component={Test} />
        <Stack.Screen name='Update' component={Update} />
        <Stack.Screen name='Notifications' component={Notifications} />
        <Stack.Screen name='Streaks' component={Streaks} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
        <Stack.Screen name='ChangeStream' component={ChangeStream} options={IOS_BOTTOM_STYLE} />
        <Stack.Screen name='Refer' component={Refer} />
        <Stack.Screen name='MyRewards' component={MyRewards} />
        <Stack.Screen name='Instructions' component={Instructions} options={IOS_BOTTOM_STYLE} />
        <Stack.Screen
          name='Analysis'
          component={Analysis}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            gestureDirection: 'vertical',
            gestureEnabled: true,
            gestureResponseDistance: H,
          }}
        />
        <Stack.Screen name='Solution' component={Solution} />
        <Stack.Screen name='Tests' component={Tests} />
        <Stack.Screen name='TestList' component={TestList} />
        <Stack.Screen name='HomeProfile' component={HomeProfile} />
        <Stack.Screen name='Premium' component={Premium} options={IOS_BOTTOM_STYLE} />
        <Stack.Screen name='Blog' component={Blog} />
        <Stack.Screen name='Blogs' component={Blogs} />
        <Stack.Screen name='OnThisPage' component={OnThisPage} options={IOS_BOTTOM_STYLE} />
        <Stack.Screen name='PricingDetails' component={PricingDetails} options={IOS_BOTTOM_STYLE} />
        <Stack.Screen name='VerifyPayment' component={VerifyPayment} />
        <Stack.Screen name='Counselling' component={Counselling} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  Counselling: undefined
  VerifyPayment: VerifyPaymentParamList
  PricingDetails: PricingDetailsParamList
  OnThisPage: OnThisPageParamList
  Blogs: undefined
  Blog: BlogParamList
  Premium: PremiumParamList
  HomeProfile: undefined
  TestList: TestListParamList
  Tests: undefined
  Solution: SolutionParamList
  Analysis: AnalysisParams
  Test: TestParamList
  Instructions: undefined
  MyRewards: undefined
  Refer: undefined
  ChangeStream: undefined
  EditProfile: undefined
  Settings: undefined
  Search: undefined
  Streaks: undefined
  Notifications: undefined
  Update: UpdateParamList
  Example: undefined
  VerifyEmail: VerifyEmailParamList
  VerifyOtp: OtpParamList
  HomeDrawer: undefined
  Splash: undefined
  Login: undefined
  Register: RegisterParamList
}

export default App
