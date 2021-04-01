import React, { useEffect } from 'react'
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

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <MenuOptionGroup value={props.listStatus} type="radio">
          <MenuItemOption value={TODAY} onClick={() => props.onChange(TODAY)}>
            Mark for Today
          </MenuItemOption>
          <MenuItemOption value={LATER} onClick={() => props.onChange(LATER)}>
            Mark for Upcoming
          </MenuItemOption>
          <MenuItemOption
            value={UPCOMING}
            onClick={() => props.onChange(UPCOMING)}
          >
            Mark for Later
          </MenuItemOption>
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
