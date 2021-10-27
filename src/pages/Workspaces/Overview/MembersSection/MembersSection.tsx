import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useWorkspace } from 'src/store/entities/workspace'
import { useTeammateIdsByWorkspaceId } from 'src/store/entities/workspaceTeammates'
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../OverviewSectionHeader'
import { AddMemberListItem } from './AddMemberListItem'
import { MemberListItem } from './MemberListItem'

type Props = {}

export const MembersSection: React.VFC<Props> = memo<Props>(() => {
  const { workspace } = useWorkspace()
  const { teammateIds } = useTeammateIdsByWorkspaceId(workspace.id)

  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Members</OverviewSectionHeaderHeading>
      </OverviewSectionHeader>
      <Flex flexDirection="column">
        <AddMemberListItem />
        {teammateIds.map((id) => (
          <MemberListItem teammateId={id} key={id} />
        ))}
      </Flex>
    </Flex>
  )
})
MembersSection.displayName = 'DescriptionSection'
