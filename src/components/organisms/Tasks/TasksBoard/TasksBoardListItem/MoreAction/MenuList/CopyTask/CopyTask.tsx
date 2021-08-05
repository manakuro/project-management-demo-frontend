import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms'
import { useToast } from 'src/hooks'
import { taskDetailURL } from 'src/router'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const CopyTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props
  const { toast } = useToast()

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(taskDetailURL(props.taskId))
    toast({
      description: 'The task link was copied to your clipboard.',
    })
    onCloseMenu()
  }, [onCloseMenu, props.taskId, toast])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="link" color="text.muted" />}
      onClick={handleClick}
    >
      Copy task link
    </MenuItem>
  )
})

CopyTask.displayName = 'CopyTask'
