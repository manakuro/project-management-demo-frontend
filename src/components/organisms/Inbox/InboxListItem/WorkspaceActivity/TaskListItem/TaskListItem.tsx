import React, { memo, useCallback, useState } from 'react'
import { DueDate, FlexProps, Stack } from 'src/components/atoms'
import { TaskDoneTransition } from 'src/components/molecules'
import { useRouter } from 'src/router'
import { useTask } from 'src/store/entities/tasks'
import { CheckIcon } from './CheckIcon'
import { Feed } from './Feed'
import { Like } from './Like'
import { Row } from './Row'
import { TaskName } from './TaskName'

type Props = FlexProps & {
  taskId: string
  isFirst?: boolean
  isLast?: boolean
}

export const TaskListItem: React.FC<Props> = memo<Props>((props) => {
  const { taskId, isFirst, isLast } = props
  const { task } = useTask(taskId)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { navigateToInboxDetail } = useRouter()

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      await navigateToInboxDetail(taskId)
    },
    [navigateToInboxDetail, taskId],
  )

  return (
    <Row isFirst={isFirst} isLast={isLast} onClick={handleClick}>
      <TaskDoneTransition isTransitioning={isTransitioning} />
      <CheckIcon
        taskId={taskId}
        isTransitioning={isTransitioning}
        onEndTransition={endTransition}
        onStartTransition={startTransition}
        zIndex={1}
      />
      <TaskName taskId={taskId} isTransitioning={isTransitioning} zIndex={1} />
      <Stack direction="row" spacing={1} ml="auto" alignItems="center">
        <DueDate fontSize="xs" dueDate={task.dueDate} />
        <Like taskId={taskId} />
        <Feed taskId={taskId} />
      </Stack>
    </Row>
  )
})

TaskListItem.displayName = 'TaskListItem'
