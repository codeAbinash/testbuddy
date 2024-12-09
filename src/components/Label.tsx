import { SemiBold } from '@utils/fonts'

export default function Label({ text }: { text: string }) {
  return <SemiBold className='text pb-1.5 pl-1 text-[0.75rem] opacity-80'>{text}</SemiBold>
}
