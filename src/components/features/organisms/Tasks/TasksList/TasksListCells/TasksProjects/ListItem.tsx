import React, { memo } from 'react'
import { ProjectChip } from 'src/components/features/molecules/Chips'
import { useProjectTask } from 'src/store/entities/projectTask'

type Props = {
  projectTaskId: string
}

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const { projectTask } = useProjectTask(props.projectTaskId)

  return <ProjectChip variant="button" projectId={projectTask.projectId} />
})
ListItem.displayName = 'ListItem'
