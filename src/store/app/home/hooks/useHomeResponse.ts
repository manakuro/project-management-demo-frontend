import { useRecoilCallback } from 'recoil'
import {
  TeammateTaskResponse,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { HomeResponse } from '../type'

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
