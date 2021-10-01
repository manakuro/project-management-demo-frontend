import { useRecoilValue } from 'recoil'
import { attachmentIdsByFeedIdState } from '../atom'

export const useAttachmentIdsByFeedId = (feedId: string) => {
  const attachmentIds = useRecoilValue(attachmentIdsByFeedIdState(feedId))

  return {
    attachmentIds,
  }
}
