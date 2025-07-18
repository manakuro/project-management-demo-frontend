import { ApolloProvider as ApolloProviderLibs } from '@apollo/client';
import type React from 'react';
import { useMemo } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { createApolloClient } from './client';

export const ApolloProvider: React.FCWithChildren = (props) => {
  const { idToken } = useAuth();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const client = useMemo(
    () => createApolloClient({ idToken }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ApolloProviderLibs client={client}>{props.children}</ApolloProviderLibs>
  );
};
