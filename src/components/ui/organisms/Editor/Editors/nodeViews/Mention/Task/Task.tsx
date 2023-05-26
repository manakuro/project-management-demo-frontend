import React, { memo } from 'react'
import { useReactNodeView } from 'src/components/ui/organisms/Editor/Editors/ReactNodeView'
import { useProjectTaskQuery } from 'src/hooks/queries/entities'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { Loading } from './Loading'
import { TaskLink } from './TaskLink'

export const Task: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs

  const { projectTask, loading } = useProjectTaskQuery(attrs.mentionId)

  if (loading) return <Loading />
  if (!projectTask?.id) return null

  return <TaskLink projectTaskId={projectTask.id} />
})
Task.displayName = 'Task'
