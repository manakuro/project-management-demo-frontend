import React, { useCallback } from 'react'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuProps,
  MenuItemOption,
  MenuOptionGroup,
} from 'src/components/organisms'
import { chakra } from 'src/shared/chakra'
import {
  ListStatus,
  ONE_WEEK,
  TWO_WEEK,
  THREE_WEEK,
  YESTERDAY,
  ALL_COMPLETED_TASKS,
  TODAY,
} from 'src/components/organisms/Tasks/TasksHeader/IncompleteTasksButton/listState'

type Props = {
  onClose: () => void
  listStatus?: ListStatus
  onChange: (listStatus: ListStatus) => void
} & MenuProps

export const PopoverCompletedTasks: React.FC<Props> = (props) => {
  const handleChange = useCallback(
    (listStatus: string | string[] | undefined) => {
      props.onChange(listStatus as ListStatus)
      props.onClose()
    },
    [props],
  )

  return (
    <Menu closeOnBlur={false} closeOnSelect={false} isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="30px">
        <MenuOptionGroup
          value={props.listStatus}
          type="radio"
          onChange={handleChange}
        >
          <MenuItemOption value={ALL_COMPLETED_TASKS} as="div">
            All Completed Tasks
          </MenuItemOption>
          <MenuOptionGroup
            value={props.listStatus}
            title="Marked complete since:"
            color="text.muted"
            fontSize="xs"
            onChange={handleChange}
          >
            <MenuItemOption as="div" value={TODAY}>
              Today
            </MenuItemOption>
            <MenuItemOption as="div" value={YESTERDAY}>
              Yesterday
            </MenuItemOption>
            <MenuItemOption as="div" value={ONE_WEEK}>
              1 week
            </MenuItemOption>
            <MenuItemOption as="div" value={TWO_WEEK}>
              2 weeks
            </MenuItemOption>
            <MenuItemOption as="div" value={THREE_WEEK}>
              3 weeks
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
})
