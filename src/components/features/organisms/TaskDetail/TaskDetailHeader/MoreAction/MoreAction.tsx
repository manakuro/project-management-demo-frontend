import React, { memo, useCallback } from 'react'
import { Icon, IconButton, PortalManager } from 'src/components/ui/atoms'
import { Tooltip } from 'src/components/ui/molecules'
import { Menu, MenuButton } from 'src/components/ui/organisms/Menu'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

type Props = {
  taskId: string
}

export const MoreAction: React.FC<Props> = memo<Props>((props) => {
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
        {isOpen && <MenuList onCloseMenu={onClose} taskId={props.taskId} />}
      </Menu>
    </PortalManager>
  )
})
MoreAction.displayName = 'MoreAction'
