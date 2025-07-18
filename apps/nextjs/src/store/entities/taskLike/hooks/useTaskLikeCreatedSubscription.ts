import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useTaskLikeCreatedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import type { TaskLikeCreatedSubscriptionResponse as Response } from '../type';
import { useTaskLikeResponse } from './useTaskLikeResponse';

export const TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const useTaskLikeCreatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId;
  }, [props.workspaceId]);

  const { setTaskLikes } = useTaskLikeResponse();

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
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
    skip: skipSubscription,
  });

  const setBySubscription = useRecoilCallback(
    () => async (response: Response) => {
      const taskLikeCreated = response.taskLikeCreated;

      if (__DEV__) console.log('TaskLike created!: ');

      setTaskLikes([taskLikeCreated]);
    },
    [setTaskLikes],
  );
};
