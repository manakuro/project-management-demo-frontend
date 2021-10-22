import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useDeleteTaskSectionModal } from 'src/components/organisms/Modals'

type Props = {
  projectId: string
  teammateId: string
}

export const AddRole: React.FC<Props> = memo<Props>(() => {
  const { onOpen } = useDeleteTaskSectionModal()

  const handleAddRole = useCallback(() => {
    onOpen()
  }, [onOpen])

  return <MenuItem onClick={handleAddRole}>Add role</MenuItem>
})
AddRole.displayName = 'AddRole'
