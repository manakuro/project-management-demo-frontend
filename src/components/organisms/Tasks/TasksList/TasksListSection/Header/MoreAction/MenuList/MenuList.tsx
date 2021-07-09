import React, { memo, useCallback } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
  useDeleteTaskSectionModal,
} from 'src/components/organisms'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const { setTaskSectionId, onOpen } = useDeleteTaskSectionModal()
  const { onFocusInput, taskSectionId } = useTasksListSectionContext()

  const handleRenameSection = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  const handleDeleteSection = useCallback(() => {
    setTaskSectionId(taskSectionId)
    onOpen()
  }, [onOpen, setTaskSectionId, taskSectionId])

  return (
    <AtomsMenuList>
      <MenuItem onClick={handleRenameSection}>Rename section</MenuItem>
      <MenuItem onClick={handleDeleteSection} color="alert">
        Delete section
      </MenuItem>
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
