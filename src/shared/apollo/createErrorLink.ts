import { onError } from '@apollo/client/link/error'
import { graphqlErrorHandler } from 'src/shared/apollo/errorHandler'

export const createErrorLink = () =>
  onError((error) => {
    graphqlErrorHandler(error)
  })
