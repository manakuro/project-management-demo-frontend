import React, { memo } from 'react'
import { CheckIcon, Flex, FlexProps, Text } from 'src/components/atoms'
import { Mention } from 'src/store/entities/mention'
import { useProject } from 'src/store/entities/project'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'

type Props = FlexProps & {
  mention: Mention
}

export const Task: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.mention.projectId)

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <CheckIcon completed={props.mention.completed} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" maxW="80%" noOfLines={1}>
          {props.mention.title}
        </Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {project.name}
        </Text>
      </RightContainer>
    </Flex>
  )
})
Task.displayName = 'Task'
