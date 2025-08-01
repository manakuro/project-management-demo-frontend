import { TaskDetailModal } from '@/components/features/organisms/TaskDetails';
import {
  TasksContainer,
  TasksFilesContent,
  TasksFilesList,
} from '@/components/features/organisms/Tasks';
import { useTasksFilesDetail } from '@/components/features/organisms/Tasks/TasksFiles/useTasksFilesDetail';
import { Flex } from '@/components/ui/atoms';
import { useProjectsFilesPageQuery } from '@/hooks/queries/app';
import { useProjectsPageContext } from '@/pages/Projects/Provider';
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from '@/router';
import { useProjectsProjectId } from '@/store/app/projects/project';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { SkeletonFiles } from './SkeletonFiles';

export const Files: React.FC = memo(() => {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component: React.FC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useProjectsPageContext();
  const { projectId } = useProjectsProjectId();
  const { loading: queryLoading } = useProjectsFilesPageQuery();
  const loading = useMemo(
    () => tabContentLoading || queryLoading,
    [tabContentLoading, queryLoading],
  );
  const { navigateToProjectsFiles } = useRouter();

  const backToPage = useCallback(async () => {
    await navigateToProjectsFiles(projectId);
  }, [navigateToProjectsFiles, projectId]);

  useTasksFilesDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  if (loading) return <SkeletonFiles />;

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksFilesContent>
          <TasksFilesList />
        </TasksFilesContent>
      </Flex>
      <TaskDetailModal backToPage={backToPage} />
    </>
  );
});
Component.displayName = 'Component';
Files.displayName = 'Files';
