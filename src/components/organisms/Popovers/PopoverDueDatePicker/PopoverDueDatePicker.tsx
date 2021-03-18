import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Link } from 'src/components/atoms'
import { useDisclosure } from 'src/shared/chakra'
import { Body } from './Body'

type Props = {
  date: string
  onChange: (date: Date) => void
  time?: string
} & PopoverProps

export const PopoverDueDatePicker: React.FC<Props> = (props) => {
  const popoverDisclosure = useDisclosure()

  return (
    <Popover isOpen={popoverDisclosure.isOpen} isLazy closeOnBlur={false}>
      <PopoverTrigger>
        <Link onClick={popoverDisclosure.onOpen}>{props.children}</Link>
      </PopoverTrigger>
      <PopoverContent
        w="276px"
        className="PopoverDueDatePicker"
        pointerEvents="auto"
      >
        {popoverDisclosure.isOpen && (
          <Body
            date={props.date}
            onChange={props.onChange}
            time={props.time}
            onCloseMenu={popoverDisclosure.onClose}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
