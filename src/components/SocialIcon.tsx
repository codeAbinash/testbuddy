import Press from '@components/Press'
import type React from 'react'
import { Linking } from 'react-native'
import type { SvgProps } from 'react-native-svg'

export function SocialIcon({ link, Icon, color }: { color?: string; Icon: React.FC<SvgProps>; link: string }) {
  return (
    <Press onPress={() => Linking.openURL(link)}>
      <Icon height={21} width={21} color={color} />
    </Press>
  )
}
