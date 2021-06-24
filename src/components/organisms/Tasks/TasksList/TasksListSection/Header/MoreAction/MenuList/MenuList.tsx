import React, { memo, useCallback } from 'react'
import { MenuList as AtomsMenuList, MenuItem } from 'src/components/organisms'
import { useTasksListSectionHeader } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Header/Provider'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const { onFocusInput } = useTasksListSectionHeader()

  const handleRenameSection = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

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
