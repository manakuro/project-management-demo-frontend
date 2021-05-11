export const ATTACHMENT_TYPE_IMAGE = 1 as const
export const ATTACHMENT_TYPE_PDF = 2 as const
export const ATTACHMENT_TYPE_TEXT = 3 as const

export type AttachmentType =
  | typeof ATTACHMENT_TYPE_IMAGE
  | typeof ATTACHMENT_TYPE_PDF
  | typeof ATTACHMENT_TYPE_TEXT
