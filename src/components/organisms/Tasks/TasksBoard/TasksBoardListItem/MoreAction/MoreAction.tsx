import React, { memo, useCallback, useMemo } from 'react'
import { Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { useDisclosure } from 'src/shared/chakra'
import {
  useTasksBoardListItemContext,
  useTasksBoardListItemInputContext,
} from '../Provider'
import { MenuList } from './MenuList'

type Props = {
  taskId: string
}

export const MoreAction: React.FC<Props> = memo<Props>((props) => {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const { isHovering } = useTasksBoardListItemContext()
  const { inputFocused, isHovering: isHoveringInput } =
    useTasksBoardListItemInputContext()

  const show = useMemo<boolean>(() => {
    if (inputFocused) return false
    if (isHoveringInput) return false
    if (isOpen) return true
    if (isHovering) return true
    return false
  }, [isHovering, isOpen, inputFocused, isHoveringInput])

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onOpen()
    },
    [onOpen],
  )

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
          aria-label="More actions"
          as={IconButton}
          icon={
            <Icon icon="dotsHorizontalRounded" color="text.muted" ml="1px" />
          }
          variant="ghost"
          size="sm"
          position="absolute"
          top={2}
          right={2}
          onClick={handleOpen}
          display={show ? 'block' : 'none'}
        />
        {isOpen && <MenuList onCloseMenu={onClose} taskId={props.taskId} />}
      </Menu>
    </PortalManager>
  )
})
MoreAction.displayName = 'MoreAction'
