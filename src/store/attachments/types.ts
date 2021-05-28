export const ATTACHMENT_TYPE_IMAGE = 1 as const
export const ATTACHMENT_TYPE_FILE = 2 as const
export const ATTACHMENT_TYPE_TEXT = 3 as const

export type AttachmentType =
  | typeof ATTACHMENT_TYPE_IMAGE
  | typeof ATTACHMENT_TYPE_FILE
  | typeof ATTACHMENT_TYPE_TEXT
