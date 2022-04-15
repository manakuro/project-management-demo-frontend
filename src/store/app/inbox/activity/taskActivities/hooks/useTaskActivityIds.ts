import { useRecoilValue } from 'recoil'
import { taskActivityIdsState } from '../atom'

export const useTaskActivityIds = () => {
  const taskActivityIds = useRecoilValue(taskActivityIdsState)

  return {
    taskActivityIds,
  }
}
