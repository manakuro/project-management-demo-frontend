import { memo } from 'react';
import { LikeTaskIconButton } from 'src/components/features/molecules/LikeTaskIconButton';
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
