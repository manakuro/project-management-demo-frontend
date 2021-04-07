import React, { PropsWithChildren, ReactElement } from 'react'
import { UseMenuSelect, useMenuSelect } from './useMenuSelect'
import { Menu, MenuProps } from 'src/components/organisms'
import { Context } from './useMenuSelect'

type Props<ListStatus> = {
  onChange: (listStatus: ListStatus) => void
  listStatus?: ListStatus
  onOpened?: () => void
  onClosed?: () => void
  children(data: UseMenuSelect<ListStatus>): ReactElement
} & MenuProps

export const MenuSelect = <ListStatus,>(
  props: PropsWithChildren<Props<ListStatus>>,
) => {
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
        {props.children(useMenuSelectResult)}
      </Menu>
    </Context.Provider>
  )
}
