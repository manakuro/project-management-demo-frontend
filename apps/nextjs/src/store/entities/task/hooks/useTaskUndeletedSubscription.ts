import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { useTaskUndeletedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import { useResetDeletedTask } from 'src/store/entities/deletedTask';
import { useProjectTaskResponse } from 'src/store/entities/projectTask';
import { useTeammateTaskResponse } from 'src/store/entities/teammateTask';
import type { TaskUndeletedSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskUndeletedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse();
  const { setProjectTask } = useProjectTaskResponse();
  const { resetDeletedTask } = useResetDeletedTask();

  const setBySubscription = useCallback(
    async (response: Response) => {
      const data = response.taskUndeleted;

      if (__DEV__) console.log('Task undeleted!');

      if (data.deletedTask) {
        resetDeletedTask(data.deletedTask.id);
      }
      if (data.projectTasks.length) {
        setProjectTask(data.projectTasks, { includeTask: false });
      }
      if (data.teammateTask) {
        setTeammateTask([data.teammateTask]);
      }
    },
    [resetDeletedTask, setProjectTask, setTeammateTask],
  );

  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID,
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
  });

  return {
    subscriptionResult,
  };
};
