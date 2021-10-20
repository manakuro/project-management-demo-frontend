import React, { memo } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  return (
    <AtomsMenuList>
      <MenuItem>Save layout as default</MenuItem>
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
