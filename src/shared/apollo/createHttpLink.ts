import { HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { config } from 'src/config'
import { websocketErrorHandler } from 'src/shared/apollo/errorHandler'
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
        await websocketErrorHandler(errors)
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
