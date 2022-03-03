import { useRecoilCallback } from 'recoil'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'

export const useResetTeammateTaskSectionSection = () => {
  const resetTeammateTaskSection = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(teammatesTaskSectionState(id))
      },
    [],
  )

  const resetTeammateTaskSections = useRecoilCallback(
    ({ reset }) =>
      (teammateTaskSections: TeammateTaskSection[]) => {
        teammateTaskSections.forEach((t) => {
          reset(teammatesTaskSectionState(t.id))
        })
      },
    [],
  )

  return {
    resetTeammateTaskSection,
    resetTeammateTaskSections,
  }
}
