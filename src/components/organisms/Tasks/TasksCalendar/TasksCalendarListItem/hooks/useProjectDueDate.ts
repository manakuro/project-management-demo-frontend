import { useMemo } from 'react'
import { dateFns } from 'src/shared/dateFns'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProject } from 'src/store/entities/project'

type Props = {
  dateString: string
}

export const useProjectDueDate = (props: Props) => {
  const { dateString } = props
  const { projectId } = useProjectsProjectId()
  const { project } = useProject(projectId)
  const isProjectDueDate = useMemo(() => {
    return dateFns.isSameDay(new Date(dateString), new Date(project.dueDate))
  }, [dateString, project.dueDate])

  return {
    isProjectDueDate,
  }
}
