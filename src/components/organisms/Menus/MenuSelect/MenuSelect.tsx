import React from 'react'
import { Menu, MenuProps } from 'src/components/organisms'
import { MaybeRenderProp, runIfFn } from 'src/shared/utils'
import { UseMenuSelect, useMenuSelect } from './useMenuSelect'
import { Context } from './useMenuSelect'

type Props<ListStatus> = {
  onChange: (listStatus: ListStatus) => void
  listStatus?: ListStatus
  onOpened?: () => void
  onClosed?: () => void
  children: MaybeRenderProp<UseMenuSelect<ListStatus>>
} & Omit<MenuProps, 'children'>

export const MenuSelect = <ListStatus,>(props: Props<ListStatus>) => {
  const { listStatus, onOpened, onClosed, onChange, ...rest } = props

  const useMenuSelectResult = useMenuSelect({
    listStatus,
    onOpened,
    onClosed,
    onChange,
  })

  return (
    <Context.Provider value={useMenuSelectResult}>
      <Menu isOpen={useMenuSelectResult.isOpen} isLazy {...rest}>
        {runIfFn(props.children, useMenuSelectResult)}
      </Menu>
    </Context.Provider>
  )
}
