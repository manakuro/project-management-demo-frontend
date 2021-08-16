import React, { memo, useCallback } from 'react'
import {
  Flex,
  FlexProps,
  Icon,
  Link,
  Text,
  Image,
  Divider,
} from 'src/components/atoms'
import { useHover } from 'src/hooks/useHover'
import { getAttachmentIcon } from 'src/shared/attachment'
import { useAttachment } from 'src/store/entities/attachments'
import { ATTACHMENT_TYPE_IMAGE } from 'src/store/entities/attachments/types'
import { useTask } from 'src/store/entities/tasks'
import { transitions } from 'src/styles'

type Props = {
  attachmentId: string
} & FlexProps

export const TasksFilesListItem: React.VFC<Props> = memo((props) => {
  const { attachmentId, ...rest } = props
  const { ref, isHovering } = useHover()
  const { attachment } = useAttachment(attachmentId)
  const { task } = useTask(attachment.taskId)
  const icon = getAttachmentIcon(attachment.type)

  const handleOpenTaskDetail = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation()
    },
    [],
  )

  return (
    <Flex
      ref={ref}
      border="1px"
      borderRadius="md"
      borderColor={isHovering ? 'gray.400' : 'gray.200'}
      transition={transitions.base()}
      flexDirection="column"
      cursor="pointer"
      w="420px"
      maxW="420px"
      maxH="275px"
      bg="white"
      {...rest}
    >
      <Flex p={4} alignItems="center">
        <Icon icon={icon} color="text.muted" size="2xl" />
        <Flex ml={4} flexDirection="column" flex={1} minW={0}>
          <Text fontSize="sm" isTruncated>
            {attachment.name}
          </Text>
          <Flex>
            <Link
              fontSize="xs"
              color="text.muted"
              hover
              onClick={handleOpenTaskDetail}
            >
              {task.name}
            </Link>
          </Flex>
        </Flex>
      </Flex>
      {attachment.type === ATTACHMENT_TYPE_IMAGE && (
        <>
          <Divider />
          <Image
            width="auto"
            maxW="100%"
            src={attachment.src}
            borderBottomRadius="md"
            objectFit="cover"
            overflow="hidden"
          />
        </>
      )}
    </Flex>
  )
})
TasksFilesListItem.displayName = 'TasksFilesListItem'
