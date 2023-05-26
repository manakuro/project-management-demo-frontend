import React, { memo, useCallback } from 'react'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { Icon, PortalManager } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = {
  projectId: string
}

export const ProjectMenu: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
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
        {isOpen && <MenuList onClose={onClose} projectId={projectId} />}
      </Menu>
    </PortalManager>
  )
})
ProjectMenu.displayName = 'ProjectMenu'
