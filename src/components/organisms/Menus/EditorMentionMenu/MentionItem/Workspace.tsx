import React, { memo } from 'react'
import { Flex, FlexProps, Icon, Text } from 'src/components/atoms'
import { MentionWorkspace } from '../types'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'

type Props = FlexProps & {
  mention: MentionWorkspace
}

export const Workspace: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Icon icon="group" color="text.muted" />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" isTruncated>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  )
})
Workspace.displayName = 'Workspace'
