import React, { memo, useCallback, useMemo } from 'react'
import { Button, Icon } from 'src/components/atoms'
import {
  MenuItemOption,
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms'
import { SortStatuses, useMyTasksTaskStatus } from 'src/store/app/myTasks'

type Props = {}

const items: {
  value: SortStatuses
  text: string
}[] = [
  {
    value: 'none',
    text: 'None',
  },
  {
    value: 'dueDate',
    text: 'Due Date',
  },
  {
    value: 'likes',
    text: 'Likes',
  },
  {
    value: 'alphabetical',
    text: 'Alphabetical',
  },
  {
    value: 'project',
    text: 'Project',
  },
]

export const SortButton: React.VFC<Props> = memo<Props>(() => {
  const { onSort, isSorted } = useMyTasksTaskStatus()
  const handleChange = useCallback(
    (status: SortStatuses) => {
      onSort(status)
    },
    [onSort],
  )
  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''

    return `: ${items.find((i) => isSorted(i.value))!.text}`
  }, [isSorted])

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
