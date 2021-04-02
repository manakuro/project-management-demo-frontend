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
    (e: React.MouseEvent<HTMLButtonElement>, listStatus: ListStatus) => {
      e.stopPropagation()

      props.onChange(listStatus)
    },
    [props],
  )

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <MenuOptionGroup value={props.listStatus} type="radio">
          <MenuItemOption value={TODAY} onClick={(e) => handleClick(e, TODAY)}>
            Mark for Today
          </MenuItemOption>
          <MenuItemOption
            value={UPCOMING}
            onClick={(e) => handleClick(e, UPCOMING)}
          >
            Mark for Upcoming
          </MenuItemOption>
          <MenuItemOption value={LATER} onClick={(e) => handleClick(e, LATER)}>
            Mark for Later
          </MenuItemOption>
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
