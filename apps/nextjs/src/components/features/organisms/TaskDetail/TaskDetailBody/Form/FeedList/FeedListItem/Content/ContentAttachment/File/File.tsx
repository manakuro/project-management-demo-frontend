import { AttachmentBox } from '@/components/features/molecules/AttachmentBox';
import type { FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps & {
  taskFileId: string;
};

export const File: React.FC<Props> = memo<Props>((props) => {
  return (
    <AttachmentBox
      size="lg"
      bg="white"
      cursor="pointer"
      _hover={{
        borderColor: 'gray.400',
      }}
      {...props}
    />
  );
});
File.displayName = 'File';
