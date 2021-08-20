import React, { useCallback } from 'react'
import { Button, Divider, Flex, FlexProps } from 'src/components/atoms'
import { DatePicker } from 'src/components/organisms/DatePicker'
import { PopoverBody, PopoverProps } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useDisclosure } from 'src/shared/chakra'
import { dateFns } from 'src/shared/dateFns'
import { DueTime } from './DueTime'

type Props = {
  date: string
  onChange: (date: Date) => void
  time?: string
  onCloseMenu: () => void
} & PopoverProps

const MIN_DATE = dateFns.addYears(new Date(), -1)
const MAX_DATE = dateFns.addYears(new Date(), 1)

export const Body: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<Date | null>(new Date(props.date))
  const dueTimeDisclosure = useDisclosure()
  const { ref } = useClickOutside(props.onCloseMenu)

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
    <PopoverBody p={4} ref={ref}>
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
  )
}
