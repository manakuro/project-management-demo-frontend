import React, { useEffect } from 'react'
import { Portal } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItemOption,
  MenuOptionGroup,
} from 'src/components/organisms'
import { useClickOutside } from 'src/hooks/useClickOutside'
import {
  DUE_DATE,
  LIKES,
  ListStatus,
  NONE,
  PROJECT,
} from 'src/components/organisms/Tasks/TasksHeader/SortButton/listState'

type Props = {
  onCloseMenu: () => void
  listStatus: ListStatus
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
          <MenuItemOption value={NONE} onClick={() => props.onChange(NONE)}>
            None
          </MenuItemOption>
          <MenuItemOption
            value={PROJECT}
            onClick={() => props.onChange(PROJECT)}
          >
            Project
          </MenuItemOption>
          <MenuItemOption
            value={DUE_DATE}
            onClick={() => props.onChange(DUE_DATE)}
          >
            Due date
          </MenuItemOption>
          <MenuItemOption value={LIKES} onClick={() => props.onChange(LIKES)}>
            Likes
          </MenuItemOption>
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
