import React, { memo, useCallback, useMemo } from 'react'
import { Button, Icon } from 'src/components/atoms'
import {
  MenuItemOption,
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
  useTaskStatusContext,
} from 'src/components/organisms'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
  TaskListSortStatusType,
} from 'src/store/app/myTasks'

type Props = {}

const items: {
  value: TaskListSortStatusType
  text: string
}[] = [
  {
    value: TASK_LIST_SORT_STATUS_TYPE_NONE,
    text: 'None',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
    text: 'Due Date',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_LIKES,
    text: 'Likes',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
    text: 'Alphabetical',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
    text: 'Project',
  },
]

export const SortButton: React.VFC<Props> = memo<Props>(() => {
  const { onSort, isSorted, sortStatus } = useTaskStatusContext()
  const handleChange = useCallback(
    (status: ToString<TaskListSortStatusType>) => {
      onSort(Number(status) as TaskListSortStatusType)
    },
    [onSort],
  )
  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''
    return `: ${items.find((i) => i.value === sortStatus)!.text}`
  }, [isSorted, sortStatus])

  return (
    <MenuSelect<ToString<TaskListSortStatusType>>
      onChange={handleChange}
      placement="bottom-end"
    >
      <MenuSelectButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="sort" />}
        size="xs"
      >
        Sort{text}
      </MenuSelectButton>
      <MenuSelectList defaultValue={sortStatus.toString()}>
        {items.map((item, i) => (
          <MenuItemOption value={item.value.toString()} key={i}>
            {item.text}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
