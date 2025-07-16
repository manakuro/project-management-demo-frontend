import { memo } from 'react'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'
import { Content } from './Content'

export const TaskDetailSide = memo(function TaskDetailSide() {
  const { loading } = useTaskDetail()

  return <Content loading={loading} />
})
