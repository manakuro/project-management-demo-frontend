import {
  useInboxListItem,
  useTaskActivityTaskIds,
  useWorkspaceActivityTaskIds,
} from '@/components/features/organisms/Inbox/hooks';
import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { isInboxDetailURL, useRouter } from '@/router';
import { useActivityType } from '@/store/entities/activityType';
import { useEffect, useMemo } from 'react';

type Props = {
  listItemId?: string;
};

export const useInboxList = (props: Props) => {
  const listItemId = useMemo(() => props.listItemId, [props.listItemId]);
  const { router } = useRouter();
  const { setId } = useTaskDetail();
  const { listItem } = useInboxListItem(listItemId || '');
  const { isWorkspaceType, isTaskType } = useActivityType();
  const workspaceListTaskIdsResult = useWorkspaceActivityTaskIds(listItem.id);
  const myTaskListTaskIdsResult = useTaskActivityTaskIds(listItem.id);

  useEffect(() => {
    if (isInboxDetailURL(router)) return;
    if (!listItemId) return;

    if (isWorkspaceType(listItem.type)) {
      setId(workspaceListTaskIdsResult.taskIds[0]);
    }
    if (isTaskType(listItem.type)) {
      setId(myTaskListTaskIdsResult.taskIds[0]);
    }
  }, [
    listItemId,
    listItem.type,
    isTaskType,
    isWorkspaceType,
    router,
    setId,
    myTaskListTaskIdsResult.taskIds,
    workspaceListTaskIdsResult.taskIds,
  ]);
};
