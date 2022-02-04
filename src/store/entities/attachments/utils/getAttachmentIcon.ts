import { IconType } from 'src/shared/icons'
import { FileTypeCode, FileTypeCodeValue } from 'src/store/entities/fileTypes'

export const getAttachmentIcon = (type: FileTypeCodeValue): IconType => {
  switch (type) {
    case FileTypeCode.Image:
      return 'imageAlt'
    case FileTypeCode.Pdf:
      return 'outlineFilePdf'
    case FileTypeCode.Text:
      return 'outlineFileText'
  }
}
