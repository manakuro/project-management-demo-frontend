import React, { memo, useCallback, useMemo } from 'react'
import { Flex, FlexProps, Icon, Link } from 'src/components/atoms'
import { formatDueDate } from 'src/shared/date'
import { useMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/myTaskActivityTasks'
import { useTask } from 'src/store/entities/tasks'
import { transitions } from 'src/styles'

type Props = FlexProps & {
  taskActivityId: string
}

export const Title: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props
  const { taskIds } = useMyTaskActivityTasksTaskIds(taskActivityId)
  const { task } = useTask(taskIds[0])
  const text = useMemo(
    () => `Your tasks for ${formatDueDate(task.dueDate)}`,
    [task.dueDate],
  )

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }, [])

  return (
    <Flex flex={1} mt={1}>
      <Flex alignItems="center">
        <Icon icon="calendarAlt" color="text.muted" />
        <Link
          mt="2px"
          fontSize="md"
          fontWeight="medium"
          ml={2}
          transition={transitions.base()}
          hover
          onClick={handleClick}
        >
          {text}
        </Link>
      </Flex>
    </Flex>
  )
})

Title.displayName = 'Title'
