import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'

type Props = {
  projectId: string
  projectTeammateId: string
}

export const RemoveFromProject: React.FC<Props> = memo<Props>(() => {
  const handleRemoveFromProject = useCallback(() => {}, [])

  return (
    <MenuItem onClick={handleRemoveFromProject} color="alert" isDisabled>
      Remove from Project
    </MenuItem>
  )
})
RemoveFromProject.displayName = 'RemoveFromProject'
