import { onError } from 'src/libs/apollo/error'
import { graphqlErrorHandler } from 'src/shared/apollo/errorHandler'

export const createErrorLink = () =>
  onError((error) => {
    graphqlErrorHandler(error)
  })
