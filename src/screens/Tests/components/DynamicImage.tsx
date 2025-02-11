import { Image } from 'react-native'
import { SvgUri } from 'react-native-svg'

export function DynamicImage({ uri }: { uri: string }) {
  if (uri.endsWith('.svg')) return <SvgUri uri={uri} height={40} width={40} />
  return <Image source={{ uri }} style={{ height: 40, width: 40 }} />
}
