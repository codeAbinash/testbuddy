import api from '@query/api'
import { useQuery } from '@tanstack/react-query'

export default function useTestQuery(testId: string) {
  return useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })
}
