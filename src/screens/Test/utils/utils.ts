import { PopupStore } from '@/zustand/popupStore'

export function handleSubmit(alert: PopupStore['alert'], cb: () => any) {
  alert('Submit test?', 'Are you sure you want to submit the test?', [
    { text: 'No' },
    {
      text: 'Yes',
      async onPress() {
        cb()
        alert('Please wait', 'Submitting test...', [], true)
      },
    },
  ])
}
