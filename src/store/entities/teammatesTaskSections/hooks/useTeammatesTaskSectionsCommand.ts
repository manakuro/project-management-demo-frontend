import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { teammatesTaskSectionState, initialState } from '../atom'
import { TeammateTaskSection } from '../type'

export const useTeammatesTaskSectionsCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammateTaskSection) => {
        set(teammatesTaskSectionState(val.id), val)
      },
    [],
  )

  const addTeammatesTaskSection = useRecoilCallback(
    () => (val?: Partial<TeammateTaskSection>) => {
      const id = uuid()
      upsert({
        ...initialState(),
        ...val,
        id,
      })

      return id
    },
    [upsert],
  )

  return {
    addTeammatesTaskSection,
    upsert,
  }
}
