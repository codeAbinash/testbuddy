import api from '@query/api/api'
import { postApi } from '@query/index'

export interface Test {
  _id: string
  test: Awaited<ReturnType<typeof api.testList>>[0]['tests'][0]
  status: string
  testStartTime: Date
  totalTimeCompleted: number
  percentCompleted: number
}

export function attemptedTestsList() {
  return postApi<Test[]>('tests/attempted')
}
