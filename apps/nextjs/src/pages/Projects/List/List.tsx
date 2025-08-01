import { TaskDetailDrawer } from '@/components/features/organisms/TaskDetails';
import {
  AddTaskButton,
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  MoreActionMenu,
  TasksContainer,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  TasksListBody,
  TasksListContent,
  TasksListHeader,
  TasksListHorizontalScrollBorder,
  TasksListLayout,
  useTasksListDetail,
} from '@/components/features/organisms/Tasks';
import { Flex } from '@/components/ui/atoms';
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from '@/router';
import { useProjectsProjectId } from '@/store/app/projects/project';
import type React from 'react';
import { memo, useCallback } from 'react';
import { useProjectsPageContext } from '../Provider';
import { SortMenu } from '../TasksHeader';
import { SkeletonListContent, SkeletonListHeader } from './SkeletonList';

export const List: React.FC = memo(() => {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});
const Component: React.FC = memo(() => {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    contentLoading,
    startContentLoading,
    endContentLoading,
  } = useProjectsPageContext();
  const { projectId } = useProjectsProjectId();
  const { navigateToProjectsList } = useRouter();
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  const backToPage = useCallback(async () => {
    await navigateToProjectsList(projectId);
  }, [navigateToProjectsList, projectId]);

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonListHeader />
        <SkeletonListContent />
      </Flex>
    );

  return (
    <>
      <TasksList>
        <TasksHeader>
          <TasksHeaderLeft>
            <AddTaskButton />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
            <MoreActionMenu />
          </TasksHeaderRight>
        </TasksHeader>
        {contentLoading ? (
          <SkeletonListContent />
        ) : (
          <TasksListContent>
            <TasksListHeader />
            <TasksListBody>
              <TasksListLayout />
            </TasksListBody>
            <TasksListHorizontalScrollBorder />
          </TasksListContent>
        )}
      </TasksList>
      <CustomizeMenu />
      <TaskDetailDrawer
        backToPage={backToPage}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
List.displayName = 'List';
Component.displayName = 'Component';
