import { useRecoilCallback } from 'recoil'
import { projectTaskSectionState } from '../atom'
import type { ProjectTaskSection } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: ProjectTaskSection) => {
        set(projectTaskSectionState(input.id), input)
      },
    [],
  )

  return {
    upsert,
  }
}
