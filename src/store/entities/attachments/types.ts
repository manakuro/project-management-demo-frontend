export const ATTACHMENT_TYPE_IMAGE = 1 as const
export const ATTACHMENT_TYPE_PDF = 2 as const
export const ATTACHMENT_TYPE_TEXT = 3 as const

export type AttachmentType =
  | typeof ATTACHMENT_TYPE_IMAGE
  | typeof ATTACHMENT_TYPE_PDF
  | typeof ATTACHMENT_TYPE_TEXT

export const ATTACHMENT_STATUS_ATTACHED = 1 as const
export const ATTACHMENT_STATUS_UNATTACHED = 2 as const

export type AttachmentStatus =
  | typeof ATTACHMENT_STATUS_ATTACHED
  | typeof ATTACHMENT_STATUS_UNATTACHED
