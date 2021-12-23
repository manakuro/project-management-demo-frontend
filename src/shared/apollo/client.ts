import { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, InMemoryCache } from 'src/libs/apollo/client'
import { refreshToken } from 'src/shared/firebase/auth'
import { createLink, CreateLinkProps } from './createLink'

type Props = CreateLinkProps
let client: ApolloClient<NormalizedCacheObject>
export const createApolloClient = (props: Props) => {
  const link = createLink(props)

  if (!client) {
    console.log('apollo client created!')
    client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
    return client
  }

  return client
}

export const resetApolloLink = async () => {
  const idToken = await refreshToken()!

  console.log('apollo client sets new link')
  client.setLink(createLink({ idToken }))
}
