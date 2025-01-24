import { create } from 'zustand'

type TimeStore = {
  lastApiCallTime: number
  setLastApiCallTime: (time: number) => void
}

const timeStore = create<TimeStore>((set) => ({
  lastApiCallTime: new Date().getTime(),
  setLastApiCallTime: (time) => set({ lastApiCallTime: time }),
}))

export default timeStore
