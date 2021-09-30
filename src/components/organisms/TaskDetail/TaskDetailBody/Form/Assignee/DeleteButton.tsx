import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
  isHovering: boolean
}

export const DeleteButton: React.FC<Props> = memo<Props>((props) => {
  const { isHovering, taskId } = props
  const { setTask } = useTask(taskId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      await setTask({ assigneeId: '' })
    },
    [setTask],
  )

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  )
})
DeleteButton.displayName = 'DeleteButton'
