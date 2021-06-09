import React, { memo } from 'react'
import {
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from 'src/components/atoms'
import { formatAttachmentCreatedAt } from 'src/shared/date'
import { useAttachment } from 'src/store/entities/attachments'
import { useFileViewerModal } from './useFileViewerModal'

type Props = {}

export const Header: React.VFC<Props> = memo(() => {
  const { onClose, currentAttachmentId } = useFileViewerModal()
  const { attachment } = useAttachment(currentAttachmentId)
  const formattedCreateAt = formatAttachmentCreatedAt(attachment.createdAt)

  return (
    <Flex h="full">
      <Flex flexDirection="column" py={4} px={6}>
        <Text fontSize="md">{attachment.name}</Text>
        <Text fontSize="sm" color="text.muted">
          {formattedCreateAt}
        </Text>
      </Flex>
      <Stack direction="row" spacing={2} ml="auto" py={4} px={6}>
        <Link href={attachment.src} download>
          <Button
            leftIcon={<Icon icon="download" />}
            iconSpacing={2}
            variant="ghost"
            lightBg
          >
            Download
          </Button>
        </Link>
        <Button
          leftIcon={<Icon icon="commentDots" />}
          iconSpacing={2}
          variant="ghost"
          lightBg
        >
          Add Feedback
        </Button>
      </Stack>
      <Divider orientation="vertical" />
      <Flex py={4} px={6} justifyContent="center" alignItems="center">
        <IconButton
          icon={<Icon icon="x" size="lg" />}
          aria-label="close modal"
          variant="ghost"
          light
          onClick={onClose}
        />
      </Flex>
    </Flex>
  )
})
Header.displayName = 'Header'
