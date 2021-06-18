import { selectorFamily, useRecoilValue } from 'recoil'
import { attachmentsState } from 'src/store/entities/attachments'

export const feedsAttachmentIdsSelector = selectorFamily<string[], string>({
  key: 'feedsAttachmentIdsSelector',
  get:
    (feedId) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      return attachments.filter((p) => p.feedId === feedId).map((p) => p.id)
    },
})
export const useFeedsAttachmentIds = (feedId: string) => {
  const attachmentIds = useRecoilValue(feedsAttachmentIdsSelector(feedId))
  return {
    attachmentIds,
  }
}
