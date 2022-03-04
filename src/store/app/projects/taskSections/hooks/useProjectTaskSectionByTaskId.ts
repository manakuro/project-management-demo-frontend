import { useRecoilValue } from 'recoil'
import { projectTaskSectionByTaskIdState } from 'src/store/entities/projectTaskSection'

export const useProjectTaskSectionByTaskId = (taskId: string) => {
  const taskSection = useRecoilValue(projectTaskSectionByTaskIdState(taskId))

  return {
    taskSection,
  }
}
