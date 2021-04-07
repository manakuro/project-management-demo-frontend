import React, { PropsWithChildren, ReactElement } from 'react'
import { UseMenuSelect, useMenuSelect } from './useMenuSelect'
import { Menu, MenuProps } from 'src/components/organisms'

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
    <Menu isOpen={useMenuSelectResult.isOpen} isLazy {...rest}>
      {props.children(useMenuSelectResult)}
    </Menu>
  )
}
