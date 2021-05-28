import {
  ATTACHMENT_TYPE_IMAGE,
  ATTACHMENT_TYPE_FILE,
} from 'src/store/attachments/types'

export const getAttachmentTypeFromFile = (
  fileType: string,
): typeof ATTACHMENT_TYPE_IMAGE | typeof ATTACHMENT_TYPE_FILE => {
  if (fileType.includes('image')) return ATTACHMENT_TYPE_IMAGE

  return ATTACHMENT_TYPE_FILE
}
