import { useRecoilValue } from 'recoil'
import { attachmentIdsState, attachmentsState } from '../atom'

export const useAttachments = () => {
  const attachmentIds = useRecoilValue(attachmentIdsState)
  const attachments = useRecoilValue(attachmentsState)

  return {
    attachmentIds,
    attachments,
  }
}
