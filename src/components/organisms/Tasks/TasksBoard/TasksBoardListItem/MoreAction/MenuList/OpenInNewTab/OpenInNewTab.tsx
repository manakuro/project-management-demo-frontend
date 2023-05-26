import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { Icon } from 'src/components/ui/atoms'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const OpenInNewTab: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props

  const handleClick = useCallback(() => {
    onCloseMenu()
  }, [onCloseMenu])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="linkExternal" color="text.muted" />}
      onClick={handleClick}
      isDisabled
    >
      Open in new tab
    </MenuItem>
  )
})

OpenInNewTab.displayName = 'OpenInNewTab'
