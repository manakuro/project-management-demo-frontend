import { ColorBox } from 'src/components/atoms'
import React, { memo } from 'react'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/organisms'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { useProject } from 'src/store/projects'

export const Project: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const { project } = useProject(attrs.mentionId)

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{project.name}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <ColorBox size="sm" color={project.color.color} />
        <PopoverEditorLinkText>{project.name + ' '}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
})
