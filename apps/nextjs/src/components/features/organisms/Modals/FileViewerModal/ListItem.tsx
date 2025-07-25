import type React from 'react';
import { Box, Flex, Image, Text } from 'src/components/ui/atoms';
import { PdfViewer } from 'src/components/ui/organisms/PdfViewer';
import { FileTypeCode } from 'src/store/entities/fileType';
import { useTaskFile } from 'src/store/entities/taskFile';

type Props = {
  taskFileId: string;
};

export const ListItem: React.FC<Props> = (props) => {
  const { taskFileId } = props;
  const { taskFile } = useTaskFile(taskFileId);

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image: {
      return <Image src={taskFile.src} objectFit="contain" alt="taskFile" />;
    }
    case FileTypeCode.Pdf: {
      return <PdfViewer fileUrl={taskFile.src} />;
    }
    case FileTypeCode.Text: {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box w="40%">
            <Image
              src="/images/not_preview_file.svg"
              objectFit="contain"
              alt="not preview"
            />
          </Box>
          <Text fontSize="xl" mt={4}>
            We're not able to preview this file
          </Text>
          <Text fontSize="sm" color="text.muted" mt={4}>
            {taskFile.name}
          </Text>
        </Flex>
      );
    }
  }
  return null;
};
