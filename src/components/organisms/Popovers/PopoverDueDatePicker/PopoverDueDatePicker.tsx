import React, { useCallback } from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Button, Divider, Flex, FlexProps, Link } from 'src/components/atoms'
import { DatePicker } from 'src/components/organisms'
import { dateFns } from 'src/shared/dateFns'
import { DueTime } from './DueTime'
import { useDisclosure } from 'src/shared/chakra'

type Props = {
  date: string
  onChange: (date: Date) => void
  time?: string
} & PopoverProps

const MIN_DATE = new Date()
const MAX_DATE = dateFns.addYears(new Date(), 1)

export const PopoverDueDatePicker: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<Date | null>(new Date(props.date))
  const dueTimeDisclosure = useDisclosure()

  const handleAccept = useCallback(
    (newValue) => {
      props.onChange(newValue as Date)
    },
    [props],
  )
  const optionContainerStyle: FlexProps = dueTimeDisclosure.isOpen
    ? {
        flexDirection: 'column',
      }
    : {
        flexDirection: 'row',
      }
  const handleDueTimeClick = useCallback(() => {
    dueTimeDisclosure.onToggle()
  }, [dueTimeDisclosure])

  return (
    <Popover isLazy closeOnBlur={false}>
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
            onAccept={handleAccept}
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
          />
          <Divider />
          <Flex mt={2} {...optionContainerStyle} cursor="auto">
            <DueTime
              onClick={handleDueTimeClick}
              isEditing={dueTimeDisclosure.isOpen}
              time={props.time}
            />
            <Button
              variant="ghost"
              size="sm"
              ml="auto"
              mt={dueTimeDisclosure.isOpen ? 3 : 0}
            >
              Clear
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
