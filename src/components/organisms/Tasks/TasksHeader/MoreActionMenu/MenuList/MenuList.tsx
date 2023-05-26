import React, { memo } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/ui/organisms/Menu'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  return (
    <AtomsMenuList>
      <MenuItem isDisabled>Save layout as default</MenuItem>
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
