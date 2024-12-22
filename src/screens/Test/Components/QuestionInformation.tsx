import { Medium } from '@utils/fonts'
import { View } from 'react-native'

export default function QuestionInformation() {
  // const allQn = testStore((store) => store.allQn)
  return (
    <View className='m-3 my-3 mt-2 flex-1 flex-grow-0 rounded-xl border border-zinc-100 p-3 dark:border-zinc-800'>
      {/* <View className='flex-row justify-between'>
        <Medium className='text text-xs opacity-80'>Number of Questions: {allQn.length}</Medium>
        <Medium className='text text-xs opacity-80'>7/90</Medium>
      </View> */}
      <View className='flex-row flex-wrap gap-2'>
        <SmallQuestion text='Current' bgCn='bg-blue-500' />
        <SmallQuestion text='Not Attempted' bgCn='bg-zinc-500' />
        <SmallQuestion text='Answered' bgCn='bg-green-500' />
        <SmallQuestion text='Not Answered' bgCn='bg-orange-500' />
        <SmallQuestion text='Marked for Review' bgCn='bg-rose-500' />
      </View>
    </View>
  )
}

export function SmallQuestion({ text, bgCn }: { text: string; bgCn: string }) {
  return (
    <View className='w-[48%] flex-row items-center gap-2'>
      <View className={'size-3.5 rounded-full ' + bgCn}></View>
      <Medium className='text text-xs opacity-80'>{text}</Medium>
    </View>
  )
}
