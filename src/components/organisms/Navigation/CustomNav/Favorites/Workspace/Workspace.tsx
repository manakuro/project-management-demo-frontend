import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { WorkspaceList } from './WorkspaceList'

type Props = {}

export const Workspace: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex flexDirection="column" flex={1}>
      <WorkspaceList />
    </Flex>
  )
})
Workspace.displayName = 'Workspace'
