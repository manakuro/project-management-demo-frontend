import React, { memo, useMemo } from 'react'
import {
  IconButton,
  Icon,
  Portal,
  Flex,
  FlexProps,
  Text,
} from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from 'src/components/organisms/Menu'
import { useTasksCalendarContext } from 'src/components/organisms/Tasks'
import { dateFns } from 'src/shared/dateFns'

type Props = FlexProps

export const CalendarMonthPicker: React.VFC<Props> = memo<Props>((props) => {
  const { ...rest } = props
  const { currentDate } = useTasksCalendarContext()
  const dateText = useMemo(() => {
    return dateFns.format(currentDate, 'MMMM y')
  }, [currentDate])

  return (
    <Flex {...rest} alignItems="center">
      <Text fontWeight="medium">{dateText}</Text>
      <Menu placement="bottom-start">
        <MenuButton
          ml={1}
          h={6}
          aria-label="Pick month"
          as={IconButton}
          icon={<Icon icon="chevronDown" color="text.muted" />}
          variant="ghost"
        />
        <Portal>
          <MenuList color="text.base">
            <MenuItem>Add section</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  )
})
CalendarMonthPicker.displayName = 'CalendarMonthPicker'
