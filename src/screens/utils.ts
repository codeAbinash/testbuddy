import {
  AmbulanceStrokeRoundedIcon,
  BookOpen01StrokeRoundedIcon,
  Mortarboard01StrokeRoundedIcon,
  Mortarboard02StrokeRoundedIcon,
  WindPowerStrokeRoundedIcon,
} from '@assets/icons/icons'
import type { DropdownData } from '@components/DropdownExtended'

export const Stream: DropdownData[] = [
  { label: 'Engineering', value: 'engineering', Icon: WindPowerStrokeRoundedIcon },
  { label: 'Medical', value: 'medical', Icon: AmbulanceStrokeRoundedIcon },
]
export const Std: DropdownData[] = [
  { label: '11th', value: '11th', Icon: Mortarboard02StrokeRoundedIcon },
  { label: '12th', value: '12th', Icon: Mortarboard01StrokeRoundedIcon },
  { label: 'Dropper', value: 'Dropper', Icon: BookOpen01StrokeRoundedIcon },
]
