import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { SetValueParam } from 'src/components/organisms/Menus/EditorMentionMenu'
import {
  MENTION_TYPE,
  MentionItem as TMentionItem,
  MentionProject,
  MentionTask,
  MentionTeammate,
  MentionWorkspace,
} from '../types'
import { MentionItemBase } from './MentionItemBase'
import { Project } from './Project'
import { Task } from './Task'
import { Teammate } from './Teammate'
import { Workspace } from './Workspace'

type Props = Override<
  FlexProps,
  {
    onClick: (val: SetValueParam) => void
  }
> & {
  mention: TMentionItem
  index: number
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
          <Workspace {...rest} mention={props.mention as MentionWorkspace} />
        </MentionItemBase>
      )
  }
})
MentionItem.displayName = 'MentionItem'
