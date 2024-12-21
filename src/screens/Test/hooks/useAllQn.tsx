import { useMemo } from 'react'
import { Test } from '../types'

export default function useAllQn(data: Test) {
  return useMemo(
    () => [
      ...(data?.test?.sections?.[0]?.questions || []),
      ...(data?.test?.sections?.[1]?.questions || []),
      ...(data?.test?.sections?.[2]?.questions || []),
    ],
    [data],
  )
}
