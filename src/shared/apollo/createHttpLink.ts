import { config } from 'src/config'
import { split, HttpLink } from 'src/libs/apollo/client'
import { getMainDefinition } from 'src/libs/apollo/utilities'
import { WebSocketLink } from 'src/libs/apollo/ws'
import { resetApolloLink } from 'src/shared/apollo/client'
import { isClient } from 'src/shared/environment'
import { SubscriptionClient } from 'subscriptions-transport-ws'

export type CreateHttpProps = {
  idToken: string
}

export const createHttpLink = (props: CreateHttpProps) => {
  const httpLink = new HttpLink({
    uri: config.API_URL,
    headers: {
      Authorization: `Bearer ${props.idToken}`,
    },
  })

  if (isClient()) {
    const wsClient = new SubscriptionClient(config.API_SUBSCRIPTION_URL, {
      lazy: true,
      reconnect: true,
      connectionParams: () => ({
        authorization: `Bearer ${props.idToken}`,
      }),
      connectionCallback: async (err) => {
        const errors = Array.isArray(err) ? err : [err]
        const authError = errors.find(
          (e) => ~e?.message.indexOf('has expired at'),
        )
        if (authError) {
          console.error('auth error!')
          await resetApolloLink()
        }
      },
    })
    const wsLink = new WebSocketLink(wsClient)

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
