import { UnfoldLessStrokeRoundedIcon, UnfoldMoreStrokeRoundedIcon } from "@assets/icons/icons"
import { useColorScheme } from "nativewind"
import colors from "tailwindcss/colors"

function FoldUnfold({ fold }: { fold: boolean }) {
  const { colorScheme } = useColorScheme()
  const color = colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]
  if (fold) return <UnfoldLessStrokeRoundedIcon width={20} height={20} color={color} />
  return <UnfoldMoreStrokeRoundedIcon width={20} height={20} color={color} />
}

export default FoldUnfold
