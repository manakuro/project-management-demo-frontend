import React, { memo, useCallback, useMemo } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { useTaskStatusFromTasks } from 'src/components/organisms/Tasks/hooks'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
  TaskListSortStatusType,
} from 'src/store/app/myTasks'

type Props = {
  projectSortable?: boolean
}

const ITEMS: {
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

export const SortButton: React.VFC<Props> = memo<Props>((props) => {
  const { onSort, isSorted, sortStatus } = useTaskStatusFromTasks()
  const handleChange = useCallback(
    (status: ToString<TaskListSortStatusType>) => {
      onSort(Number(status) as TaskListSortStatusType)
    },
    [onSort],
  )
  const projectSortable = useMemo(
    () => props.projectSortable ?? true,
    [props.projectSortable],
  )
  const items = useMemo(() => {
    return ITEMS.filter((i) => {
      if (!projectSortable && i.value === TASK_LIST_SORT_STATUS_TYPE_PROJECT)
        return false
      return true
    })
  }, [projectSortable])

  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''
    if (!projectSortable && isSorted('project')) return ''

    return `: ${items.find((i) => i.value === sortStatus)!.text}`
  }, [isSorted, items, projectSortable, sortStatus])

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
