import { config } from 'src/config'
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  from,
} from 'src/libs/apollo/client'
import { onError } from 'src/libs/apollo/error'
import { getMainDefinition } from 'src/libs/apollo/utilities'
import { WebSocketLink } from 'src/libs/apollo/ws'
import { isClient } from 'src/shared/environment'

type CreateLinkProps = {
  idToken: string
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log('graphQLErrors: ', graphQLErrors)
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

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
        connectionParams: () => ({
          authorization: `Bearer ${props.idToken}`,
        }),
        connectionCallback: (err) => {
          const errors = Array.isArray(err) ? err : [err]
          const authError = errors.find(
            (e) => ~e?.message.indexOf('has expired at'),
          )
          if (authError) {
            console.error('auth error!')
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
    link: from([errorLink, createLink(props)]),
    cache: new InMemoryCache(),
  })
}
