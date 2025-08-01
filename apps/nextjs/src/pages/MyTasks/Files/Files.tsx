import { TaskDetailModal } from '@/components/features/organisms/TaskDetails';
import {
  TasksContainer,
  TasksFilesContent,
  TasksFilesList,
} from '@/components/features/organisms/Tasks';
import { useTasksFilesDetail } from '@/components/features/organisms/Tasks/TasksFiles/useTasksFilesDetail';
import { Flex } from '@/components/ui/atoms';
import { useMyTasksContext } from '@/pages/MyTasks/Provider';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import type React from 'react';
import { memo } from 'react';
import { SkeletonFiles } from './SkeletonFiles';

export const Files: React.FC = memo(() => {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  );
});

const Component: React.FC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useMyTasksContext();

  const { navigateToMyTasksFiles } = useRouter();

  useTasksFilesDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  if (tabContentLoading) return <SkeletonFiles />;

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksFilesContent>
          <TasksFilesList />
        </TasksFilesContent>
      </Flex>
      <TaskDetailModal backToPage={navigateToMyTasksFiles} />
    </>
  );
});
Component.displayName = 'Component';
Files.displayName = 'Files';
