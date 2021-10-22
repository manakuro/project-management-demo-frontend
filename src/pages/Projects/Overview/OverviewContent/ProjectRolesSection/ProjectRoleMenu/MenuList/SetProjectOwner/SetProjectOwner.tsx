import React, { memo, useCallback, useMemo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useOwnerTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  projectId: string
  teammateId: string
}

export const SetProjectOwner: React.FC<Props> = memo<Props>((props) => {
  const { projectId, teammateId } = props
  const { projectTeammate } = useOwnerTeammateIdsByProjectId(projectId)
  const { teammate: owner } = useTeammate(projectTeammate.teammateId)
  const isOwner = useMemo(() => owner.id === teammateId, [owner.id, teammateId])

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
