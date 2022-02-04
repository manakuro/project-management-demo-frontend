import React, { memo, useCallback } from 'react'
import { DatePickerWithInput } from 'src/components/molecules'
import { useProject, useProjectCommand } from 'src/store/entities/project'

type Props = {
  projectId: string
}

export const ProjectDueDate: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { setProject } = useProjectCommand()

  const handleSelect = useCallback(
    async (val: Date) => {
      await setProject({ dueDate: val.toISOString(), projectId })
    },
    [setProject, projectId],
  )

  const handleDelete = useCallback(async () => {
    await setProject({ dueDate: '', projectId })
  }, [setProject, projectId])

  return (
    <DatePickerWithInput
      onSelect={handleSelect}
      onDelete={handleDelete}
      dueDate={project.dueDate}
    />
  )
})
ProjectDueDate.displayName = 'ProjectDueDate'
