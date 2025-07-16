import {
  FileTypeCode,
  type FileTypeCodeValue,
} from 'src/store/entities/fileType';

export const getTaskFileTypeFromFile = (
  fileType: string,
): FileTypeCodeValue => {
  if (fileType.includes('image')) return FileTypeCode.Image;
  if (fileType.includes('pdf')) return FileTypeCode.Pdf;

  return FileTypeCode.Text;
};
