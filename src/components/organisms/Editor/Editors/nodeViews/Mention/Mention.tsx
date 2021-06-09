import React from 'react'
import { MENTION_TYPE, MentionType } from 'src/components/organisms'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { Project } from './Project'
import { Task } from './Task'
import { Teammate } from './Teammate'
import { Workspace } from './Workspace'

export const Mention: React.FC = () => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const type = Number(attrs.mentionType) as MentionType

  switch (type) {
    case MENTION_TYPE.TEAMMATE:
      return <Teammate />
    case MENTION_TYPE.TASK:
      return <Task />
    case MENTION_TYPE.PROJECT:
      return <Project />
    case MENTION_TYPE.WORKSPACE:
      return <Workspace />
  }
}
