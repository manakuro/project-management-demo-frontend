import type React from 'react';
import { memo, useCallback } from 'react';
import { useFileViewerModal } from 'src/components/features/organisms/Modals';
import { useTasksRouter } from 'src/components/features/organisms/Tasks/hooks';
import {
  Divider,
  Flex,
  type FlexProps,
  Icon,
  Image,
  Link,
  Text,
} from 'src/components/ui/atoms';
import { useHover } from 'src/hooks/useHover';
import { FileTypeCode } from 'src/store/entities/fileType';
import { useTask } from 'src/store/entities/task';
import {
  getTaskFileIcon,
  useTaskFile,
  useTaskFileIdsByTaskId,
} from 'src/store/entities/taskFile';
import { transitions } from 'src/styles';

type Props = {
  taskFileId: string;
} & FlexProps;

export const TasksFilesListItem: React.FC<Props> = memo((props) => {
  const { taskFileId, ...rest } = props;
  const { ref, isHovering } = useHover();
  const { taskFile } = useTaskFile(taskFileId);
  const { task } = useTask(taskFile.taskId);
  const { taskFileIds } = useTaskFileIdsByTaskId(taskFile.taskId);
  const { onOpen, setState } = useFileViewerModal();
  const icon = getTaskFileIcon(taskFile.fileType.typeCode);
  const { navigateToTaskDetail } = useTasksRouter();

  const handleOpenTaskDetail = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      await navigateToTaskDetail(task.id);
    },
    [navigateToTaskDetail, task.id],
  );

  const handleOpenFileViewer = useCallback(() => {
    setState({
      taskFileIds,
      currentTaskFileId: taskFileId,
    });
    onOpen();
  }, [taskFileId, taskFileIds, onOpen, setState]);

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
          <Text fontSize="sm" noOfLines={1}>
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
  );
});
TasksFilesListItem.displayName = 'TasksFilesListItem';
