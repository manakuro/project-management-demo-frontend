import React, { useCallback } from 'react'
import { Portal } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuOptionGroup,
} from 'src/components/organisms'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useMenuSelectContext } from '../useMenuSelect'

export const Component: React.FC = (props) => {
  const { onChange, onClose, listStatus } = useMenuSelectContext()
  const { ref } = useClickOutside(onClose)

  const handleChange = useCallback(
    (listStatus: string | string[] | undefined) => {
      if (listStatus === undefined) return
      onChange(listStatus)
    },
    [onChange],
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
          value={(listStatus as unknown) as string}
          type="radio"
          onChange={handleChange}
        >
          {props.children}
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
