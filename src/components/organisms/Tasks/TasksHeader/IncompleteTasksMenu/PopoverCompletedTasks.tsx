import React, { useCallback } from 'react'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuProps,
  MenuItemOption,
  MenuOptionGroup,
} from 'src/components/organisms/Menu'
import { chakra } from 'src/shared/chakra'
import {
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY,
  TaskListCompletedStatusType,
} from 'src/store/entities/taskListStatus'

type Props = {
  onClose: () => void
  listStatus?: ToString<TaskListCompletedStatusType>
  onChange: (listStatus: ToString<TaskListCompletedStatusType>) => void
} & MenuProps

export const PopoverCompletedTasks: React.FC<Props> = (props) => {
  const handleChange = useCallback(
    (listStatus?: string | string[]) => {
      props.onChange(listStatus as ToString<TaskListCompletedStatusType>)
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
          <MenuItemOption
            value={TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED.toString()}
            as="div"
          >
            All Completed Tasks
          </MenuItemOption>
          <MenuOptionGroup
            value={props.listStatus}
            title="Marked complete since:"
            color="text.muted"
            fontSize="xs"
            onChange={handleChange}
          >
            <MenuItemOption
              as="div"
              value={TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY.toString()}
            >
              Today
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY.toString()}
            >
              Yesterday
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK.toString()}
            >
              1 week
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS.toString()}
            >
              2 weeks
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS.toString()}
            >
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
