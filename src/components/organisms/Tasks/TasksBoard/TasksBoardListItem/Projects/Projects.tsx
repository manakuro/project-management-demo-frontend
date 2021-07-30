import React, { memo } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { useTasksProjectTaskIds } from 'src/store/entities/tasks/projectIds'
import { ProjectChip } from './ProjectChip'

type Props = FlexProps & {
  taskId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { projectIds } = useTasksProjectTaskIds(props.taskId)

  if (!projectIds.length) return null

  return (
    <Stack direction="row" spacing={2} mb={4}>
      {projectIds.map((id) => (
        <ProjectChip projectId={id} key={id} />
      ))}
    </Stack>
  )
})
Projects.displayName = 'Projects'
