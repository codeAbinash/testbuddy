import api from '@query/api/api'
import { useMutation } from '@tanstack/react-query'
import currentQnStore from '../zustand/currentQn'

export default function useUpdateTestMutation(testSeriesId: string, onSuccess?: () => void) {
  const qnNo = currentQnStore((store) => store.qnNo)
  return useMutation({
    mutationKey: ['updateTest', testSeriesId, qnNo],
    mutationFn: api.updateTest,
    onSuccess: onSuccess || console.log,
  })
}
