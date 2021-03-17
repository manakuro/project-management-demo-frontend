import React from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Divider, Flex, Link } from 'src/components/atoms'
import { DatePicker } from 'src/components/organisms'

type Props = {} & PopoverProps

export const dueDatePickerCustomStyle = () => ({
  '.PopoverDueDatePicker .MuiPickersStaticWrapper-root': {
    width: '100%',
    minWidth: '100% !important',
    minHeight: '236px',
  },
  '.PopoverDueDatePicker .MuiPickerView-root': {
    width: '100% !important',
  },
  '.PopoverDueDatePicker .MuiPickersCalendar-root': {
    minHeight: '160px !important',
  },
  '.PopoverDueDatePicker .MuiPickersDay-root': {
    width: '30px !important',
    height: '30px !important',
  },
  '.PopoverDueDatePicker .MuiPickersCalendarHeader-root': {
    marginTop: '0 !important',
    paddingLeft: '21px !important',
  },
  '.PopoverDueDatePicker .MuiPickersCalendar-weekDayLabel': {
    width: '30px !important',
    height: '30px !important',
  },
  '.PopoverDueDatePicker .MuiPickersCalendarHeader-label': {
    fontSize: 'sm',
  },
  '.PopoverDueDatePicker .MuiPickersYear-yearButton': {
    fontSize: 'sm',
    height: '26px !important',
  },
})

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
          <Flex>hey</Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
