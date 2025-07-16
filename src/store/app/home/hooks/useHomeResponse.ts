import { useRecoilCallback } from 'recoil'
import {
  type TeammateTaskResponse,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import type { HomeResponse } from '../type'

export const useHomeResponse = () => {
  const { setTeammateTask } = useTeammateTaskResponse()
  const setHome = useRecoilCallback(
    () => (data: HomeResponse) => {
      setTeammateTask(data.tasksDueSoon as TeammateTaskResponse[])
    },
    [setTeammateTask],
  )

  return {
    setHome,
  }
}
