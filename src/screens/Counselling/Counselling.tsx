import { FC, useState } from 'react'
import { StatusBar, View } from 'react-native'

import { useColorScheme } from 'nativewind'

import popupStore from '@/zustand/popupStore'
import Btn from '@components/Button'
import CheckBox from '@components/CheckBox'
import DropdownExtended from '@components/DropdownExtended'
import Input from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoid'
import Label from '@components/Label'
import Radio from '@components/Radio'
import { PaddingBottom } from '@components/SafePadding'
import { AppBar } from '@components/TopBar'
import { useMutation } from '@tanstack/react-query'
import { H } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import { NavProps } from '@utils/types'

import { counsellingProfileUpdate } from './api/counsellingProfileUpdate'
import { categories, genders, states } from './utils'

const Counselling: FC<NavProps> = ({ navigation }) => {
  const { routes, index } = navigation.getState()
  const previousRouteName = routes?.[index - 1]?.name

  const [isAdvanced, setIsAdvanced] = useState(false)

  const [mainRank, setMainRank] = useState<string>(__DEV__ ? '100' : '')
  const [mainCategoryRank, setMainCategoryRank] = useState<string>(__DEV__ ? '100' : '')

  const [advanceCLRRank, setAdvanceCLRRank] = useState<string>(__DEV__ ? '100' : '')
  const [advanceCategoryRank, setAdvanceCategoryRank] = useState<string>(__DEV__ ? '100' : '')

  const [homeState, setHomeState] = useState<string>(__DEV__ ? 'Maharashtra' : '')
  const [category, setCategory] = useState<string>(__DEV__ ? 'OPEN' : '')
  const [pwd, setPwd] = useState<'Yes' | 'No'>('No')
  const [gender, setGender] = useState<string>(__DEV__ ? 'Male' : '')

  const { colorScheme } = useColorScheme()
  const alert = popupStore((state) => state.alert)

  const { mutate, isPending } = useMutation({
    mutationKey: ['counsellingProfileUpdate'],
    mutationFn: counsellingProfileUpdate,
    onSuccess: (data) => {
      console.log(data)
      if (previousRouteName === 'CollegeList') navigation.goBack()
      else navigation.replace('CollegeList')
    },
  })

  function handlePredictCollege() {
    if (!mainRank) return alert('Missing Main Rank', 'Please enter your JEE Main CRL Rank')
    if (!mainCategoryRank) return alert('Missing Category Rank', 'Please enter your JEE Main Category Rank')
    if (isAdvanced) {
      if (!advanceCLRRank) return alert('Missing Advanced Rank', 'Please enter your JEE Advanced Rank')
      if (!advanceCategoryRank)
        return alert('Missing Advanced Category Rank', 'Please enter your JEE Advanced Category Rank')
    }
    if (!homeState) return alert('Missing Home State', 'Please select your home state')
    if (!category) return alert('Missing Category', 'Please select your category')

    if (!pwd) return alert('Missing PWD', 'Please select if you are from PWD category')

    if (!gender) return alert('Missing Gender', 'Please select your gender')

    mutate({
      state: homeState,
      category,
      mainsCRLRank: +mainRank,
      mainsCategoryRank: +mainCategoryRank,
      advancedCRLRank: isAdvanced ? +advanceCLRRank : undefined,
      advancedCategoryRank: isAdvanced ? +advanceCategoryRank : undefined,
      gender,
      pwdCategory: pwd === 'Yes',
    })
  }

  return (
    <View className='flex-1 bg-screen dark:bg-zinc-950'>
      <StatusBar barStyle='default' />
      <AppBar />
      <KeyboardAvoid>
        <SemiBold className='text text-center text-sm mt-2'>Enter your JEE Rank and other details</SemiBold>
        <View className='flex-1 px-5 pb-4'>
          <View className='mt-3 gap-3'>
            <View>
              <Label text='JEE Main CRL Rank' />
              <Input
                placeholder='JEE Main CRL Rank'
                keyboardType='numeric'
                value={mainRank}
                onChangeText={setMainRank}
              />
            </View>
            <View>
              <Label text='Select Category' />
              <DropdownExtended
                placeholder='Select Category'
                data={categories}
                labelField='label'
                valueField='value'
                value={category}
                onChange={(item) => setCategory(item.value)}
                colorScheme={colorScheme}
                maxHeight={H}
              />
            </View>
            {category !== 'OPEN' && (
              <View>
                <Label text='JEE Main Category Rank' />
                <Input
                  placeholder='JEE Main Category Rank'
                  keyboardType='numeric'
                  value={mainCategoryRank}
                  onChangeText={setMainCategoryRank}
                />
              </View>
            )}
            <CheckBox
              label='Do you have JEE Advanced Rank?'
              className='mb-1 mt-1'
              checked={isAdvanced}
              onChange={setIsAdvanced}
            />
            {isAdvanced && (
              <>
                <View>
                  <Label text='JEE Advanced CRL Rank' />
                  <Input
                    placeholder='JEE Advanced CRL Rank'
                    keyboardType='numeric'
                    value={advanceCLRRank}
                    onChangeText={setAdvanceCLRRank}
                  />
                </View>
                {category !== 'OPEN' && (
                  <View>
                    <Label text='JEE Advanced Category Rank' />
                    <Input
                      placeholder='JEE Advanced Category Rank'
                      keyboardType='numeric'
                      value={advanceCategoryRank}
                      onChangeText={setAdvanceCategoryRank}
                    />
                  </View>
                )}
              </>
            )}
            <View>
              <Label text='Your home state' />
              <DropdownExtended
                placeholder='Select your home state'
                data={states}
                labelField='label'
                valueField='value'
                value={homeState}
                onChange={(item) => setHomeState(item.value)}
                colorScheme={colorScheme}
                maxHeight={H}
              />
            </View>
            <View>
              <Label text='Gender' />
              <DropdownExtended
                placeholder='Select Gender'
                data={genders}
                labelField='label'
                valueField='value'
                value={gender}
                onChange={(item) => setGender(item.value)}
                colorScheme={colorScheme}
                maxHeight={H}
              />
            </View>
            <View>
              <Medium className='text text-sm'>Are you from PWD category?</Medium>
              <Radio options={['Yes', 'No']} value={pwd} onChange={setPwd} />
            </View>
            <Btn
              title={isPending ? 'Predicting College...' : 'Predict College'}
              className='mt-5'
              onPress={handlePredictCollege}
              disabled={isPending}
            />
          </View>
        </View>
        <PaddingBottom />
      </KeyboardAvoid>
    </View>
  )
}

export default Counselling
