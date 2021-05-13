import React from 'react'
import { Flex, FlexProps, Icon, Link, Text } from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'
import { getAttachmentIcon, getAttachmentName } from 'src/shared/attachment'
import { transitions } from 'src/styles'

type Props = FlexProps & {
  size: Sizes
  attachmentId: string
  isHovering: boolean
}
export type AttachmentBoxProps = Props

const sizes = {
  md: {
    w: 60,
    h: 16,
  },
} as const
type Sizes = keyof typeof sizes

export const AttachmentBox: React.FC<Props> = (props) => {
  const { size, color, attachmentId, isHovering, ...rest } = props
  const { attachment } = useAttachment(attachmentId)
  const sizeStyle = sizes[size]
  const icon = getAttachmentIcon(attachment.type)
  const attachmentName = getAttachmentName(attachment.type)

  return (
    <Flex
      borderRadius="lg"
      border="1px"
      borderColor={isHovering ? 'gray.300' : 'gray.200'}
      alignItems="center"
      transition={transitions.base()}
      p={4}
      {...sizeStyle}
      {...rest}
    >
      <Icon icon={icon} color="text.muted" size="2xl" />
      <Flex ml={4} flexDirection="column">
        <Text fontSize="sm" isTruncated>
          {attachment.name}
        </Text>
        <Flex>
          <Text as="span" fontSize="xs" color="text.muted">
            {attachmentName}・
            <Link
              href={attachment.src}
              fontSize="xs"
              color="text.muted"
              download
              hover
              onClick={(e) => e.stopPropagation()}
            >
              Download
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
