import type React from 'react'
import { memo, useCallback, useState } from 'react'
import { Flex, type FlexProps, Stack } from 'src/components/ui/atoms'
import { TaskDoneTransition } from 'src/components/ui/molecules'
import { useHover } from 'src/hooks/useHover'
import { useRouter } from 'src/router'
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { navigateToInboxDetail } = useRouter()
  const { ref, isHovering } = useHover()

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
    <Flex alignItems="center" ref={ref}>
      <Row
        isFirst={isFirst}
        isLast={isLast}
        onClick={handleClick}
        taskId={taskId}
      >
        <TaskDoneTransition isTransitioning={isTransitioning} />
        <CheckIcon
          taskId={taskId}
          isTransitioning={isTransitioning}
          onEndTransition={endTransition}
          onStartTransition={startTransition}
          zIndex={1}
        />
        <TaskName
          taskId={taskId}
          isTransitioning={isTransitioning}
          zIndex={1}
        />
        <Stack
          direction="row"
          spacing={1}
          ml="auto"
          alignItems="center"
          visibility={isHovering ? 'visible' : 'hidden'}
        >
          <Like taskId={taskId} />
          <Feed taskId={taskId} />
        </Stack>
      </Row>
    </Flex>
  )
})

TaskListItem.displayName = 'TaskListItem'
