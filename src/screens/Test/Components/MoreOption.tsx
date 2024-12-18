import { More03Icon } from "@assets/icons/icons";
import Press from "@components/Press";
import { ColorScheme } from "@utils/types";
import { TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

export function MoreOption({ colorScheme, ...rest }: { colorScheme: ColorScheme } & TouchableOpacityProps) {
  return (
    <Press {...rest} className='p-2'>
      <More03Icon width={22} height={22} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
    </Press>
  )
}
