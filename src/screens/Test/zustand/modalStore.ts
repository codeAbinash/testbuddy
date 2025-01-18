import { create } from 'zustand'

export enum ViewMode {
  Grid,
  List,
}

type ModalStore = {
  open: boolean
  setOpen: (open: boolean) => void
  viewMode: ViewMode
  setViewMode: (viewMode: ViewMode) => void
}

const modalStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  viewMode: ViewMode.Grid,
  setViewMode: (viewMode) => set({ viewMode }),
}))

export default modalStore
