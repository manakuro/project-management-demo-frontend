import React, { useCallback } from 'react'
import { Link, Portal, PortalManager } from 'src/components/atoms'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { ChakraProps, useDisclosure } from 'src/shared/chakra'
import { Body } from './Body'

type Props = {
  date: string
  onChange: (date: Date) => void
  time?: string
  onOpened?: () => void
  onClosed?: () => void
  linkStyle?: ChakraProps
} & PopoverProps

export const PopoverDueDatePicker: React.FC<Props> = (props) => {
  const popoverDisclosure = useDisclosure()

  const handleOpen = useCallback(() => {
    popoverDisclosure.onOpen()
    props.onOpened?.()
  }, [popoverDisclosure, props])

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose()

    // Prevent flush when closing popover
    // setTimeout(() => {
    //   props.onClosed?.()
    // }, 60)
  }, [popoverDisclosure])

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isOpen={popoverDisclosure.isOpen}
        isLazy
        lazyBehavior="keepMounted"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link {...props.linkStyle} onClick={handleOpen}>
            {props.children}
          </Link>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            w="276px"
            minH="311px"
            className="PopoverDueDatePicker"
            pointerEvents="auto"
          >
            {popoverDisclosure.isOpen && (
              <Body
                date={props.date}
                onChange={props.onChange}
                time={props.time}
                onCloseMenu={handleClose}
              />
            )}
          </PopoverContent>
        </Portal>
      </Popover>
    </PortalManager>
  )
}
