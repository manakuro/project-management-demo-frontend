import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import {
  MENTION_TYPE,
  MentionItem as TMentionItem,
  MentionProject,
  MentionTask,
  MentionTeammate,
} from '../types'
import { Teammate } from './Teammate'
import { MentionItemBase } from './MentionItemBase'
import { Task } from './Task'
import { Project } from './Project'

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
          <Task {...rest} mention={props.mention as MentionTask} />
        </MentionItemBase>
      )
    case MENTION_TYPE.PROJECT:
      return (
        <MentionItemBase {...props}>
          <Project {...rest} mention={props.mention as MentionProject} />
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
