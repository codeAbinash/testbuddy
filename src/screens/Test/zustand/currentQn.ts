import { create } from 'zustand'

type CurrentQn = {
  qnNo: number
  setQnNo: (qn: number) => void
  lastOpenedQn: number
}

const currentQnStore = create<CurrentQn>((set) => ({
  qnNo: 0,
  setQnNo: (qn) => {
    set((state) => {
      const lastOpenedQn = state.qnNo
      return { qnNo: qn, lastOpenedQn }
    })
  },
  lastOpenedQn: 0,
}))

export default currentQnStore
