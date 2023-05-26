import React from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'
import { Portal } from 'src/components/ui/atoms'

type Props = {}

export const MenuList: React.FC<Props> = () => {
  return (
    <Portal>
      <AtomsMenuList>
        <MenuItem isDisabled>Archive all</MenuItem>
        <MenuItem isDisabled>Manage notifications</MenuItem>
      </AtomsMenuList>
    </Portal>
  )
}
