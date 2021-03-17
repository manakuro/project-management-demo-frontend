import React from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Button, Divider, Flex, Icon, IconBg, Link } from 'src/components/atoms'
import { DatePicker } from 'src/components/organisms'

type Props = {} & PopoverProps

export const PopoverDueDatePicker: React.FC<Props> = (props) => {
  return (
    <Popover
      isOpen={props.isOpen}
      isLazy
      placement={props.placement}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Link>{props.children}</Link>
      </PopoverTrigger>
      <PopoverContent
        w="276px"
        className="PopoverDueDatePicker"
        pointerEvents="auto"
      >
        <PopoverBody p={4}>
          <DatePicker />
          <Divider />
          <Flex mt={2}>
            <IconBg>
              <Icon icon="time" color="text.muted" />
            </IconBg>
            <Button variant="ghost" size="sm" ml="auto">
              Clear
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
