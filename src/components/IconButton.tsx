import Press from '@components/Press'
import { TouchableOpacityProps } from 'react-native'

export type IconButtonProps = TouchableOpacityProps & {
  variant: 'primary' | 'secondary'
}

export function IconButton({ children, variant = 'primary', ...props }: IconButtonProps) {
  const buttonClasses =
    variant === 'primary'
      ? 'bg-accent dark:bg-zinc-100'
      : 'border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'

  return (
    <Press
      className={`items-center justify-center rounded-xl ${buttonClasses}`}
      style={{ height: 40, width: 40 }}
      activeOpacity={0.8}
      activeScale={0.9}
      {...props}
    >
      {children}
    </Press>
  )
}
