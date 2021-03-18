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
  const [value, setValue] = React.useState<Date | null>(new Date())

  return (
    <Popover isOpen={props.isOpen} isLazy placement={props.placement}>
      <PopoverTrigger>
        <Link>{props.children}</Link>
      </PopoverTrigger>
      <PopoverContent
        w="276px"
        className="PopoverDueDatePicker"
        pointerEvents="auto"
      >
        <PopoverBody p={4}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue as Date)
            }}
            minDate={new Date()}
            maxDate={new Date('2022/3/12')}
          />
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
