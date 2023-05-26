import React, { memo, useCallback } from 'react'
import { Icon, PortalManager } from 'src/components/ui/atoms'
import { Menu, MenuButton } from 'src/components/ui/organisms/Menu'
import { useClickableHoverStyle } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = {
  workspaceId: string
}

export const WorkspaceMenu: React.FC<Props> = memo<Props>((props) => {
  const { workspaceId } = props
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      e.preventDefault()

      onOpen()
    },
    [onOpen],
  )

  return (
    <PortalManager zIndex={1500}>
      <Menu placement="bottom-start" isLazy isOpen={isOpen}>
        <MenuButton {...clickableHoverLightStyle} onClick={handleClick}>
          <Icon icon="dotsHorizontalRounded" color="white" />
        </MenuButton>
        {isOpen && <MenuList onClose={onClose} workspaceId={workspaceId} />}
      </Menu>
    </PortalManager>
  )
})
WorkspaceMenu.displayName = 'WorkspaceMenu'
