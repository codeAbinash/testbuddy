import api from '@query/api'
import { create } from 'zustand'

export type Test = Awaited<ReturnType<typeof api.startTest>> | undefined
export type Question = NonNullable<
  NonNullable<NonNullable<NonNullable<Test>['test']>['sections']>[number]['questions']
>[number]

type TestStore = {
  testData: Test | null
  setTestData: (test: Test) => void
  allQn: Question[]
}

const testStore = create<TestStore>((set) => ({
  testData: null,
  setTestData: (test) => {
    set({
      testData: test,
      allQn: [
        ...(test?.test?.sections?.[0]?.questions || []),
        ...(test?.test?.sections?.[1]?.questions || []),
        ...(test?.test?.sections?.[2]?.questions || []),
      ],
    })
  },
  allQn: [],
}))



export default testStore
