import { FC, useState } from 'react'
import { View } from 'react-native'

import popupStore from '@/zustand/popupStore'
import Btn from '@components/Button'
import DropdownExtended from '@components/DropdownExtended'
import Input from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { PaddingBottom } from '@components/SafePadding'
import { CounselingRequestData, counsellingApi } from '@query/api'
import BackHeader from '@screens/components/BackHeader'
import { useMutation } from '@tanstack/react-query'
import { H } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import CheckBox from './CheckBox'
import Radio from './Radio'
import { categories, quotas, states } from './utils'

type CounsellingProps = {
  navigation: StackNav
}

const Counselling: FC<CounsellingProps> = ({ navigation }) => {
  const [isAdvanced, setIsAdvanced] = useState(false)

  const [mainRank, setMainRank] = useState<string>(__DEV__ ? '100' : '')
  const [mainCategoryRank, setMainCategoryRank] = useState<string>(__DEV__ ? '100' : '')

  const [advanceCLRRank, setAdvanceCLRRank] = useState<string>(__DEV__ ? '100' : '')
  const [advanceCategoryRank, setAdvanceCategoryRank] = useState<string>(__DEV__ ? '100' : '')

  const [homeState, setHomeState] = useState<string>(__DEV__ ? 'Maharashtra' : '')
  const [category, setCategory] = useState<string>(__DEV__ ? 'OPEN' : '')
  const [quota, setQuota] = useState<string>(__DEV__ ? 'AI' : '')
  const [pwd, setPwd] = useState<'Yes' | 'No'>('No')

  const { colorScheme } = useColorScheme()
  const alert = popupStore((state) => state.alert)

  const { mutate, isPending } = useMutation({
    mutationKey: ['counsellingList', mainRank, advanceCLRRank],
    mutationFn: counsellingApi,
    onSuccess: (data) => {
      console.log(data)
      if (data.isAlert) alert('Error', data.message || 'Something went wrong')
      navigation.navigate('CollegeList', data)
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
    if (!quota) return alert('Missing Quota', 'Please select your quota')

    if (!pwd) return alert('Missing PWD', 'Please select if you are from PWD category')

    const data: CounselingRequestData = {
      mainsCRLRank: +mainRank,
      mainsCategoryRank: +mainCategoryRank,
      advancedCRLRank: isAdvanced ? +advanceCLRRank : undefined,
      advancedCategoryRank: isAdvanced ? +advanceCategoryRank : undefined,
      homeState,
      category,
      quota,
      pwdCategory: pwd === 'Yes',
    }

    mutate(data)
  }

  return (
    <>
      <BackHeader navigation={navigation} title='Predict College' />
      <KeyboardAvoid>
        <View className='bg-screen flex-1 px-5 pb-4'>
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
              <Label text='JEE Main Category Rank' />
              <Input
                placeholder='JEE Main Category Rank'
                keyboardType='numeric'
                value={mainCategoryRank}
                onChangeText={setMainCategoryRank}
              />
            </View>
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
                <View>
                  <Label text='JEE Advanced Category Rank' />
                  <Input
                    placeholder='JEE Advanced Category Rank'
                    keyboardType='numeric'
                    value={advanceCategoryRank}
                    onChangeText={setAdvanceCategoryRank}
                  />
                </View>
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
            <View>
              <Label text='Select Quota' />
              <DropdownExtended
                placeholder='Select Quota'
                data={quotas}
                labelField='label'
                valueField='value'
                value={quota}
                onChange={(item) => setQuota(item.value)}
                colorScheme={colorScheme}
                maxHeight={H}
              />
            </View>
            <View>
              <Medium className='text text-sm'>Are you from PWD category?</Medium>
              <Radio options={['Yes', 'No']} value={pwd} onChange={setPwd} />
            </View>
            <Btn
              title={isPending ? 'Predicting Colleges...' : 'Predict Colleges'}
              className='mt-5'
              onPress={handlePredictCollege}
              disabled={isPending}
            />
          </View>
        </View>
        <PaddingBottom />
      </KeyboardAvoid>
    </>
  )
}

export default Counselling
