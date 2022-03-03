import React, { memo, useCallback } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'
import { useDeleteTaskSectionModal } from 'src/components/organisms/Modals'
import {
  useHasTasksByTaskSectionId,
  useTasksTaskSectionCommand,
} from 'src/components/organisms/Tasks/hooks'
import { useTasksBoardListSectionContext } from '../../../Provider'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const { setModalState, onOpen } = useDeleteTaskSectionModal()
  const { deleteTaskSection } = useTasksTaskSectionCommand()
  const { onFocusInput, taskSectionId } = useTasksBoardListSectionContext()
  const { hasTasks } = useHasTasksByTaskSectionId(taskSectionId)

  const handleRenameSection = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  const handleDeleteSection = useCallback(async () => {
    if (!hasTasks) {
      await deleteTaskSection(taskSectionId)
      return
    }

    setModalState({
      taskSectionId,
    })
    onOpen()
  }, [deleteTaskSection, hasTasks, onOpen, setModalState, taskSectionId])

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
