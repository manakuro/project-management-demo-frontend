import React, { memo, useCallback } from 'react'
import { Button, Icon } from 'src/components/atoms'
import {
  MenuItemOption,
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms'
import { SortStatuses, useMyTasksTaskStatus } from 'src/store/app/myTasks'

type Props = {}

export const SortButton: React.VFC<Props> = memo<Props>(() => {
  const { onSort } = useMyTasksTaskStatus()
  const handleChange = useCallback(
    (status: SortStatuses) => {
      onSort(status)
    },
    [onSort],
  )

  return (
    <MenuSelect<SortStatuses> onChange={handleChange} placement="bottom-end">
      <MenuSelectButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="sort" />}
        size="xs"
      >
        Sort
      </MenuSelectButton>
      <MenuSelectList>
        <MenuItemOption value="none">None</MenuItemOption>
        <MenuItemOption value="dueDate">Due date</MenuItemOption>
        <MenuItemOption value="likes">Likes</MenuItemOption>
        <MenuItemOption value="alphabetical">Alphabetical</MenuItemOption>
        <MenuItemOption value="project">Project</MenuItemOption>
      </MenuSelectList>
    </MenuSelect>
  )
})
