import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useWorkspaceUpdatedSubscription as useSubscription } from 'src/graphql/hooks';
import { isDescriptionEqual } from 'src/shared/editor/isDescriptionEqual';
import { uuid } from 'src/shared/uuid';
import { workspaceState } from '../atom';
import type { WorkspaceUpdatedSubscriptionResponse as Response } from '../type';
import { useHasDescriptionUpdated } from './useHasDescriptionUpdated';
import { useWorkspaceResponse } from './useWorkspaceResponse';

export const WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const useWorkspaceUpdatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId;
  }, [props.workspaceId]);

  const { setWorkspace } = useWorkspaceResponse();
  const { setHasDescriptionUpdated } = useHasDescriptionUpdated();

  useSubscription({
    variables: {
      id: props.workspaceId,
      requestId: WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
      async (get, _set, response: Response) => {
        const prev = get(workspaceState);
        const workspaceUpdated = response.workspaceUpdated;

        if (__DEV__) console.log('Workspace updated!: ');

        setWorkspace(workspaceUpdated);
        if (
          !isDescriptionEqual(prev.description, workspaceUpdated.description)
        ) {
          if (__DEV__) console.log('Workspace description updated!: ');
          setHasDescriptionUpdated((s) => s + 1);
        }
      },
      [setHasDescriptionUpdated, setWorkspace],
    ),
  );
};
