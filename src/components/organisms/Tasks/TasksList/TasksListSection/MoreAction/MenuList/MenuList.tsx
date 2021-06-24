import React, { memo, useCallback } from 'react'
import { MenuList as AtomsMenuList, MenuItem } from 'src/components/organisms'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const handleRenameSection = useCallback(() => {
    console.log('handleRenameSection!')
  }, [])

  const handleDeleteSection = useCallback(() => {
    console.log('handleDeleteSection!')
  }, [])

  return (
    <AtomsMenuList zIndex={1}>
      <MenuItem onClick={handleRenameSection}>Rename section</MenuItem>
      <MenuItem onClick={handleDeleteSection} color="alert">
        Delete section
      </MenuItem>
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
