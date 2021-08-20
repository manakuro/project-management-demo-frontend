import React, { memo } from 'react'
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

type Props = FlexProps

export const CalendarMonthPicker: React.VFC<Props> = memo<Props>((props) => {
  const { ...rest } = props

  return (
    <Flex {...rest} alignItems="center">
      <Text fontWeight="medium">August 2021</Text>
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
