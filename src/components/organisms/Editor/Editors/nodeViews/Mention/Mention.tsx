import { Flex } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from '../../ReactNodeView'
import { MENTION_TYPE, MentionType } from 'src/components/organisms'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { Teammate } from './Teammate'

export const Mention: React.FC = () => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const type = Number(attrs.mentionType) as MentionType

  switch (type) {
    case MENTION_TYPE.TEAMMATE:
      return <Teammate />
    case MENTION_TYPE.TASK:
      return <Flex>hi</Flex>
    case MENTION_TYPE.PROJECT:
      return <Flex>hi</Flex>
    case MENTION_TYPE.WORKSPACE:
      return <Flex>hi</Flex>
  }
}
