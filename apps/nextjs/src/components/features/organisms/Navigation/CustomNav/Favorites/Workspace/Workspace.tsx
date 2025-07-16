import { memo } from 'react';
import { Flex } from 'src/components/ui/atoms';
import { WorkspaceList } from './WorkspaceList';

export const Workspace = memo(function Workspace() {
  return (
    <Flex flexDirection="column" flex={1}>
      <WorkspaceList />
    </Flex>
  );
});
