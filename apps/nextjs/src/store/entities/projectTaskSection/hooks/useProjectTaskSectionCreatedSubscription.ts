import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useProjectTaskSectionCreatedSubscription as useSubscription } from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import type { ProjectTaskSectionCreatedSubscriptionResponse as Response } from '../type';
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskSectionCreatedSubscription = (props: Props) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      (_, _set, response: Response) => {
        const updated = response.projectTaskSectionCreated;

        if (__DEV__) console.log('Project Task Section created!');

        setProjectsTaskSections([updated]);
      },
      [setProjectsTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
