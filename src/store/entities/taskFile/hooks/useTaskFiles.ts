import { useRecoilValue } from 'recoil'
import { taskFileIdsState, taskFilesState } from '../atom'

export const useTaskFiles = () => {
  const taskFileIds = useRecoilValue(taskFileIdsState)
  const taskFiles = useRecoilValue(taskFilesState)

  return {
    taskFileIds,
    taskFiles,
  }
}
