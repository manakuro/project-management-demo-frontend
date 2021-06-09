import React, { memo } from 'react'
import { CheckIcon } from 'src/components/atoms'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/organisms'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { useTask } from 'src/store/entities/tasks'

export const Task: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const { task } = useTask(attrs.mentionId)

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{task.name + ' '}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <CheckIcon isDone={task.isDone} size="sm" cursor="auto" />
        <PopoverEditorLinkText>{task.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
})
