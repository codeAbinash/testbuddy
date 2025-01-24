import api from '@query/api'
import { create } from 'zustand'

export type Test = Awaited<ReturnType<typeof api.startTest>> | undefined
export type Section = NonNullable<NonNullable<NonNullable<Test>['test']>['sections']>[number]
export type Question = NonNullable<Section['questions']>[number]

type TestStore = {
  testId: string
  setTestId: (testId: string) => void
  testData: Test | null
  setTestData: (test: Test) => void
  setTest: (test: Test) => void
  allQn: Question[]
  setAllQn: (allQn: Question[]) => void
  clearTestData: () => void
}

const testStore = create<TestStore>((set) => ({
  testId: '',
  setTestId: (testId) => set({ testId }),
  testData: null,
  setTestData: (test) => set({ testData: test }),
  allQn: [],
  setTest: (test) => {
    set({
      testData: test,
      allQn: [
        ...(test?.test?.sections?.[0]?.questions || []),
        ...(test?.test?.sections?.[1]?.questions || []),
        ...(test?.test?.sections?.[2]?.questions || []),
      ],
    })
  },
  setAllQn: (allQn) => set({ allQn }),
  clearTestData: () => set({ testData: null, allQn: [] }),
}))

export default testStore
