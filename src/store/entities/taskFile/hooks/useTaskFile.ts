import { useRecoilCallback, useRecoilValue } from 'recoil'
import { TaskFile, taskFileState } from 'src/store/entities/taskFile'
import { useUpsert } from './useUpsert'

export const useTaskFile = (taskFileId?: string) => {
  const taskFile = useRecoilValue(taskFileState(taskFileId || ''))
  const { upsert } = useUpsert()

  const setTaskFile = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeepPartial<TaskFile>) => {
        const prev = await snapshot.getPromise(taskFileState(taskFile.id))
        upsert({
          ...prev,
          ...val,
          fileType: {
            ...prev.fileType,
            ...val.fileType,
          },
        })
      },
    [upsert, taskFile.id],
  )

  return {
    taskFile,
    setTaskFile,
  }
}
