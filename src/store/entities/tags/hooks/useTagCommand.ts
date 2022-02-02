import { useRecoilCallback } from 'recoil'
import { tagState } from '../atom'
import { TaskTag } from '../type'

export const useTagCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (tag: TaskTag) => {
        set(tagState(tag.id), tag)
      },
    [],
  )

  return {
    upsert,
  }
}
