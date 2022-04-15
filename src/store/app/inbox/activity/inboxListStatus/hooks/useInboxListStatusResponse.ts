import { useRecoilCallback } from 'recoil'
import { inboxStatusState } from '../atom'
import { InboxListStatus } from '../type'

export const useInboxListStatusResponse = () => {
  const setInboxListStatus = useRecoilCallback(
    ({ set }) =>
      (data: InboxListStatus) => {
        set(inboxStatusState, data)
      },
    [],
  )

  return {
    setInboxListStatus,
  }
}
