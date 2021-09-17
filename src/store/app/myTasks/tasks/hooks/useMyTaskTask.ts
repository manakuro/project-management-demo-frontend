import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { Task, useTasksCommand } from 'src/store/entities/tasks'

export const useMyTaskTask = () => {
  const { me } = useMe()
  const { addTask } = useTasksCommand()

  const addMyTask = useRecoilCallback(
    () => (val: Partial<Task>) => {
      return addTask({ ...val, assigneeId: me.id })
    },
    [me.id, addTask],
  )

  return {
    addTask: addMyTask,
  }
}
