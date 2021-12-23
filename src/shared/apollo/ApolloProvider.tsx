import React, { useMemo } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { ApolloProvider as ApolloProviderLibs } from 'src/libs/apollo/client'
import { createApolloClient } from './client'

export const ApolloProvider: React.FC = (props) => {
  const { idToken } = useAuth()

  const client = useMemo(
    () => createApolloClient({ idToken }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <ApolloProviderLibs client={client}>{props.children}</ApolloProviderLibs>
  )
}
