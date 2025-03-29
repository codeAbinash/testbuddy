import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

export default function useFocusCallback(callback: () => void) {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      callback()
    }
  }, [isFocused, callback])
}
