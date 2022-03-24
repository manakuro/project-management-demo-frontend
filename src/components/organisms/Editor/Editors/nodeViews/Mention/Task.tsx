import React, { memo } from 'react'
import { CheckIcon } from 'src/components/atoms'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/organisms/Popovers'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { useProjectTask } from 'src/store/entities/projectTask'
import { useTask } from 'src/store/entities/task'

export const Task: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const { projectTask } = useProjectTask(attrs.mentionId)
  const { task } = useTask(projectTask.taskId)

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{task.name + ' '}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <CheckIcon completed={task.completed} size="sm" cursor="auto" />
        <PopoverEditorLinkText>{task.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
})
Task.displayName = 'Task'
