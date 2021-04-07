import React, { PropsWithChildren, useCallback, useEffect } from 'react'
import { Portal } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuOptionGroup,
} from 'src/components/organisms'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { UseMenuSelect } from '../useMenuSelect'

type Props<ListStatus> = {
  onCloseMenu: () => void
} & Pick<UseMenuSelect<ListStatus>, 'listStatus' | 'onChange'>

export const MenuSelectList = <ListStatus,>(
  props: PropsWithChildren<Props<ListStatus>>,
) => {
  const { ref, hasClickedOutside } = useClickOutside()

  useEffect(() => {
    if (hasClickedOutside) props.onCloseMenu()
  }, [hasClickedOutside, props])

  const handleChange = useCallback(
    (listStatus: string | string[] | undefined) => {
      props.onChange((listStatus as unknown) as ListStatus)
    },
    [props],
  )
  const handleClickMenuList = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
    },
    [],
  )

  return (
    <Portal>
      <AtomsMenuList ref={ref} onClick={handleClickMenuList}>
        <MenuOptionGroup
          value={(props.listStatus as unknown) as string}
          type="radio"
          onChange={handleChange}
        >
          {props.children}
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
