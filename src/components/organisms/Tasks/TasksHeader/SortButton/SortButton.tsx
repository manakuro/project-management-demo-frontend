import React, { memo, useCallback, useMemo } from 'react'
import { Button, Icon } from 'src/components/atoms'
import {
  MenuItemOption,
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms'
import {
  SortStatuses,
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
  TaskListSortStatusType,
  useMyTasksTaskStatus,
} from 'src/store/app/myTasks'

type Props = {}

const items: {
  type: TaskListSortStatusType
  value: SortStatuses
  text: string
}[] = [
  {
    type: TASK_LIST_SORT_STATUS_TYPE_NONE,
    value: 'none',
    text: 'None',
  },
  {
    type: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
    value: 'dueDate',
    text: 'Due Date',
  },
  {
    type: TASK_LIST_SORT_STATUS_TYPE_LIKES,
    value: 'likes',
    text: 'Likes',
  },
  {
    type: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
    value: 'alphabetical',
    text: 'Alphabetical',
  },
  {
    type: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
    value: 'project',
    text: 'Project',
  },
]

export const SortButton: React.VFC<Props> = memo<Props>(() => {
  const { onSort, sortStatus, isSorted } = useMyTasksTaskStatus()
  const handleChange = useCallback(
    (status: SortStatuses) => {
      onSort(status)
    },
    [onSort],
  )
  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''

    return `: ${items.find((i) => i.type === sortStatus)!.text}`
  }, [isSorted, sortStatus])

  return (
    <MenuSelect<SortStatuses> onChange={handleChange} placement="bottom-end">
      <MenuSelectButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="sort" />}
        size="xs"
      >
        Sort{text}
      </MenuSelectButton>
      <MenuSelectList>
        {items.map((item, i) => (
          <MenuItemOption value={item.value} key={i}>
            {item.text}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
