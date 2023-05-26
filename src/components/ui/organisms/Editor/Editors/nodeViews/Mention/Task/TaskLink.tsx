import React, { memo } from 'react'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/organisms/Popovers'
import { CheckIcon } from 'src/components/ui/atoms'
import { useProjectTask } from 'src/store/entities/projectTask'
import { useTask } from 'src/store/entities/task'

type Props = {
  projectTaskId: string
}

export const TaskLink: React.FC<Props> = memo<Props>((props) => {
  const { projectTask } = useProjectTask(props.projectTaskId)
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
TaskLink.displayName = 'TaskLink'
