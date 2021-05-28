import {
  ATTACHMENT_TYPE_IMAGE,
  ATTACHMENT_TYPE_PDF,
  ATTACHMENT_TYPE_TEXT,
} from 'src/store/attachments/types'

export const getAttachmentTypeFromFile = (
  fileType: string,
):
  | typeof ATTACHMENT_TYPE_IMAGE
  | typeof ATTACHMENT_TYPE_PDF
  | typeof ATTACHMENT_TYPE_TEXT => {
  if (fileType.includes('image')) return ATTACHMENT_TYPE_IMAGE
  if (fileType.includes('pdf')) return ATTACHMENT_TYPE_PDF

  return ATTACHMENT_TYPE_TEXT
}
