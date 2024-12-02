import { SemiBold } from '@utils/fonts'
import React from 'react'

export default function Label({ text }: { text: string }) {
  return <SemiBold className='text pb-1 pl-1 text-[0.7rem] opacity-80'>{text}</SemiBold>
}
