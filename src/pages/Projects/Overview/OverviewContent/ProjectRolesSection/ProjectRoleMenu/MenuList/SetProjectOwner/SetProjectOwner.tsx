import React, { memo, useCallback, useMemo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useProjectTeammate } from 'src/store/entities/projectsTeammates'

type Props = {
  projectId: string
  projectTeammateId: string
}

export const SetProjectOwner: React.FC<Props> = memo<Props>((props) => {
  const { projectTeammateId } = props
  const { projectTeammate } = useProjectTeammate(projectTeammateId)
  const isOwner = useMemo(
    () => projectTeammate.isOwner,
    [projectTeammate.isOwner],
  )

  const handleRemoveAsProjectOwner = useCallback(() => {}, [])
  const handleSetAsProjectOwner = useCallback(() => {}, [])

  if (isOwner) {
    return (
      <MenuItem onClick={handleRemoveAsProjectOwner} color="alert">
        Remove as Project Owner
      </MenuItem>
    )
  }

  return (
    <MenuItem onClick={handleSetAsProjectOwner}>Set as Project Owner</MenuItem>
  )
})
SetProjectOwner.displayName = 'SetProjectOwner'
