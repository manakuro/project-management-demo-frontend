import type React from 'react'
import { memo, useCallback, useMemo } from 'react'
import { useTaskActivityTaskIds } from 'src/components/features/organisms/Inbox/hooks'
import { Flex, type FlexProps, Icon, Link } from 'src/components/ui/atoms'
import { formatDueDate } from 'src/shared/date'
import { useTask } from 'src/store/entities/task'
import { transitions } from 'src/styles'

type Props = FlexProps & {
  taskActivityId: string
}

export const Title: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props
  const { taskIds } = useTaskActivityTaskIds(taskActivityId)
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
