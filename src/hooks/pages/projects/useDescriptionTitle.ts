import { useCallback } from 'react'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
}

export const useDescriptionTitle = (props: Props) => {
  const { project, setProject } = useProject(props.projectId)

  const onChange = useCallback(
    async (val: string) => {
      await setProject({ descriptionTitle: val })
    },
    [setProject],
  )

  return {
    onChange,
    descriptionTitle: project.descriptionTitle,
  }
}
