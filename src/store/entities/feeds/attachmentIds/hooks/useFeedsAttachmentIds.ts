import { useRecoilValue } from 'recoil'
import { feedsAttachmentIdsSelector } from '../atom'

export const useFeedsAttachmentIds = (feedId: string) => {
  const attachmentIds = useRecoilValue(feedsAttachmentIdsSelector(feedId))
  return {
    attachmentIds,
  }
}
