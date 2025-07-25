import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail';
import { SUBTASK_LIST_CONTAINER_ID } from 'src/components/features/organisms/TaskDetail/TaskDetailBody/Form/Subtasks';
import { useTasksRouter } from 'src/components/features/organisms/Tasks/hooks';
import { IconButton } from 'src/components/ui/atoms';
import { useSubtaskIds } from 'src/store/entities/task';
import { useTasksNameContext } from '../TasksNameProvider';
import { Icon } from './Icon';

export function Subtask() {
  const { taskId } = useTasksNameContext();
  const { taskIds } = useSubtaskIds(taskId);
  const size = useMemo(() => taskIds.length, [taskIds.length]);
  const { setScrollId } = useTaskDetail();
  const { navigateToTaskDetail } = useTasksRouter();

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setScrollId(SUBTASK_LIST_CONTAINER_ID);
      await navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, setScrollId, taskId],
  );

  if (!size) return null;

  return (
    <IconButton
      aria-label="The number of subtask"
      icon={<Icon size={size} />}
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    />
  );
}
