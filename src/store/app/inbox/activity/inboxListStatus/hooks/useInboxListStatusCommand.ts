import { useRecoilCallback } from 'recoil'
import { inboxStatusState } from '../atom'
import { InboxListStatus } from '../type'

export const useInboxListStatusCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<InboxListStatus>) => {
        set(inboxStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    upsert,
  }
}
