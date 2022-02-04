import React from 'react'
import { Flex, FlexProps, Icon, Link, Text } from 'src/components/atoms'
import {
  useTaskFile,
  getTaskFileIcon,
  getTaskFileName,
} from 'src/store/entities/taskFile'
import { transitions } from 'src/styles'

type Props = FlexProps & {
  size: Sizes
  taskFileId: string
  isHovering?: boolean
}
export type TaskFileBoxProps = Props

const sizes = {
  lg: {
    w: '420px',
    h: 16,
  },
  md: {
    w: 60,
    h: 16,
  },
} as const
type Sizes = keyof typeof sizes

export const AttachmentBox: React.FC<Props> = (props) => {
  const { size, color, taskFileId, isHovering, ...rest } = props
  const { taskFile } = useTaskFile(taskFileId)
  const sizeStyle = sizes[size]
  const icon = getTaskFileIcon(taskFile.fileType.typeCode)
  const taskFileName = getTaskFileName(taskFile.fileType.typeCode)

  return (
    <Flex
      borderRadius="lg"
      border="1px"
      borderColor={isHovering ? 'gray.400' : 'gray.200'}
      alignItems="center"
      transition={transitions.base()}
      p={4}
      {...sizeStyle}
      {...rest}
    >
      <Icon icon={icon} color="text.muted" size="2xl" />
      <Flex ml={4} flexDirection="column" flex={1} minW={0}>
        <Text fontSize="sm" isTruncated>
          {taskFile.name}
        </Text>
        <Flex>
          <Text as="span" fontSize="xs" color="text.muted">
            {taskFileName}・
            <Link
              href={taskFile.src}
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
