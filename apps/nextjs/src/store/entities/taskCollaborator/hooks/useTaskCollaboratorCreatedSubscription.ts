import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTaskCollaboratorCreatedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import { useTeammateResponse } from 'src/store/entities/teammate';
import type { TaskCollaboratorCreatedSubscriptionResponse as Response } from '../type';
import { useTaskCollaboratorResponse } from './useTaskCollaboratorResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskCollaboratorCreatedSubscription = (props: Props) => {
  const { setTaskCollaborators } = useTaskCollaboratorResponse();
  const { setTeammates } = useTeammateResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID,
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
        const taskCollaboratorCreated = response.taskCollaboratorCreated;

        if (__DEV__) console.log('Task Collaborator Created!: ');

        setTaskCollaborators([taskCollaboratorCreated]);
        setTeammates([taskCollaboratorCreated.teammate]);
      },
      [setTaskCollaborators, setTeammates],
    ),
  );

  return {
    subscriptionResult,
  };
};
