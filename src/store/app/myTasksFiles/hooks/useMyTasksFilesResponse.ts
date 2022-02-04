import { useRecoilCallback } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { MyTaskFileResponse } from 'src/store/app/myTasksFiles/type'
import { TaskFile, taskFileState } from 'src/store/entities/taskFile'
import { useTasksCommand } from 'src/store/entities/tasks'

export const useMyTasksFilesResponse = () => {
  const { setTaskFile, setTaskStatus } = useSetters()

  const setMyTasksTaskFiles = useRecoilCallback(
    () => async (data: MyTaskFileResponse[]) => {
      setTaskFile(data)
      await setTaskStatus(data)
    },
    [setTaskFile, setTaskStatus],
  )

  return {
    setMyTasksTaskFiles,
  }
}

const useSetters = () => {
  const { setTaskById } = useTasksCommand()
  const setTaskFile = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskFileResponse[]) => {
        const taskFiles: TaskFile[] = data.map(({ task, ...rest }) => rest)

        taskFiles.forEach((a) => {
          set(taskFileState(a.id), a)
        })
      },
    [],
  )

  const setTaskStatus = useRecoilCallback(
    () => async (data: MyTaskFileResponse[]) => {
      const tasks: MyTaskFileResponse['task'][] = data.map(({ task }) => task)

      await asyncForEach(tasks, async (t) => {
        await setTaskById(t.id, t)
      })
    },
    [setTaskById],
  )

  return {
    setTaskFile,
    setTaskStatus,
  }
}
