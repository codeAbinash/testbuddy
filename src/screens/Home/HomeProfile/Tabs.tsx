import { SemiBold } from '@utils/fonts'
import { TouchableOpacity } from 'react-native'

import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export type TabData = {
  title: string
  content: React.ReactNode
}

export function Tabs({ tabsData }: { tabsData: TabData[] }) {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex flex-row flex-nowrap'
        contentContainerClassName='px-5 gap-3'
      >
        {tabsData.map((tab, index) => (
          <Tab key={index} index={index} setActiveTab={setActiveTab} activeTab={activeTab} {...tab} />
        ))}
      </ScrollView>
      <ScrollView>{tabsData[activeTab]?.content}</ScrollView>
    </>
  )
}

type TabProps = TabData & {
  setActiveTab: (index: number) => void
  activeTab: number
  index: number
}

export function Tab({ title, setActiveTab, index, activeTab }: TabProps) {
  const active = activeTab === index
  return (
    <TouchableOpacity
      className={`${active ? 'bg-accent dark:bg-white/80' : 'bg-zinc-200 dark:bg-zinc-800'} rounded-full p-2.5 px-5 pt-3`}
      onPress={() => {
        setActiveTab(index)
      }}
      activeOpacity={0.7}
    >
      <SemiBold
        className={`text-center text-sm ${active ? 'text-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400'} text-xs`}
      >
        {title}
      </SemiBold>
    </TouchableOpacity>
  )
}
