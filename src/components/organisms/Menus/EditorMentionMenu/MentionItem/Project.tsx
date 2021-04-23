import React, { memo } from 'react'
import { Box, Flex, FlexProps, Text } from 'src/components/atoms'
import { MentionProject } from '../types'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'
import { useProject } from 'src/store/projects'

type Props = FlexProps & {
  mention: MentionProject
}

export const Project: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.mention.projectId)

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Box w={3} h={3} borderRadius="sm" bg={project.color.color} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" isTruncated>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  )
})
