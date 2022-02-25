import { useRecoilCallback } from 'recoil'
import { projectTaskState } from '../atom'
import { ProjectTask } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectTask) => {
        set(projectTaskState(val.id), val)
      },
    [],
  )

  return {
    upsert,
  }
}
