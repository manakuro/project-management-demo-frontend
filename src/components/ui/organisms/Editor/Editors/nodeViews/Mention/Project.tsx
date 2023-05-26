import React, { memo } from 'react'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/organisms/Popovers'
import { ColorBox } from 'src/components/ui/atoms'
import { useReactNodeView } from 'src/components/ui/organisms/Editor/Editors/ReactNodeView'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { useProject } from 'src/store/entities/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'

export const Project: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const { project } = useProject(attrs.mentionId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{project.name + ' '}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <ColorBox size="sm" color={projectBaseColor.color.color} />
        <PopoverEditorLinkText>{project.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
})
Project.displayName = 'Project'
