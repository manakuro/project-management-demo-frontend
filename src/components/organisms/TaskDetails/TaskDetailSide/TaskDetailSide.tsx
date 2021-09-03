import React, { memo } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { Content } from './Content'

type Props = {}

export const TaskDetailSide: React.VFC<Props> = memo(() => {
  const { loading } = useTaskDetail()

  return <Content loading={loading} />
})
TaskDetailSide.displayName = 'TaskDetailSide'
