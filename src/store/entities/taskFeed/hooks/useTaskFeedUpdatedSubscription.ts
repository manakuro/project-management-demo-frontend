import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useTaskFeedUpdatedSubscription as useSubscription } from 'src/graphql/hooks';
import { isULID } from 'src/shared/ulid';
import { uuid } from 'src/shared/uuid';
import type { TaskFeedUpdatedSubscriptionResponse } from '../type';
import { useTaskFeedResponse } from './useTaskFeedResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskFeedUpdatedSubscription = (props: Props) => {
  const { setTaskFeed } = useTaskFeedResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId || !isULID(props.workspaceId),
    [props.workspaceId],
  );

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
        setTaskBySubscription(data.subscriptionData.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  const setTaskBySubscription = useRecoilCallback(
    () => async (response: TaskFeedUpdatedSubscriptionResponse) => {
      const updated = response.taskFeedUpdated;

      console.log('subscription updated!: ');

      setTaskFeed([updated]);
    },
    [setTaskFeed],
  );
};
