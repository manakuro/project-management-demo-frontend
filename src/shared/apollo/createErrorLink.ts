import { onError } from 'src/libs/apollo/error'

export const createErrorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    console.log('graphQLErrors: ', graphQLErrors)
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })
