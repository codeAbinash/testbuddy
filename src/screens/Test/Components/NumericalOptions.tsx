import Input from "@components/Input"
import Label from "@components/Label"
import { Medium } from "@utils/fonts"
import { ColorScheme } from "@utils/types"
import React, { useCallback } from "react"
import { TouchableOpacity, View } from "react-native"
import currentQnStore from "../zustand/currentQn"
import testStore from "../zustand/testStore"

const NumericalOptions = React.memo(({ colorScheme }: { colorScheme: ColorScheme }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const setAllQn = testStore((store) => store.setAllQn)
  const qn = allQn?.[qnNo]
  const text = qn?.markedAnswer

  const onChange = useCallback(
    (text: string) => {
      const question = allQn?.[qnNo]
      if (!question) return
      question.markedAnswer = text
      setAllQn([...allQn])
      console.log('UPDATE - API')
    },
    [allQn, qnNo, setAllQn],
  )

  return (
    <View>
      <Label text='Type your answer below' />
      <Input placeholder='Type your answer here' keyboardType='numeric' value={text} onChangeText={onChange} />
      {qn?.markedAnswer && (
        <TouchableOpacity className='mt-6' activeOpacity={0.6} onPress={() => onChange('')}>
          <Medium className='text text-sm underline'>Clear answer</Medium>
        </TouchableOpacity>
      )}
    </View>
  )
})

export default NumericalOptions
