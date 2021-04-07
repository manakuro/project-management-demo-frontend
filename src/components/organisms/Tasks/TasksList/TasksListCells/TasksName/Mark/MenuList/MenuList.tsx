import React, { useCallback, useEffect } from 'react'
import { Portal } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItemOption,
  MenuOptionGroup,
} from 'src/components/organisms'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { TODAY, LATER, UPCOMING, ListStatus } from '../listState'

type Props = {
  onCloseMenu: () => void
  listStatus: ListStatus | undefined
  onChange: (listStatus: ListStatus) => void
}

export const MenuList: React.FC<Props> = (props) => {
  const { ref, hasClickedOutside } = useClickOutside()

  useEffect(() => {
    if (hasClickedOutside) {
      props.onCloseMenu()
    }
  }, [hasClickedOutside, props])

  const handleClick = useCallback(
    (listStatus: ListStatus) => {
      props.onChange(listStatus)
    },
    [props],
  )

  return (
    <Portal>
      <AtomsMenuList ref={ref} onClick={(e) => e.stopPropagation()}>
        <MenuOptionGroup
          value={props.listStatus}
          type="radio"
          onChange={(s) => handleClick(s as ListStatus)}
        >
          <MenuItemOption value={TODAY}>Mark for Today</MenuItemOption>
          <MenuItemOption value={UPCOMING}>Mark for Upcoming</MenuItemOption>
          <MenuItemOption value={LATER}>Mark for Later</MenuItemOption>
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
