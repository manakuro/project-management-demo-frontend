import { useRecoilCallback, useRecoilValue } from 'recoil'
import { type TaskFile, taskFileState } from 'src/store/entities/taskFile'
import { useUpsert } from './useUpsert'

export const useTaskFile = (taskFileId?: string) => {
  const taskFile = useRecoilValue(taskFileState(taskFileId || ''))
  const { upsert } = useUpsert()

  const setTaskFile = useRecoilCallback(
    ({ snapshot }) =>
      async (input: DeepPartial<TaskFile>) => {
        const prev = await snapshot.getPromise(taskFileState(taskFile.id))
        upsert({
          ...prev,
          ...input,
          fileType: {
            ...prev.fileType,
            ...input.fileType,
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
