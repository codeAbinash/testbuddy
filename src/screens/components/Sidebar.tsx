import sidebarStore from '@/zustand/sidebarStore'
import {
  AllBookmarkIcon,
  AnalyticsDownIcon,
  AnalyticsUpIcon,
  Book01Icon,
  Book02Icon,
  Book03Icon,
  BookEditIcon,
  Bookmark03Icon,
  BookOpen01Icon,
  BookOpen02Icon,
  Cancel01Icon,
  GiftIcon,
  InformationCircleIcon,
  LicenseDraftIcon,
  LicenseIcon,
  LogoutCircle01Icon,
  Mail02Icon,
  Mortarboard02Icon,
  NewTwitterIcon,
  PolicyIcon,
  Settings03Icon,
  Share02Icon,
  Sun03Icon,
  TelegramIcon as TgIcon,
  Time04Icon
} from '@assets/icons/icons'
import FacebookIcon from '@assets/icons/social/facebook.svg'
import InstagramIcon from '@assets/icons/social/instagram.svg'
import TelegramIcon from '@assets/icons/social/telegram.svg'
import WhatsappIcon from '@assets/icons/social/whatsapp.svg'

import { versionCode, versionName } from '@/constants'
import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Bold, Medium } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Linking, Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import type { SvgProps } from 'react-native-svg'
import colors from 'tailwindcss/colors'
import ListItem, { ListIcon } from './ListItem'
import SmallProfile from './SmallProfile'

type ColorScheme = 'light' | 'dark' | undefined

export default function Sidebar() {
  const isOpen = sidebarStore((state) => state.isOpen)
  const toggle = sidebarStore((state) => state.toggle)
  const { colorScheme } = useColorScheme()
  return (
    <Pressable
      onPress={toggle}
      className='absolute left-0 top-0 z-10 h-full w-full flex-row bg-black/40'
      style={{ opacity: isOpen ? 1 : 0, zIndex: isOpen ? 10 : -1 }}
    >
      <View className='w-[80%] flex-1 bg-white dark:bg-zinc-950'>
        <PaddingTop />
        <ScrollView
          className='flex-1'
          contentContainerClassName='px-4'
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Pressable>
            <SmallProfile colorScheme={colorScheme} />
            <Stream colorScheme={colorScheme} />
            <Tests colorScheme={colorScheme} />
            <MyProgress colorScheme={colorScheme} />
            <Rewards colorScheme={colorScheme} />
            <Settings colorScheme={colorScheme} />
            <AboutUs colorScheme={colorScheme} />
            <End colorScheme={colorScheme} />
          </Pressable>
        </ScrollView>
        <PaddingBottom />
      </View>
      <CloseButton scheme={colorScheme} />
    </Pressable>
  )
}
function CloseButton({ scheme }: { scheme: ColorScheme }) {
  const toggle = sidebarStore((state) => state.toggle)
  return (
    <View className='w-[20%]'>
      <PaddingTop />
      <View className='flex-row items-center justify-center'>
        <Press onPress={toggle} activeScale={0.9}>
          <View className='rounded-full bg-white p-3 dark:bg-zinc-800'>
            <Cancel01Icon height={20} width={20} color={scheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
          </View>
        </Press>
      </View>
    </View>
  )
}

function Stream({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>Stream</Bold>
      <ListItem icon={<ListIcon scheme={s} Icon={Mortarboard02Icon} />} title='Change Stream' subtitle='Engineering' />
    </View>
  )
}

function Tests({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>Tests</Bold>
      <ListItem icon={<ListIcon Icon={LicenseDraftIcon} scheme={s} />} title='JEE Mains PYQs' />
      <ListItem icon={<ListIcon Icon={LicenseDraftIcon} scheme={s} />} title='JEE Advanced PYQs' />
      <ListItem icon={<ListIcon Icon={BookOpen01Icon} scheme={s} />} title='Chapter Wise PYQs' />
      <ListItem icon={<ListIcon Icon={BookOpen02Icon} scheme={s} />} title='Test Series' />
      <ListItem icon={<ListIcon Icon={Book02Icon} scheme={s} />} title='Subject Tests' />
      <ListItem icon={<ListIcon Icon={Book03Icon} scheme={s} />} title='Mocks' />
      <ListItem icon={<ListIcon Icon={Book01Icon} scheme={s} />} title='Other entrance exams' />
    </View>
  )
}

function MyProgress({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>My Progress</Bold>
      <ListItem icon={<ListIcon Icon={Bookmark03Icon} scheme={s} />} title='Bookmarks' />
      <ListItem icon={<ListIcon Icon={BookEditIcon} scheme={s} />} title='Attempted Tests' />
      <ListItem icon={<ListIcon Icon={Time04Icon} scheme={s} />} title='Ongoing Tests' />
      <ListItem icon={<ListIcon Icon={AnalyticsUpIcon} scheme={s} />} title='Analyse' />
      <ListItem icon={<ListIcon Icon={AnalyticsDownIcon} scheme={s} />} title='Weak Topic Analysis' />
      <ListItem icon={<ListIcon Icon={AllBookmarkIcon} scheme={s} />} title='Bookmarked blogs' />
    </View>
  )
}

function Rewards({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>Rewards</Bold>
      <ListItem icon={<ListIcon Icon={Share02Icon} scheme={s} />} title='Refer a friend' />
      <ListItem icon={<ListIcon Icon={GiftIcon} scheme={s} />} title='My Rewards' />
    </View>
  )
}

function Settings({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>Settings</Bold>
      <ListItem icon={<ListIcon Icon={Sun03Icon} scheme={s} />} title='App Theme' />
      <ListItem icon={<ListIcon Icon={Settings03Icon} scheme={s} />} title='Settings' />
    </View>
  )
}

function AboutUs({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>About Us</Bold>
      <ListItem icon={<ListIcon Icon={InformationCircleIcon} scheme={s} />} title='About Us' />
      <ListItem icon={<ListIcon Icon={Mail02Icon} scheme={s} />} title='Contact Us' />
      <ListItem icon={<ListIcon Icon={PolicyIcon} scheme={s} />} title='Privacy Policy' />
      <ListItem icon={<ListIcon Icon={LicenseIcon} scheme={s} />} title='Terms & Conditions' />
      <ListItem icon={<ListIcon Icon={TgIcon} scheme={s} />} title='Join our Telegram community' />
    </View>
  )
}

function End({ colorScheme: s }: { colorScheme: ColorScheme }) {
  return (
    <View className='pb-10'>
      <Bold className='text mt-5 pb-2 text-lg'>Log Out</Bold>
      <ListItem icon={<ListIcon Icon={LogoutCircle01Icon} scheme={s} />} title='Log out' />
      <View>
        <Medium className='text mt-5 pb-2 text-center text-lg'>Follow us on</Medium>
        <View className='mt-3 flex-row flex-wrap justify-center gap-7'>
          <SocialIcon link='https://twitter.com' Icon={NewTwitterIcon} color={s === 'dark' ? '#fff' : '#000'} />
          <SocialIcon link='https://instagram.com' Icon={InstagramIcon} />
          <SocialIcon link='https://wa.me' Icon={FacebookIcon} />
          <SocialIcon link='https://wa.me' Icon={WhatsappIcon} />
          <SocialIcon link='https://t.me' Icon={TelegramIcon} />
        </View>
      </View>
      <Medium className='text mt-5 text-center text-xs'>
        App Version v{versionName}({versionCode})
      </Medium>
    </View>
  )
}

function SocialIcon({ link, Icon, color }: { color?: string; Icon: React.FC<SvgProps>; link: string }) {
  return (
    <Press onPress={() => Linking.openURL(link)}>
      <Icon height={25} width={25} color={color} />
    </Press>
  )
}
