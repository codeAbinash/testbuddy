import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean
  toggle: () => void
}

const sidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default sidebarStore
