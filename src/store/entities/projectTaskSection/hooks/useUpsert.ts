import { useRecoilCallback } from 'recoil'
import { projectTaskSectionState } from '../atom'
import { ProjectTaskSection } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectTaskSection) => {
        set(projectTaskSectionState(val.id), val)
      },
    [],
  )

  return {
    upsert,
  }
}
