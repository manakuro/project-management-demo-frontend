// Generated by `yarn new:mutationMock`
import { graphql } from 'msw'
import { data } from './data'
import { Options, Mutation } from './type'

export const undeleteProjectTaskSectionAndKeepTasksMutation = (
  options?: Options,
) => {
  return graphql.mutation<Mutation>(
    'UndeleteProjectTaskSectionAndKeepTasks',
    (_, res, ctx) => {
      if (options?.networkError) {
        return res(
          ctx.errors([
            {
              message: 'Network request failed',
              graphQLErrors: [],
              networkError: new Error('error'),
              errorMessage: 'error',
              extraInfo: {},
            },
          ]),
        )
      }

      return res(ctx.data(data(options?.res, options?.deepMergeOptions)))
    },
  )
}
