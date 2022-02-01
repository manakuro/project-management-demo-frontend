import { FileTypeCode, FileTypeCodeValue } from 'src/store/entities/fileTypes'

export const getAttachmentName = (type: FileTypeCodeValue): string => {
  switch (type) {
    case FileTypeCode.Pdf:
      return 'PDF'
    default:
      return 'Attachment'
  }
}
