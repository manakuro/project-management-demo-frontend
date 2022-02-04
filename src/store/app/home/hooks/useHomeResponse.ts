import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/task'
import { HomeResponse } from '../type'

export const useHomeResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()
  const setHome = useRecoilCallback(
    () => (data: HomeResponse) => {
      setTasksFromResponse(data.tasksDueSoon)
    },
    [setTasksFromResponse],
  )

  return {
    setHome,
  }
}
