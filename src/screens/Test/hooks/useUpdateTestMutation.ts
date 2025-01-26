import api from '@query/api'
import { useMutation } from '@tanstack/react-query'
import { print } from '@utils/utils'
import currentQnStore from '../zustand/currentQn'

export default function useUpdateTestMutation(testSeriesId: string) {
  const qnNo = currentQnStore((store) => store.qnNo)
  return useMutation({
    mutationKey: ['updateTest', testSeriesId, qnNo],
    mutationFn: api.updateTest,
    onSuccess: print,
  })
}
