import { useMeQuery as useMeQueryApollo } from '@/graphql/hooks';
import { initialMeState, useMeResponse } from '@/store/entities/me';

export const useMeQuery = () => {
  const { setMe } = useMeResponse();
  const queryResult = useMeQueryApollo({
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      setMe(data.me || initialMeState());
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
