import { useAuthContext } from '@/providers/AuthProvider';
import { ApolloProvider as ApolloProviderLibs } from '@apollo/client';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { createApolloClient } from './client';

export function ApolloProvider({ children }: PropsWithChildren) {
  const { idToken } = useAuthContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const client = useMemo(
    () => createApolloClient({ idToken }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <ApolloProviderLibs client={client}>{children}</ApolloProviderLibs>;
}
