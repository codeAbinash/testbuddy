import { create } from 'zustand'

type CurrentQn = {
  qnNo: number
  setQnNo: (qn: number) => void
}

const currentQnStore = create<CurrentQn>((set) => ({
  qnNo: 0,
  setQnNo: (qn) => {
    set({ qnNo: qn })
  },
}))

export default currentQnStore
