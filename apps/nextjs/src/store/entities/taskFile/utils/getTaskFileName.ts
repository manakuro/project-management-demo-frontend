import {
  FileTypeCode,
  type FileTypeCodeValue,
} from 'src/store/entities/fileType';

export const getTaskFileName = (type: FileTypeCodeValue): string => {
  switch (type) {
    case FileTypeCode.Pdf:
      return 'PDF';
    default:
      return 'Attachment';
  }
};
