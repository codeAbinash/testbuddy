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
  Time04Icon,
} from '@assets/icons/icons'
import FacebookIcon from '@assets/icons/social/facebook.svg'
import InstagramIcon from '@assets/icons/social/instagram.svg'
import LinkedInIcon from '@assets/icons/social/linkedin.svg'
import TelegramIcon from '@assets/icons/social/telegram.svg'
import WhatsappIcon from '@assets/icons/social/whatsapp.svg'
import YoutubeIcon from '@assets/icons/social/youtube.svg'

import {
  aboutUsUrl,
  emailUrl,
  facebookUrl,
  instagramUrl,
  linkedInUrl,
  privacyPolicyUrl,
  telegramUrl,
  termsAndConditionsUrl,
  twitterUrl,
  versionCode,
  versionName,
  whatsappUrl,
  youtubeUrl,
} from '@/constants'
import popupStore from '@/zustand/popupStore'
import Press from '@components/Press'
import api from '@query/api'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { logout } from '@screens/Auth/utils'
import { useQuery } from '@tanstack/react-query'
import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Linking, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import ListItem, { ListIcon } from './ListItem'
import SmallProfile from './SmallProfile'

type ColorScheme = 'light' | 'dark' | undefined

export default function Sidebar({ navigation }: { navigation: DrawerContentComponentProps['navigation'] }) {
  const { colorScheme } = useColorScheme()
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
  })

  return (
    <View className='flex-1'>
      <SmallProfile navigation={navigation} data={data} />
      <Stream colorScheme={colorScheme} stream={data?.stream} navigation={navigation} />
      <Tests colorScheme={colorScheme} />
      <MyProgress colorScheme={colorScheme} />
      <Rewards colorScheme={colorScheme} />
      <Settings colorScheme={colorScheme} />
      <AboutUs colorScheme={colorScheme} />
      <End colorScheme={colorScheme} />
    </View>
  )
}

type StreamProps = {
  colorScheme: ColorScheme
  stream: string | undefined
  navigation: DrawerContentComponentProps['navigation']
}

function Stream({ colorScheme: s, stream, navigation }: StreamProps) {
  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>Stream</Bold>
      <ListItem
        icon={<ListIcon scheme={s} Icon={Mortarboard02Icon} />}
        title='Change Stream'
        subtitle={stream}
        onPress={() => navigation.navigate('ChangeStream')}
      />
    </View>
  )
}

function Tests({ colorScheme: s }: { colorScheme: ColorScheme }) {
  const navigation = useNavigation<StackNav>()

  return (
    <View className='gap-0'>
      <Bold className='text mt-5 pb-2 text-lg'>Tests</Bold>
      {__DEV__ && (
        <ListItem
          icon={<ListIcon Icon={LicenseDraftIcon} scheme={s} />}
          title='Test Screen'
          onPress={() => navigation.navigate('Test')}
        />
      )}
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
      <ListItem
        icon={<ListIcon Icon={InformationCircleIcon} scheme={s} />}
        title='About Us'
        onPress={() => Linking.openURL(aboutUsUrl)}
      />
      <ListItem
        icon={<ListIcon Icon={Mail02Icon} scheme={s} />}
        title='Contact Us'
        onPress={() => Linking.openURL(emailUrl)}
      />
      <ListItem
        icon={<ListIcon Icon={PolicyIcon} scheme={s} />}
        title='Privacy Policy'
        onPress={() => Linking.openURL(privacyPolicyUrl)}
      />
      <ListItem
        icon={<ListIcon Icon={LicenseIcon} scheme={s} />}
        title='Terms & Conditions'
        onPress={() => Linking.openURL(termsAndConditionsUrl)}
      />
      <ListItem icon={<ListIcon Icon={TgIcon} scheme={s} />} title='Join our Telegram community' />
    </View>
  )
}

function End({ colorScheme: s }: { colorScheme: ColorScheme }) {
  const alert = popupStore((store) => store.alert)
  const navigation = useNavigation<StackNav>()

  return (
    <View className='pb-10'>
      <Bold className='text mt-5 pb-2 text-lg'>Log Out</Bold>
      <ListItem
        icon={<ListIcon Icon={LogoutCircle01Icon} scheme={s} />}
        title='Log out'
        onPress={() => {
          alert('Are you sure?', 'You will be logged out of the app', [
            { text: 'Cancel' },
            { text: 'Log out', onPress: logout },
          ])
        }}
      />
      <View>
        <Medium className='text mt-5 pb-2 text-center text-lg'>Follow us on</Medium>
        <View className='mt-3 flex-row flex-wrap justify-center gap-6'>
          <SocialIcon link={twitterUrl} Icon={NewTwitterIcon} color={s === 'dark' ? '#fff' : '#000'} />
          <SocialIcon link={instagramUrl} Icon={InstagramIcon} />
          <SocialIcon link={facebookUrl} Icon={FacebookIcon} />
          <SocialIcon link={linkedInUrl} Icon={LinkedInIcon} />
          <SocialIcon link={youtubeUrl} Icon={YoutubeIcon} />
          <SocialIcon link={whatsappUrl} Icon={WhatsappIcon} />
          <SocialIcon link={telegramUrl} Icon={TelegramIcon} />
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
      <Icon height={21} width={21} color={color} />
    </Press>
  )
}
