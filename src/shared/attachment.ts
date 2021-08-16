import { IconType } from 'src/shared/icons'
import { AttachmentType } from 'src/store/entities/attachments/types'

export const getAttachmentIcon = (type: AttachmentType): IconType => {
  switch (type) {
    case 1:
      return 'imageAlt'
    case 2:
      return 'outlineFilePdf'
    case 3:
      return 'outlineFileText'
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
