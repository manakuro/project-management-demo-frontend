import { useRecoilCallback, useRecoilValue } from 'recoil'
import { tagSelector } from '../atom'
import { Tag } from '../type'
import { useTagCommand } from './useTagCommand'

export const useTag = (tagId?: string) => {
  const tag = useRecoilValue(tagSelector(tagId || ''))
  const { upsert } = useTagCommand()

  const setTag = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Tag>) => {
        const prev = await snapshot.getPromise(tagSelector(tag.id))
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
