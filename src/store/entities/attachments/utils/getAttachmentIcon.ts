import { IconType } from 'src/shared/icons'
import { AttachmentType } from '../types'

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
