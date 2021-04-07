import React, { memo, useCallback } from 'react'
import { Button, Icon } from 'src/components/atoms'
import {
  MenuButton,
  MenuItemOption,
  MenuSelect,
  MenuSelectList,
} from 'src/components/organisms'
import { NONE, ListStatus, PROJECT, DUE_DATE, LIKES } from './listState'

type Props = {}

export const SortButton: React.VFC<Props> = memo<Props>((props) => {
  const handleChange = useCallback((listStatus: ListStatus) => {
    console.log('hey: ', listStatus)
  }, [])

  return (
    <MenuSelect<ListStatus> onChange={handleChange} placement="bottom-end">
      {({ isOpen, onOpen, listStatus, onChange, onClose }) => (
        <>
          <MenuButton
            variant="ghost"
            aria-label="Sort tasks"
            as={Button}
            leftIcon={<Icon icon="sort" />}
            size="xs"
            onClick={onOpen}
          >
            Sort
          </MenuButton>
          <MenuSelectList
            isOpen={isOpen}
            listStatus={listStatus}
            onCloseMenu={onClose}
            onChange={onChange}
          >
            <MenuItemOption value={NONE}>None</MenuItemOption>
            <MenuItemOption value={PROJECT}>Project</MenuItemOption>
            <MenuItemOption value={DUE_DATE}>Due date</MenuItemOption>
            <MenuItemOption value={LIKES}>Likes</MenuItemOption>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  )
})
