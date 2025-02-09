import { facebookUrl, instagramUrl, linkedInUrl, telegramUrl, twitterUrl, whatsappUrl, youtubeUrl } from '@/constants'
import { NewTwitterIcon } from '@assets/icons/icons'
import FacebookIcon from '@assets/icons/social/facebook.svg'
import InstagramIcon from '@assets/icons/social/instagram.svg'
import LinkedInIcon from '@assets/icons/social/linkedin.svg'
import TelegramIcon from '@assets/icons/social/telegram.svg'
import WhatsappIcon from '@assets/icons/social/whatsapp.svg'
import YoutubeIcon from '@assets/icons/social/youtube.svg'

import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import { SocialIcon } from '../../../components/SocialIcon'
import { Bold, SemiBold } from '@utils/fonts'
const SocialIcons = () => {
  const { colorScheme: s } = useColorScheme()

  return (
    <View className='mt-5 gap-3'>
      <Bold className='text text-center text-xl'>Get in touch</Bold>
      <View className='mt-3 flex-row flex-wrap justify-center gap-6'>
        <SocialIcon link={twitterUrl} Icon={NewTwitterIcon} color={s === 'dark' ? '#fff' : '#000'} />
        <SocialIcon link={instagramUrl} Icon={InstagramIcon} />
        <SocialIcon link={facebookUrl} Icon={FacebookIcon} />
        <SocialIcon link={linkedInUrl} Icon={LinkedInIcon} />
        <SocialIcon link={youtubeUrl} Icon={YoutubeIcon} />
        <SocialIcon link={whatsappUrl} Icon={WhatsappIcon} />
        <SocialIcon link={telegramUrl} Icon={TelegramIcon} />
      </View>
      <SemiBold className='text mt-2 text-center text-sm opacity-80'>
        Follow us on social media for updates and more!
      </SemiBold>
    </View>
  )
}

export default SocialIcons
