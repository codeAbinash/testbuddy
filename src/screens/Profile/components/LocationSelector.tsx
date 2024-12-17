import { City03StrokeRoundedIcon, MapsLocation01StrokeRoundedIcon } from '@assets/icons/icons'
import DropdownExtended, { DropdownData } from '@components/DropdownExtended'
import { InputIcon } from '@components/Input'
import Label from '@components/Label'
import { citySearch } from '@query/axios'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

type State = { name: string; iso2: string; id: number } & DropdownData
async function searchAllStates() {
  const states = (await (await citySearch.get('/countries/IN/states')).data) as State[]
  for (const state of states) {
    state.label = state.name
    state.value = state.name
  }
  return states
}

type City = { name: string } & DropdownData
async function searchCity(state: string) {
  const cities = (await (await citySearch.get(`/countries/IN/states/${state}/cities`)).data) as City[]
  for (const city of cities) {
    city.label = city.name
    city.value = city.name
  }
  return cities
}

export function LocationSelector({ state, setState, city, setCity, colorScheme }: LocationSelectorProps) {
  const [cities, setCities] = useState<DropdownData[]>([])
  const { data: states } = useQuery({ queryKey: ['states'], queryFn: searchAllStates })

  useEffect(() => {
    const stateCode = states?.find((s) => s.label === state)?.iso2
    if (stateCode) searchCity(stateCode).then(setCities)
  }, [state])

  return (
    <>
      <View>
        <Label text='State' />
        <DropdownExtended
          Left={<InputIcon Icon={MapsLocation01StrokeRoundedIcon} />}
          placeholder='e.g. Maharashtra or West Bengal'
          data={states || []}
          labelField='label'
          valueField='value'
          value={state}
          // maxHeight={400}
          onChange={(item) => setState(item.value)}
          colorScheme={colorScheme}
          search
          // dropdownPosition='top'
          mode='modal'
          autoScroll={false}
          renderItem={StateRenderItem}
        />
      </View>
      <View>
        <Label text='City' />
        <DropdownExtended
          Left={<InputIcon Icon={City03StrokeRoundedIcon} />}
          placeholder='e.g. Mumbai or Kolkata'
          data={cities}
          maxHeight={400}
          labelField='label'
          autoScroll={false}
          valueField='value'
          // dropdownPosition='top'
          search
          value={city}
          onChange={(item) => setCity(item.value)}
          colorScheme={colorScheme}
          mode='modal'
          renderItem={CityRenderItem}
        />
      </View>
    </>
  )
}

type LocationSelectorProps = {
  state: string
  setState: (state: string) => void
  city: string
  setCity: (city: string) => void
  colorScheme: ColorScheme
}

function StateRenderItem<T extends DropdownData>(item: T) {
  return (
    <View className='flex-row items-center gap-3 px-5' style={{ borderRadius: 14.5, height: 49.5 }}>
      <InputIcon Icon={MapsLocation01StrokeRoundedIcon} />
      <Medium className='text text-base'>{item.label}</Medium>
    </View>
  )
}

function CityRenderItem<T extends DropdownData>(item: T) {
  return (
    <View className='flex-row items-center gap-3 px-5' style={{ borderRadius: 14.5, height: 49.5 }}>
      <InputIcon Icon={City03StrokeRoundedIcon} />
      <Medium className='text text-base'>{item.label}</Medium>
    </View>
  )
}
