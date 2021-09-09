import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useWorkspaceActivity } from 'src/store/app/inbox/activity'
import { Container } from '../Container'
import { Project } from './Project'
import { Workspace } from './Workspace'

type Props = FlexProps & {
  workspaceActivityId: string
}

export const WorkspaceActivity: React.FC<Props> = memo<Props>((props) => {
  const { workspaceActivityId } = props
  const { workspaceActivity } = useWorkspaceActivity(workspaceActivityId)

  return (
    <Container>
      <Flex py={4} flex={1} flexDirection="column">
        <Workspace workspaceId={workspaceActivity.workspaceId} />
        <Project projectId={workspaceActivity.projectId} />
      </Flex>
    </Container>
  )
})

WorkspaceActivity.displayName = 'WorkspaceActivity'
