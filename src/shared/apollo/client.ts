import { config } from 'src/config'
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from 'src/libs/apollo/client'
import { getMainDefinition } from 'src/libs/apollo/utilities'
import { WebSocketLink } from 'src/libs/apollo/ws'
import { isClient } from 'src/shared/environment'

const httpLink = new HttpLink({
  uri: config.API_URL,
})

const createLink = () => {
  if (isClient()) {
    const wsLink = new WebSocketLink({
      uri: config.API_SUBSCRIPTION_URL,
      options: {
        reconnect: true,
      },
    })

    return split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink,
    )
  }

  return httpLink
}

export const client = new ApolloClient({
  link: createLink(),
  cache: new InMemoryCache(),
})
