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
import { useFileViewerModal } from 'src/components/organisms/Modals'
import { useTasksRouter } from 'src/components/organisms/Tasks/hooks'
import { useHover } from 'src/hooks/useHover'
import { FileTypeCode } from 'src/store/entities/fileType'
import {
  useTaskFile,
  useTaskFileIdsByTaskId,
  getTaskFileIcon,
} from 'src/store/entities/taskFile'
import { useTask } from 'src/store/entities/tasks'
import { transitions } from 'src/styles'

type Props = {
  taskFileId: string
} & FlexProps

export const TasksFilesListItem: React.VFC<Props> = memo((props) => {
  const { taskFileId, ...rest } = props
  const { ref, isHovering } = useHover()
  const { taskFile } = useTaskFile(taskFileId)
  const { task } = useTask(taskFile.taskId)
  const { taskFileIds } = useTaskFileIdsByTaskId(taskFile.taskId)
  const { onOpen, setState } = useFileViewerModal()
  const icon = getTaskFileIcon(taskFile.fileType.typeCode)
  const { navigateToTaskDetail } = useTasksRouter()

  const handleOpenTaskDetail = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation()
      await navigateToTaskDetail(task.id)
    },
    [navigateToTaskDetail, task.id],
  )

  const handleOpenFileViewer = useCallback(() => {
    setState({
      taskFileIds,
      currentTaskFileId: taskFileId,
    })
    onOpen()
  }, [taskFileId, taskFileIds, onOpen, setState])

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
      onClick={handleOpenFileViewer}
      {...rest}
    >
      <Flex p={4} alignItems="center">
        <Icon icon={icon} color="text.muted" size="2xl" />
        <Flex ml={4} flexDirection="column" flex={1} minW={0}>
          <Text fontSize="sm" isTruncated>
            {taskFile.name}
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
      {taskFile.fileType.typeCode === FileTypeCode.Image && (
        <>
          <Divider />
          <Image
            width="auto"
            maxW="100%"
            src={taskFile.src}
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
