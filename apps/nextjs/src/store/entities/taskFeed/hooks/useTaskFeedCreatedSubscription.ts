import isEqual from 'lodash-es/isEqual';
import { useRecoilCallback } from 'recoil';
import { useTaskFeedCreatedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import type { TaskFeedCreatedSubscriptionResponse } from '../type';
import { useTaskFeedResponse } from './useTaskFeedResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskFeedCreatedSubscription = (props: Props) => {
  const { setTaskFeed } = useTaskFeedResponse();

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID,
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
  });

  const setTaskBySubscription = useRecoilCallback(
    () => async (response: TaskFeedCreatedSubscriptionResponse) => {
      const updated = response.taskFeedCreated;

      console.log('subscription created! ');

      setTaskFeed([updated]);
    },
    [setTaskFeed],
  );
};
