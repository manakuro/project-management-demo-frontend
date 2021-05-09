import React, { memo, useCallback } from 'react'
import { Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { Menu, MenuButton } from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = {}

export const MoreAction: React.FC<Props> = memo<Props>(() => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  return (
    <PortalManager zIndex={1500}>
      <Menu
        placement="bottom-end"
        closeOnBlur={false}
        closeOnSelect={false}
        isOpen={isOpen}
        isLazy
      >
        <Tooltip
          hasArrow
          label="More actions"
          aria-label="More actions button"
          size="sm"
          withIcon
        >
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
            variant="ghost"
            size="sm"
            onClick={handleOpen}
          />
        </Tooltip>
        {isOpen && <MenuList onCloseMenu={onClose} />}
      </Menu>
    </PortalManager>
  )
})
