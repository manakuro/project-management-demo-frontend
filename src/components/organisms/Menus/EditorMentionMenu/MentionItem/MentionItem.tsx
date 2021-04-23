import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import {
  MENTION_TYPE,
  MentionItem as TMentionItem,
  MentionTeammate,
} from '../types'
import { Teammate } from './Teammate'
import { MentionItemBase } from './MentionItemBase'

type Props = Override<
  FlexProps,
  {
    onClick?: (val: string | number) => void
  }
> & {
  mention: TMentionItem
}

export const MentionItem: React.FC<Props> = memo<Props>((props) => {
  const { onClick, mention, ...rest } = props

  switch (mention.type) {
    case MENTION_TYPE.TEAMMATE:
      return (
        <MentionItemBase {...props}>
          <Teammate {...rest} mention={props.mention as MentionTeammate} />
        </MentionItemBase>
      )
    case MENTION_TYPE.TASK:
      return (
        <MentionItemBase {...props}>
          <Teammate {...rest} mention={props.mention as MentionTeammate} />
        </MentionItemBase>
      )
    case MENTION_TYPE.PROJECT:
      return (
        <MentionItemBase {...props}>
          <Teammate {...rest} mention={props.mention as MentionTeammate} />
        </MentionItemBase>
      )
    case MENTION_TYPE.WORKSPACE:
      return (
        <MentionItemBase {...props}>
          <Teammate {...rest} mention={props.mention as MentionTeammate} />
        </MentionItemBase>
      )
  }
})
