import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useTaskCollaboratorDeletedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import type { TaskCollaboratorDeletedSubscriptionResponse as Response } from '../type';
import { useResetTaskCollaborator } from './useResetTaskCollaborator';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_COLLABORATOR_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskCollaboratorDeletedSubscription = (props: Props) => {
  const { resetTaskCollaborator } = useResetTaskCollaborator();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_COLLABORATOR_DELETED_SUBSCRIPTION_REQUEST_ID,
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
    () => (response: Response) => {
      const taskCollaboratorDeleted = response.taskCollaboratorDeleted;

      if (__DEV__) console.log('Task Collaborator Deleted!: ');

      resetTaskCollaborator(taskCollaboratorDeleted.id);
    },
    [resetTaskCollaborator],
  );

  return {
    subscriptionResult,
  };
};
