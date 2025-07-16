import isEqual from 'lodash-es/isEqual';
import { useRecoilCallback } from 'recoil';
import { useFavoriteWorkspaceIdsUpdatedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import type { FavoriteWorkspaceIdsUpdatedSubscriptionResponse as Response } from '../type';
import { useFavoriteWorkspaceIdsResponse } from './useFavoriteWorkspaceIdsResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

export const FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();

type Props = {
  teammateId: string;
};
export const useFavoriteWorkspaceIdsUpdatedSubscription = (props: Props) => {
  const { setFavoriteWorkspaceIds } = useFavoriteWorkspaceIdsResponse();

  useSubscription({
    variables: {
      teammateId: props.teammateId,
      requestId: FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return;

      if (data.subscriptionData.data)
        setBySubscription(data.subscriptionData.data);
      previousData = data;
    },
    skip: !props.teammateId,
  });

  const setBySubscription = useRecoilCallback(
    () => (response: Response) => {
      const favoriteWorkspaceIdsUpdated = response.favoriteWorkspaceIdsUpdated;

      if (__DEV__) console.log('Favorite Workspace IDs Created!: ');

      setFavoriteWorkspaceIds(favoriteWorkspaceIdsUpdated);
    },
    [setFavoriteWorkspaceIds],
  );
};
