import React from 'react'
import { Box, Flex, Image, Text } from 'src/components/atoms'
import { PdfViewer } from 'src/components/organisms/PdfViewer'
import { useAttachment } from 'src/store/entities/attachments'
import { FileTypeCode } from 'src/store/entities/fileTypes'

type Props = {
  attachmentId: string
}

export const ListItem: React.VFC<Props> = (props) => {
  const { attachmentId } = props
  const { attachment } = useAttachment(attachmentId)

  switch (attachment.fileType.typeCode) {
    case FileTypeCode.Image: {
      return <Image src={attachment.src} objectFit="contain" alt="attachment" />
    }
    case FileTypeCode.Pdf: {
      return <PdfViewer fileUrl={attachment.src} />
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
            {attachment.name}
          </Text>
        </Flex>
      )
    }
  }
}
