import React, { memo, useCallback } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import {
  ListStatus,
  BACKLOG,
  DONE,
  IN_PROGRESS,
  IN_REVIEW,
  READY,
} from './listState'

type Props = {}

export const Section: React.FC<Props> = memo<Props>(() => {
  const handleChange = useCallback((listStatus: ListStatus) => {
    console.log('hey: ', listStatus)
  }, [])

  return (
    <MenuSelect<ListStatus> onChange={handleChange} placement="bottom-start">
      <MenuSelectButton
        as={Button}
        variant="ghost"
        size="xs"
        cursor="pointer"
        rightIcon={
          <Icon mt="1px" icon="chevronDown" color="text.muted" size="md" />
        }
      >
        Backlog
      </MenuSelectButton>
      <MenuSelectList>
        <MenuItemOption value={BACKLOG}>Backlog</MenuItemOption>
        <MenuItemOption value={DONE}>Done</MenuItemOption>
        <MenuItemOption value={IN_PROGRESS}>In progress</MenuItemOption>
        <MenuItemOption value={IN_REVIEW}>In review</MenuItemOption>
        <MenuItemOption value={READY}>Ready</MenuItemOption>
      </MenuSelectList>
    </MenuSelect>
  )
})
