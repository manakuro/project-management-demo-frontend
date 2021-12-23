import React, { useMemo } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { ApolloProvider as ApolloProviderLibs } from 'src/libs/apollo/client'
import { createClient } from './client'

export const ApolloProvider: React.FC = (props) => {
  const { idToken } = useAuth()

  const client = useMemo(() => createClient({ idToken }), [idToken])

  return (
    <ApolloProviderLibs client={client}>{props.children}</ApolloProviderLibs>
  )
}
