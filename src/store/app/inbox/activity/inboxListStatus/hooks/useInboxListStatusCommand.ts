import { useRecoilCallback } from 'recoil'
import { inboxStatusState } from '../atom'
import { InboxListStatus } from '../type'

export const useInboxListStatusCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: Partial<InboxListStatus>) => {
        set(inboxStatusState, (prev) => ({
          ...prev,
          ...input,
        }))
      },
    [],
  )

  return {
    upsert,
  }
}
