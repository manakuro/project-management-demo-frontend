import { ApolloProvider as ApolloProviderLibs } from '@apollo/client'
import React, { useMemo } from 'react'
import { useAuth } from 'src/hooks/useAuth'
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
