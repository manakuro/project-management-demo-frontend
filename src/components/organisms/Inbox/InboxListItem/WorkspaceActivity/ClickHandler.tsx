import React, { memo, useCallback, useMemo } from 'react'
import { useWorkspaceActivityTaskIds } from 'src/components/organisms/Inbox/hooks'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { useRouter } from 'src/router'

type Props = FlexProps & {
  workspaceActivityId: string
}

export const ClickHandler: React.FC<Props> = memo<Props>((props) => {
  const { workspaceActivityId } = props
  const { taskIds } = useWorkspaceActivityTaskIds(workspaceActivityId)
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
    <Flex flex={1} onClick={handleClick} maxW="full">
      {props.children}
    </Flex>
  )
})

ClickHandler.displayName = 'ClickHandler'
