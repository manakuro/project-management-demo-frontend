import React, { memo, useCallback, useMemo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import {
  useProjectTeammate,
  useProjectTeammatesCommand,
} from 'src/store/entities/projectTeammate'

type Props = {
  projectId: string
  projectTeammateId: string
}

export const SetProjectOwner: React.FC<Props> = memo<Props>((props) => {
  const { projectTeammateId, projectId } = props
  const { projectTeammate } = useProjectTeammate(projectTeammateId)
  const { setOwnerByProjectIdAndTeammateId, setProjectTeammateById } =
    useProjectTeammatesCommand()

  const isOwner = useMemo(
    () => projectTeammate.isOwner,
    [projectTeammate.isOwner],
  )

  const handleRemoveAsProjectOwner = useCallback(async () => {
    await setProjectTeammateById(projectTeammateId, { isOwner: false })
  }, [projectTeammateId, setProjectTeammateById])

  const handleSetAsProjectOwner = useCallback(async () => {
    await setOwnerByProjectIdAndTeammateId(
      projectId,
      projectTeammate.teammateId,
    )
  }, [projectId, projectTeammate.teammateId, setOwnerByProjectIdAndTeammateId])

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
