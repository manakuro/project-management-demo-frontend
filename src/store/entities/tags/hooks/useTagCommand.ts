import { useRecoilCallback } from 'recoil'
import { tagSelector } from '../atom'
import { Tag } from '../type'

export const useTagCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (tag: Tag) => {
        set(tagSelector(tag.id), tag)
      },
    [],
  )

  return {
    upsert,
  }
}
