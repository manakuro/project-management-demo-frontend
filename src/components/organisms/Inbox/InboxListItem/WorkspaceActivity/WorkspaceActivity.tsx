import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useWorkspaceActivity } from 'src/store/app/inbox/activity'
import { Container } from '../Container'
import { InfoText } from './InfoText'
import { Project } from './Project'
import { TaskList } from './TaskList'
import { Workspace } from './Workspace'

type Props = FlexProps & {
  workspaceActivityId: string
}

export const WorkspaceActivity: React.FC<Props> = memo<Props>((props) => {
  const { workspaceActivityId } = props
  const { workspaceActivity } = useWorkspaceActivity(workspaceActivityId)

  return (
    <Container>
      <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
        <Workspace workspaceId={workspaceActivity.workspaceId} />
        <Project projectId={workspaceActivity.projectId} />
        <InfoText workspaceActivityId={workspaceActivityId} />
        <TaskList workspaceActivityId={workspaceActivityId} />
      </Flex>
    </Container>
  )
})

WorkspaceActivity.displayName = 'WorkspaceActivity'
