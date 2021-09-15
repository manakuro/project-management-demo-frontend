import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useWorkspaceActivity } from 'src/store/app/inbox/activity'
import { Container } from '../Container'
import { ActionButtons } from './ActionButtons'
import { ClickHandler } from './ClickHandler'
import { InfoText } from './InfoText'
import { Project } from './Project'
import { TaskList } from './TaskList'
import { Workspace } from './Workspace'

type Props = FlexProps & {
  workspaceListId: string
}

export const WorkspaceList: React.FC<Props> = memo<Props>((props) => {
  const { workspaceListId } = props
  const { workspaceActivity } = useWorkspaceActivity(workspaceListId)

  return (
    <Container>
      <ClickHandler workspaceListId={workspaceListId}>
        <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
          <Workspace workspaceId={workspaceActivity.workspaceId} />
          <Project projectId={workspaceActivity.projectId} />
          <InfoText workspaceListId={workspaceListId} />
          <TaskList workspaceListId={workspaceListId} />
        </Flex>
      </ClickHandler>
      <ActionButtons />
    </Container>
  )
})

WorkspaceList.displayName = 'WorkspaceActivity'
