import React from 'react'
import { Button, Icon } from 'src/components/atoms'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { TaskListSortStatusType } from 'src/store/entities/taskListStatus'

type Props<T extends TaskListSortStatusType> = {
  items: {
    value: T
    text: string
  }[]
  onChange: (status: ToString<T>) => void
  text: string
  defaultValue: string
}

export const SortMenu = <T extends TaskListSortStatusType>(props: Props<T>) => {
  const { items, onChange, text, defaultValue } = props

  return (
    <MenuSelect<ToString<T>> onChange={onChange} placement="bottom-end">
      <MenuSelectButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="sort" />}
        size="xs"
      >
        Sort{text}
      </MenuSelectButton>
      <MenuSelectList defaultValue={defaultValue}>
        {items.map((item, i) => (
          <MenuItemOption value={item.value.toString()} key={i}>
            {item.text}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
}
SortMenu.displayName = 'SortMenu'
