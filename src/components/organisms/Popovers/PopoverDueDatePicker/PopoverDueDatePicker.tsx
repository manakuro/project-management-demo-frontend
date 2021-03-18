import React, { useCallback } from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Button, Divider, Flex, Icon, IconBg, Link } from 'src/components/atoms'
import { DatePicker } from 'src/components/organisms'
import { dateFns } from 'src/shared/dateFns'

type Props = {
  date: string
  onChange: (date: Date) => void
} & PopoverProps

const MIN_DATE = new Date()
const MAX_DATE = dateFns.addYears(new Date(), 1)

export const PopoverDueDatePicker: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<Date | null>(new Date(props.date))

  const handleAccept = useCallback(
    (newValue) => {
      props.onChange(newValue as Date)
    },
    [props],
  )

  return (
    <Popover isLazy>
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
