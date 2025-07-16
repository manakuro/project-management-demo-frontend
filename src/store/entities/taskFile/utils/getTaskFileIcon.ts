import type { IconType } from 'src/shared/icons';
import {
  FileTypeCode,
  type FileTypeCodeValue,
} from 'src/store/entities/fileType';

export const getTaskFileIcon = (type: FileTypeCodeValue): IconType => {
  switch (type) {
    case FileTypeCode.Image:
      return 'imageAlt';
    case FileTypeCode.Pdf:
      return 'outlineFilePdf';
    case FileTypeCode.Text:
      return 'outlineFileText';
  }
};
