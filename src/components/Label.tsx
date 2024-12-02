import { Medium } from '@utils/fonts'
import React from 'react'

export default function Label({ text }: { text: string }) {
  return <Medium className='text text-[0.7rem]'>{text}</Medium>
}
