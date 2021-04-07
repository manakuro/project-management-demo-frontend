import React, { PropsWithChildren, ReactElement } from 'react'
import { UseMenuSelect, useMenuSelect } from './useMenuSelect'
import { Menu } from 'src/components/organisms'

type Props<ListStatus> = {
  onChange: (listStatus: ListStatus) => void
  listStatus?: ListStatus
  onOpened?: () => void
  onClosed?: () => void
  children(data: UseMenuSelect<ListStatus>): ReactElement
}

export const MenuSelect = <ListStatus,>(
  props: PropsWithChildren<Props<ListStatus>>,
) => {
  const { isOpen, onChange, onClose, onOpen, listStatus } = useMenuSelect({
    listStatus: props.listStatus,
    onOpened: props.onOpened,
    onClosed: props.onClosed,
    onChange: props.onChange,
  })

  return (
    <Menu isOpen={isOpen} isLazy placement="bottom-end">
      {props.children({ isOpen, onOpen, listStatus, onChange, onClose })}
    </Menu>
  )
}
