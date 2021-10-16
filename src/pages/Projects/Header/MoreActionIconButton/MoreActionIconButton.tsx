import React, { memo, useCallback } from 'react'
import { Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = {
  projectId: string
}

export const MoreActionIconButton: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  return (
    <PortalManager zIndex={1500}>
      <Menu
        placement="bottom-start"
        closeOnBlur={false}
        closeOnSelect={false}
        isOpen={isOpen}
        isLazy
      >
        <MenuButton
          ml={1}
          aria-label="More actions"
          as={IconButton}
          icon={<Icon icon="chevronDown" color="text.muted" />}
          variant="ghost"
          onClick={handleOpen}
          h={6}
          w={6}
        />
        {isOpen && <MenuList onCloseMenu={onClose} projectId={projectId} />}
      </Menu>
    </PortalManager>
  )
})
MoreActionIconButton.displayName = 'MoreActionIconButton'
