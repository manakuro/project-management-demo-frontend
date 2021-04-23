import React, { memo } from 'react'
import { Avatar, Flex, FlexProps, Text } from 'src/components/atoms'
import { MentionTeammate } from '../types'

type Props = FlexProps & {
  mention: MentionTeammate
}

export const Teammate: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex alignItems="center" flex={1}>
      <Avatar
        name={props.mention.title}
        src={props.mention.image}
        size="xs"
        cursor="pointer"
        bg="teal.200"
      />
      <Text ml={2} fontSize="sm">
        {props.mention.title}
      </Text>
      <Text ml={5} fontSize="xs" color="text.muted">
        {props.mention.subTitle}
      </Text>
    </Flex>
  )
})
