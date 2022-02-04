import React, { memo } from 'react'
import { ColorBox, Flex, FlexProps, Text } from 'src/components/atoms'
import { useProject } from 'src/store/entities/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'
import { MentionProject } from '../types'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'

type Props = FlexProps & {
  mention: MentionProject
}

export const Project: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.mention.projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <ColorBox size="sm" color={projectBaseColor.color.color} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" isTruncated>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  )
})
Project.displayName = 'Project'
