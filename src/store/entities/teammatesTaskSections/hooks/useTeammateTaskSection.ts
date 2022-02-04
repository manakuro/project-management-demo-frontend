import { useRecoilCallback, useRecoilValue } from 'recoil'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'
import { useTeammatesTaskSectionsCommand } from './useTeammatesTaskSectionsCommand'

const DEFAULT_TITLE_NAME = 'Untitled Section'
export const useTeammateTaskSection = (teammateTaskSectionId: string) => {
  const { upsert } = useTeammatesTaskSectionsCommand()
  const teammateTaskSection = useRecoilValue(
    teammatesTaskSectionState(teammateTaskSectionId),
  )

  const setTeammateTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTaskSection>) => {
        const current = await snapshot.getPromise(
          teammatesTaskSectionState(teammateTaskSectionId),
        )
        upsert({ ...current, ...val })
      },
    [teammateTaskSectionId, upsert],
  )

  const setTeammateTaskSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (teammateTaskSection.name === val) return
      const name = val || DEFAULT_TITLE_NAME

      await setTeammateTaskSection({ name })
    },
    [setTeammateTaskSection, teammateTaskSection.name],
  )

  return {
    teammateTaskSection,
    setTeammateTaskSectionName,
  }
}
