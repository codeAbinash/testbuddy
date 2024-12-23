import { create } from 'zustand'

type ModalStore = {
  open: boolean
  setOpen: (open: boolean) => void
}

const modalStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))

export default modalStore
