import React, { memo, useCallback } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'
import { useDeleteTaskSectionModal } from 'src/components/organisms/Modals'
import { useTasksBoardListSectionContext } from '../../../Provider'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const { setTaskSectionId, onOpen } = useDeleteTaskSectionModal()
  const { onFocusInput, taskSectionId } = useTasksBoardListSectionContext()

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
