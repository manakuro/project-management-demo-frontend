import type React from 'react'
import { useReactNodeView } from 'src/components/ui/organisms/Editor/Editors'
import type { MentionAttrs } from 'src/shared/prosemirror/schema'
import { MentionType, type MentionTypeCode } from 'src/store/entities/mention'
import { Project } from './Project'
import { Task } from './Task'
import { Teammate } from './Teammate'
import { Workspace } from './Workspace'

export const Mention: React.FC = () => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const type = Number(attrs.mentionType) as MentionTypeCode

  switch (type) {
    case MentionType.TEAMMATE:
      return <Teammate />
    case MentionType.TASK:
      return <Task />
    case MentionType.PROJECT:
      return <Project />
    case MentionType.WORKSPACE:
      return <Workspace />
  }
}
