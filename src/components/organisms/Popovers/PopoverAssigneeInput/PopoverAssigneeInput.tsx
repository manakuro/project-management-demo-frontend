import React, { useCallback } from 'react'
import { Link, PortalManager } from 'src/components/atoms'
import {
  Popover,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms/Popover'
import { useDisclosure } from 'src/shared/chakra'
import { Content } from './Content'

type Props = {
  taskId: string
  onOpened?: () => void
  onClosed?: () => void
} & PopoverProps

export const PopoverAssigneeInput: React.FC<Props> = (props) => {
  const { taskId } = props
  const popoverDisclosure = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handleOpen = useCallback(() => {
    popoverDisclosure.onOpen()
    props.onOpened?.()
  }, [popoverDisclosure, props])

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose()
    // Prevent flush when closing popover
    setTimeout(() => {
      props.onClosed?.()
    }, 60)
  }, [popoverDisclosure, props])

  return (
    <PortalManager zIndex={1500}>
      <Popover
        placement="bottom-end"
        isOpen={popoverDisclosure.isOpen}
        initialFocusRef={inputRef}
        isLazy
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link onClick={handleOpen}>{props.children}</Link>
        </PopoverTrigger>
        {popoverDisclosure.isOpen && (
          <Content taskId={taskId} onClose={handleClose} />
        )}
      </Popover>
    </PortalManager>
  )
}
