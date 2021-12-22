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

type CreateLinkProps = {
  idToken: string
}

const createLink = (props: CreateLinkProps) => {
  const httpLink = new HttpLink({
    uri: config.API_URL,
    headers: {
      Authorization: `Bearer ${props.idToken}`,
    },
  })

  if (isClient()) {
    const wsLink = new WebSocketLink({
      uri: config.API_SUBSCRIPTION_URL,
      options: {
        lazy: true,
        reconnect: true,
        connectionParams: () => {
          return {
            headers: {
              Authorization: `Bearer ${props.idToken}`,
            },
          }
        },
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

type CreateClientProps = {
  idToken: string
}
export const createClient = (props: CreateClientProps) => {
  return new ApolloClient({
    link: createLink(props),
    cache: new InMemoryCache(),
  })
}

export const client = new ApolloClient({
  link: createLink({ idToken: '' }),
  cache: new InMemoryCache(),
})
