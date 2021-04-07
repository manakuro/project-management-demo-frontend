import React, { PropsWithChildren } from 'react'
import { UseMenuSelect } from '../useMenuSelect'
import { Component } from './Component'

export type Props<ListStatus> = {
  isOpen: boolean
  onCloseMenu: () => void
} & Pick<UseMenuSelect<ListStatus>, 'listStatus' | 'onChange'>
export type MenuSelectListProps<ListStatus> = Props<ListStatus>

export const MenuSelectList = <ListStatus,>(
  props: PropsWithChildren<Props<ListStatus>>,
) => {
  if (!props.isOpen) return null

  return <Component {...props} />
}
