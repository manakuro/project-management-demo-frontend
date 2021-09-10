import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { inboxStatusState } from '../atom'

export const useInboxListStatusResponse = () => {
  const setInboxListStatus = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        set(inboxStatusState, data.inboxListStatus)
      },
    [],
  )

  return {
    setInboxListStatus,
  }
}
