import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { memo } from 'react';
import { Content } from './Content';

export const TaskDetailSide = memo(function TaskDetailSide() {
  const { loading } = useTaskDetail();

  return <Content loading={loading} />;
});
