import { ErrorResponse } from '@apollo/client/link/error'
import { resetApolloLink } from 'src/shared/apollo/client'

// For websocket
export const websocketErrorHandler = async (errors: Error[]) => {
  const authError = errors.find((e) => ~e?.message.indexOf('has expired at'))
  if (authError) {
    console.error('auth error!')
    await resetApolloLink()
  }
}

// For graphql
export const graphqlErrorHandler = ({
  graphQLErrors,
  networkError,
}: ErrorResponse) => {
  console.log('graphQLErrors: ', graphQLErrors)
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
}
