import { AttachmentType } from 'src/store/attachments/types'
import { IconType } from 'src/shared/icons'

export const getAttachmentIcon = (type: AttachmentType): IconType => {
  switch (type) {
    case 2:
      return 'outlineFilePdf'
    case 3:
      return 'outlineFileText'
    default:
      return 'time'
  }
}
export const getAttachmentName = (type: AttachmentType): string => {
  switch (type) {
    case 2:
      return 'PDF'
    default:
      return 'Attachment'
  }
}
