import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { initialState } from '../atom'
import { TeammateTaskSection } from '../type'
import { useUpsert } from './useUpsert'

export const useTeammatesTaskSectionCommand = () => {
  const { upsert } = useUpsert()

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
  }
}
