import { AttachmentType } from '../types'

export const getAttachmentName = (type: AttachmentType): string => {
  switch (type) {
    case 2:
      return 'PDF'
    default:
      return 'Attachment'
  }
}
