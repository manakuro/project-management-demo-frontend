import React, { memo, useCallback, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useRouter } from 'src/router'
import { useMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/myTaskActivityTasks'

type Props = FlexProps & {
  taskActivityId: string
}

export const ClickHandler: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props
  const { taskIds } = useMyTaskActivityTasksTaskIds(taskActivityId)
  const taskId = useMemo(() => taskIds[0], [taskIds])
  const { navigateToInboxDetail } = useRouter()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      await navigateToInboxDetail(taskId)
    },
    [navigateToInboxDetail, taskId],
  )

  return (
    <Flex flex={1} onClick={handleClick}>
      {props.children}
    </Flex>
  )
})

ClickHandler.displayName = 'ClickHandler'
