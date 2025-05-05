import api from '@query/api/api'
import { postApi } from '@query/index'

export interface Test {
  _id: string
  test: Awaited<ReturnType<typeof api.testList>>['data'][0]['tests'][number]
  status: string
  testStartTime: Date
  totalTimeCompleted: number
  percentCompleted: number
}

export function attemptedTestsList() {
  return postApi<Test[]>('tests/attempted')
}
