import { useRecoilValue } from 'recoil'
import { attachmentIdsByFeedIdSelector } from '../atom'

export const useAttachmentIdsByFeedId = (feedId: string) => {
  const attachmentIds = useRecoilValue(attachmentIdsByFeedIdSelector(feedId))

  return {
    attachmentIds,
  }
}
