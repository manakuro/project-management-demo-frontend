import React, { useCallback } from 'react'
import { Portal } from 'src/components/ui/atoms'
import {
  MenuList as AtomsMenuList,
  MenuListProps,
  MenuOptionGroup,
  MenuOptionGroupProps,
} from 'src/components/ui/organisms/Menu'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useMenuSelectContext } from '../useMenuSelect'

type Props = MenuOptionGroupProps & {
  menuListProps?: MenuListProps
}
export type ComponentProps = Props

export const Component: React.FC<Props> = (props) => {
  const { menuListProps, ...rest } = props
  const { onChange, onClose, listStatus } = useMenuSelectContext()
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: () => true,
  })

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
      <AtomsMenuList ref={ref} onClick={handleClickMenuList} {...menuListProps}>
        <MenuOptionGroup
          value={listStatus as unknown as string}
          type="radio"
          onChange={handleChange}
          {...rest}
        />
      </AtomsMenuList>
    </Portal>
  )
}
