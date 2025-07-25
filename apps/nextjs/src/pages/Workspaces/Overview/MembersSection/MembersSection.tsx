import { memo } from 'react';
import { Flex } from 'src/components/ui/atoms';
import { useWorkspace } from 'src/store/entities/workspace';
import { useTeammateIdsByWorkspaceId } from 'src/store/entities/workspaceTeammate';
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../OverviewSectionHeader';
import { AddMemberListItem } from './AddMemberListItem';
import { MemberListItem } from './MemberListItem';

export const MembersSection = memo(function MembersSection() {
  const { workspace } = useWorkspace();
  const { teammateIds } = useTeammateIdsByWorkspaceId(workspace.id);

  return (
    <Flex flexDirection="column" mt={8} minH="300px">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Members</OverviewSectionHeaderHeading>
      </OverviewSectionHeader>
      <Flex flexDirection="column" minH="245px">
        <AddMemberListItem />
        {teammateIds.map((id) => (
          <MemberListItem teammateId={id} key={id} />
        ))}
      </Flex>
    </Flex>
  );
});
