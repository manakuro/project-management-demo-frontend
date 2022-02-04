import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useProjectTeammateIdsByProjectIdSortedByCreatedAt } from 'src/store/entities/projectTeammate'
import { JoinedTeammate } from './JoinedTeammate'

type Props = {
  projectId: string
}

export const JoinedTeammates: React.VFC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { projectTeammateIds } =
    useProjectTeammateIdsByProjectIdSortedByCreatedAt(projectId)

  return (
    <Flex flexDirection="column">
      {projectTeammateIds.map((id) => (
        <JoinedTeammate projectTeammateId={id} key={id} projectId={projectId} />
      ))}
    </Flex>
  )
})
JoinedTeammates.displayName = 'JoinedTeammates'
