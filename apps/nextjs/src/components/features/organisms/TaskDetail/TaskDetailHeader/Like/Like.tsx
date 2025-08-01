import { LikeTaskIconButton } from '@/components/features/molecules/LikeTaskIconButton';
import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { memo } from 'react';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
