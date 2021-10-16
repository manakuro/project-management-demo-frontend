import React, { memo } from 'react'
import { Avatar, Flex, FlexProps, Text } from 'src/components/atoms'
import { MentionTeammate } from '../types'
import { LeftContainer } from './LeftContainer'
import { RightContainer } from './RightContainer'

type Props = FlexProps & {
  mention: MentionTeammate
}

export const Teammate: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Avatar
          name={props.mention.title}
          src={props.mention.image}
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">{props.mention.title}</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {props.mention.subTitle}
        </Text>
      </RightContainer>
    </Flex>
  )
})
Teammate.displayName = 'Teammate'
