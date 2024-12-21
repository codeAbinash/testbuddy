import api from "@query/api"

export type Test = Awaited<ReturnType<typeof api.startTest>> | undefined
export type Question = NonNullable<
  NonNullable<NonNullable<NonNullable<Test>['test']>['sections']>[number]['questions']
>[number]
