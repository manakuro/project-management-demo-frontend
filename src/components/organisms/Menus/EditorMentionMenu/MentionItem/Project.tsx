import React, { memo } from 'react'
import { ColorBox, Flex, FlexProps, Text } from 'src/components/atoms'
import { useProject } from 'src/store/entities/projects'
import { MentionProject } from '../types'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'

type Props = FlexProps & {
  mention: MentionProject
}

export const Project: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.mention.projectId)

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <ColorBox size="sm" color={project.color.color} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" isTruncated>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  )
})
