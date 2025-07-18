import { useMeQuery as useMeQueryApollo } from 'src/graphql/hooks';
import { initialMeState, useMeResponse } from 'src/store/entities/me';

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
