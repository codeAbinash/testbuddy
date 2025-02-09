import { SemiBold } from '@utils/fonts'
import { type ButtonProps, TouchableOpacity } from 'react-native'

export function Button({ title, onPress, className }: ButtonProps & { className?: string }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-5 py-3 ${className}`}
      style={{ borderRadius: 10 }}
    >
      <SemiBold className='pt-1 text-xs text-white'>{title}</SemiBold>
    </TouchableOpacity>
  )
}
