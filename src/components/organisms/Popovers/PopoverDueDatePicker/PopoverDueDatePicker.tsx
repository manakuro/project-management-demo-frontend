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
  closeOnChange?: boolean
} & PopoverProps

export const PopoverDueDatePicker: React.FC<Props> = (props) => {
  const popoverDisclosure = useDisclosure()
  const closeOnChange = props.closeOnChange ?? true

  const handleOpen = useCallback(() => {
    popoverDisclosure.onOpen()
    props.onOpened?.()
  }, [popoverDisclosure, props])

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose()
  }, [popoverDisclosure])

  const handleChange = useCallback(
    (date: Date) => {
      props.onChange(date)
      if (!closeOnChange) return
      popoverDisclosure.onClose()
    },
    [closeOnChange, popoverDisclosure, props],
  )

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
                onChange={handleChange}
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
