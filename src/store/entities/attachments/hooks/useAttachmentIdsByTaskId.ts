import { useRecoilValue } from 'recoil'
import { attachmentIdsByTaskIdState } from '../atom'

export const useAttachmentIdsByTaskId = (taskId: string) => {
  const attachmentIds = useRecoilValue(attachmentIdsByTaskIdState(taskId))

  return {
    attachmentIds,
  }
}
