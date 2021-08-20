import React from 'react'
import { Box, Flex, Image, Text } from 'src/components/atoms'
import { PdfViewer } from 'src/components/organisms/PdfViewer'
import { useAttachment } from 'src/store/entities/attachments'

type Props = {
  attachmentId: string
}

export const ListItem: React.VFC<Props> = (props) => {
  const { attachmentId } = props
  const { attachment } = useAttachment(attachmentId)

  switch (attachment.type) {
    case 1: {
      return <Image src={attachment.src} objectFit="contain" />
    }
    case 2: {
      return <PdfViewer fileUrl={attachment.src} />
    }
    case 3: {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box w="40%">
            <Image src="/images/not_preview_file.svg" objectFit="contain" />
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
