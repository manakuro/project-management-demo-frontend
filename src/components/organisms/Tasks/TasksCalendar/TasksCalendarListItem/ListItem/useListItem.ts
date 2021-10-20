import React, { useCallback } from 'react'
import { useTasksRouter } from 'src/components/organisms/Tasks/hooks'

type Props = {
  taskId: string
}

export const useListItem = (props: Props) => {
  const { taskId } = props
  const { navigateToTaskDetail } = useTasksRouter()

  const onOpenTaskDetail = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      await navigateToTaskDetail(taskId)
    },
    [navigateToTaskDetail, taskId],
  )

  return {
    onOpenTaskDetail,
  }
}
