import React, { memo, useCallback, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMyTaskListTaskIds } from 'src/components/organisms/Inbox'
import { useRouter } from 'src/router'

type Props = FlexProps & {
  myTaskListId: string
}

export const ClickHandler: React.FC<Props> = memo<Props>((props) => {
  const { myTaskListId } = props
  const { taskIds } = useMyTaskListTaskIds(myTaskListId)
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
