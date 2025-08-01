import { Flex } from '@/components/ui/atoms';
import { memo } from 'react';
import { WorkspaceList } from './WorkspaceList';

export const Workspace = memo(function Workspace() {
  return (
    <Flex flexDirection="column" flex={1}>
      <WorkspaceList />
    </Flex>
  );
});
