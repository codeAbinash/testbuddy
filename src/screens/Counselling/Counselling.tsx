import { FC, useState } from 'react'
import { View } from 'react-native'

import Btn from '@components/Button'
import DropdownExtended from '@components/DropdownExtended'
import Input from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { PaddingBottom } from '@components/SafePadding'
import BackHeader from '@screens/components/BackHeader'
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
  const [isChecked, setIsChecked] = useState(false)
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedQuota, setSelectedQuota] = useState<string>('')
  const [pwd, setPwd] = useState<'Yes' | 'No'>('No')
  const { colorScheme } = useColorScheme()

  function handlePredictCollege() {
    console.log('selectedState', selectedState)
    console.log('selectedCategory', selectedCategory)
    console.log('selectedQuota', selectedQuota)
    console.log('pwd', pwd)
    console.log('isChecked', isChecked)
  }

  return (
    <>
      <BackHeader navigation={navigation} title='Predict College' />
      <KeyboardAvoid>
        <View className='bg-screen flex-1 px-5 pb-4'>
          <View className='mt-3 gap-3'>
            <View>
              <Label text='JEE Main CRL Rank' />
              <Input placeholder='JEE Main CRL Rank' keyboardType='numeric' />
            </View>
            <View>
              <Label text='JEE Main Category Rank' />
              <Input placeholder='JEE Main Category Rank' keyboardType='numeric' />
            </View>
            <CheckBox
              label='Do you have JEE Advanced Rank?'
              className='mb-1 mt-1'
              checked={isChecked}
              onChange={setIsChecked}
            />
            {isChecked && (
              <>
                <View>
                  <Label text='JEE Advanced CRL Rank' />
                  <Input placeholder='JEE Advanced CRL Rank' keyboardType='numeric' />
                </View>
                <View>
                  <Label text='JEE Advanced Category Rank' />
                  <Input placeholder='JEE Advanced Category Rank' keyboardType='numeric' />
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
                value={selectedState}
                onChange={(item) => setSelectedState(item.value)}
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
                value={selectedCategory}
                onChange={(item) => setSelectedCategory(item.value)}
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
                value={selectedQuota}
                onChange={(item) => setSelectedQuota(item.value)}
                colorScheme={colorScheme}
                maxHeight={H}
              />
            </View>
            <View>
              <Medium className='text'>Are you from PWD category?</Medium>
              <Radio options={['Yes', 'No']} value={pwd} onChange={setPwd} />
            </View>
            <Btn title='Predict My College' className='mt-5' onPress={handlePredictCollege} />
          </View>
        </View>
        <PaddingBottom />
      </KeyboardAvoid>
    </>
  )
}

export default Counselling
