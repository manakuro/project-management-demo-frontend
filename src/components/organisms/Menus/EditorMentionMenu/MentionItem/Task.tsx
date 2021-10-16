import React, { memo } from 'react'
import { CheckIcon, Flex, FlexProps, Text } from 'src/components/atoms'
import { MentionTask } from '../types'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'

type Props = FlexProps & {
  mention: MentionTask
}

export const Task: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <CheckIcon isDone={props.mention.idDone} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" maxW="80%" isTruncated>
          {props.mention.title}
        </Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {props.mention.subTitle}
        </Text>
      </RightContainer>
    </Flex>
  )
})
Task.displayName = 'Task'
