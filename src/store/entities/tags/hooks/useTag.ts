import { useRecoilCallback, useRecoilValue } from 'recoil'
import { tagState } from '../atom'
import { Tag } from '../type'
import { useTagCommand } from './useTagCommand'

export const useTag = (tagId?: string) => {
  const tag = useRecoilValue(tagState(tagId || ''))
  const { upsert } = useTagCommand()

  const setTag = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Tag>) => {
        const prev = await snapshot.getPromise(tagState(tag.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, tag.id],
  )

  return {
    tag,
    setTag,
  }
}
