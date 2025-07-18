import { useMemo } from 'react';
import { LikeTaskIconButton } from 'src/components/features/molecules/LikeTaskIconButton';
import { useTaskLikesByTaskId } from 'src/store/entities/taskLike';
import { useTasksNameContext } from '../TasksNameProvider';

export function Like() {
  const { taskId } = useTasksNameContext();
  const { taskLikes } = useTaskLikesByTaskId(taskId);
  const show = useMemo(() => !!taskLikes.length, [taskLikes.length]);

  return (
    <LikeTaskIconButton
      taskId={taskId}
      show={show}
      size="xs"
      h={5}
      textStyle={{ mt: 0 }}
    />
  );
}
