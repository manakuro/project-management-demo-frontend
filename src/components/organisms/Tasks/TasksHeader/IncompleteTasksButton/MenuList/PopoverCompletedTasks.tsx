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
  listStatus: ListStatus
  onChangeListStatus: (listStatus: ListStatus) => void
} & MenuProps

export const PopoverCompletedTasks: React.FC<Props> = (props) => {
  const handleAllCompletedTasks = useCallback(() => {
    props.onChangeListStatus(ALL_COMPLETED_TASKS)
    props.onClose()
  }, [props])

  const handleToday = useCallback(() => {
    props.onChangeListStatus(TODAY)
    props.onClose()
  }, [props])

  const handleYesterday = useCallback(() => {
    props.onChangeListStatus(YESTERDAY)
    props.onClose()
  }, [props])

  const handle1Week = useCallback(() => {
    props.onChangeListStatus(ONE_WEEK)
    props.onClose()
  }, [props])

  const handle2Week = useCallback(() => {
    props.onChangeListStatus(TWO_WEEK)
    props.onClose()
  }, [props])

  const handle3Week = useCallback(() => {
    props.onChangeListStatus(THREE_WEEK)
    props.onClose()
  }, [props])

  return (
    <Menu closeOnBlur={false} closeOnSelect={false} isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="30px">
        <MenuOptionGroup value={props.listStatus} type="radio">
          <MenuItemOption
            value={ALL_COMPLETED_TASKS}
            as="div"
            onClick={handleAllCompletedTasks}
          >
            All Completed Tasks
          </MenuItemOption>
          <MenuOptionGroup
            value={props.listStatus}
            title="Marked complete since:"
            color="text.muted"
            fontSize="xs"
          >
            <MenuItemOption as="div" value={TODAY} onClick={handleToday}>
              Today
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={YESTERDAY}
              onClick={handleYesterday}
            >
              Yesterday
            </MenuItemOption>
            <MenuItemOption as="div" value={ONE_WEEK} onClick={handle1Week}>
              1 week
            </MenuItemOption>
            <MenuItemOption as="div" value={TWO_WEEK} onClick={handle2Week}>
              2 weeks
            </MenuItemOption>
            <MenuItemOption as="div" value={THREE_WEEK} onClick={handle3Week}>
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
