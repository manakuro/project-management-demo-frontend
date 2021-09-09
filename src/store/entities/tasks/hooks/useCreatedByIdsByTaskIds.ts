import { useRecoilValue } from 'recoil'
import { createdByIdsByTaskIds } from '../atom'

export const useCreatedByIdsByTaskIds = (taskIds: string[]) => {
  const createdByIds = useRecoilValue(createdByIdsByTaskIds(taskIds))

  return {
    createdByIds,
  }
}
