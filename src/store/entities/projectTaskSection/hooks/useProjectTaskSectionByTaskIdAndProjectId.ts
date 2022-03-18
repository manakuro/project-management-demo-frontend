import { useRecoilValue } from 'recoil'
import { projectTaskSectionByTaskIdAndProjectIdState } from '../atom'

export const useProjectTaskSectionByTaskIdAndProjectId = (props: {
  taskId: string
  projectId: string
}) => {
  const projectTaskSection = useRecoilValue(
    projectTaskSectionByTaskIdAndProjectIdState(props),
  )

  return {
    projectTaskSection,
  }
}
