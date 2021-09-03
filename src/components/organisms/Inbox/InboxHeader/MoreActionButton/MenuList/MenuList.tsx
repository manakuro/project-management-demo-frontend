import React from 'react'
import { Portal } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'

type Props = {}

export const MenuList: React.FC<Props> = () => {
  return (
    <Portal>
      <AtomsMenuList>
        <MenuItem>Manage notifications</MenuItem>
        <MenuItem>Archive all</MenuItem>
      </AtomsMenuList>
    </Portal>
  )
}
