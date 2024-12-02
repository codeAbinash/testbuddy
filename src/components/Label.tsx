import { Medium } from '@utils/fonts'
import React from 'react'

export default function Label({ text }: { text: string }) {
  return <Medium className='text pb-1 pl-1 text-[0.7rem] opacity-80'>{text}</Medium>
}
