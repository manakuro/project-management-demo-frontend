import { useRecoilCallback } from 'recoil'
import { tagState } from '../atom'
import { Tag } from '../type'

export const useTagCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (tag: Tag) => {
        set(tagState(tag.id), tag)
      },
    [],
  )

  return {
    upsert,
  }
}
