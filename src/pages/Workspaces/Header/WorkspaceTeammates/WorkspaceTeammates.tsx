import React, { memo } from 'react'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { Flex, AvatarGroup } from 'src/components/ui/atoms'
import { useWorkspace } from 'src/store/entities/workspace'
import { useTeammateIdsByWorkspaceId } from 'src/store/entities/workspaceTeammate'

type Props = {}

export const WorkspaceTeammates: React.FC<Props> = memo<Props>(() => {
  const { workspace } = useWorkspace()
  const { teammateIds } = useTeammateIdsByWorkspaceId(workspace.id)

  return (
    <Flex alignItems="center">
      <AvatarGroup size="xs" max={3} fontSize="xs" spacing={-1}>
        {teammateIds.map((id) => (
          <TeammateAvatar teammateId={id} key={id} showProfile={false} />
        ))}
      </AvatarGroup>
    </Flex>
  )
})
WorkspaceTeammates.displayName = 'WorkspaceTeammates'
