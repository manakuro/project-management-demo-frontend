import { useTaskCollaboratorDeletedSubscription as useSubscription } from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
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

  const setBySubscription = useAtomCallback(
    useCallback(
      (_get, _set, response: Response) => {
        const taskCollaboratorDeleted = response.taskCollaboratorDeleted;

        if (__DEV__) console.log('Task Collaborator Deleted!: ');

        resetTaskCollaborator(taskCollaboratorDeleted.id);
      },
      [resetTaskCollaborator],
    ),
  );

  return {
    subscriptionResult,
  };
};
