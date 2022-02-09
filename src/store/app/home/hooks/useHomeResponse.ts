import { useRecoilCallback } from 'recoil'
import { useTeammateTaskResponse } from 'src/store/entities/teammateTask'
import { HomeResponse } from '../type'

export const useHomeResponse = () => {
  const { setTeammateTask } = useTeammateTaskResponse()
  const setHome = useRecoilCallback(
    () => (data: HomeResponse) => {
      setTeammateTask(data.tasksDueSoon)
    },
    [setTeammateTask],
  )

  return {
    setHome,
  }
}
