import { View } from 'react-native'

import NoData from '@components/NoData'
import { Bold, SemiBold } from '@utils/fonts'

type HeadingsListProps = {
  headings: Heading[]
}
export interface Heading {
  text: string
  level: number
}

const HeadingsList: React.FC<HeadingsListProps> = ({ headings }) => {
  if (headings.length === 0) return <NoData />
  return (
    <View className='gap-0.5'>
      {headings.map((heading, index) => {
        const levelIndex = heading.level - 1
        const TextComponent = textComponentMap[levelIndex] || SemiBold
        const fontSize = fontSizeMap[levelIndex]
        const lineHeight = lineHeightMap[levelIndex]
        const marginLeft = marginLeftMap[levelIndex]
        const listSymbol = listSymbolMap[levelIndex]

        return (
          <TextComponent
            className='textBlack'
            key={index}
            style={{ marginLeft, fontSize, lineHeight }}
            numberOfLines={1}
          >
            {listSymbol} {heading.text}
          </TextComponent>
        )
      })}
    </View>
  )
}

export default HeadingsList

const listSymbolMap = ['', '', '•', '◦', '▪', '▫']
const fontSizeMap = [16, 13, 12, 11, 11, 10.5]
const lineHeightMap = [23, 22, 21, 20, 19, 18]
const marginLeftMap = [0, 0, 15, 30, 45, 60]
const textComponentMap = [Bold, Bold, SemiBold, SemiBold, SemiBold, SemiBold]
