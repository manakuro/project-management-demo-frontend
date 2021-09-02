import { useRecoilValue } from 'recoil'
import { attachmentIdsByTaskIdSelector } from '../atom'

export const useAttachmentIdsByTaskId = (taskId: string) => {
  const attachmentIds = useRecoilValue(attachmentIdsByTaskIdSelector(taskId))

  return {
    attachmentIds,
  }
}
