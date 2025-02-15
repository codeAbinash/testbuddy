import { PaddingTop } from '@components/SafePadding'
import { Medium, SemiBold } from '@utils/fonts'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeProfile() {
  return (
    <View className='pt-3'>
      <Tabs tabsData={tabData} />
    </View>
  )
}

function Tabs({ tabsData }: { tabsData: TabData[] }) {
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

function Tab({ title, setActiveTab, index, activeTab }: TabProps) {
  const active = activeTab === index
  return (
    <View>
      <PaddingTop />
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
    </View>
  )
}

type TabData = {
  title: string
  content: React.ReactNode
}

const tabData: TabData[] = [
  {
    title: 'My Progress',
    content: <MyProgress />,
  },
  {
    title: 'Attempted Test',
    content: <AcademicTest />,
  },
  {
    title: 'Bookmarks',
    content: <Bookmarks />,
  },
  {
    title: 'Personalized Tests',
    content: <PersonalizedTest />,
  },
]

function MyProgress() {
  return (
    <View className='p-5'>
      <Medium className='text'>My Progress</Medium>
    </View>
  )
}

function AcademicTest() {
  return (
    <View className='p-5'>
      <Medium className='text'>Attempted Test</Medium>
    </View>
  )
}

function Bookmarks() {
  return (
    <View className='p-5'>
      <Medium className='text'>Bookmarks</Medium>
    </View>
  )
}

function PersonalizedTest() {
  return (
    <View className='p-5'>
      <Medium className='text'>Personalized Test</Medium>
    </View>
  )
}
