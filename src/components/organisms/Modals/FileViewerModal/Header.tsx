import React, { memo } from 'react'
import { ComingSoonTooltip } from 'src/components/molecules'
import {
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from 'src/components/ui/atoms'
import { formatTaskFileCreatedAt } from 'src/shared/date'
import { useTaskFile } from 'src/store/entities/taskFile'
import { useFileViewerModal } from './useFileViewerModal'

type Props = {}

export const Header: React.FC<Props> = memo(() => {
  const { onClose, currentTaskFileId } = useFileViewerModal()
  const { taskFile } = useTaskFile(currentTaskFileId)
  const formattedCreateAt = formatTaskFileCreatedAt(taskFile.createdAt)

  return (
    <Flex h="full">
      <Flex flexDirection="column" py={4} px={6}>
        <Text fontSize="md">{taskFile.name}</Text>
        <Text fontSize="sm" color="text.muted">
          {formattedCreateAt}
        </Text>
      </Flex>
      <Stack direction="row" spacing={2} ml="auto" py={4} px={6}>
        <Link href={taskFile.src} download>
          <Button
            leftIcon={<Icon icon="download" />}
            iconSpacing={2}
            variant="ghost"
            lightBg
          >
            Download
          </Button>
        </Link>
        <ComingSoonTooltip>
          <Button
            leftIcon={<Icon icon="commentDots" />}
            iconSpacing={2}
            variant="ghost"
            lightBg
          >
            Add Feedback
          </Button>
        </ComingSoonTooltip>
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
