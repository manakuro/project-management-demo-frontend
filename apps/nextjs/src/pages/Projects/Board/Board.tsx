import type React from 'react';
import { memo, useCallback } from 'react';
import { TaskDetailDrawer } from 'src/components/features/organisms/TaskDetails';
import {
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  TasksBoardContent,
  TasksBoardList,
  TasksContainer,
  TasksHeader,
  TasksHeaderRight,
  useTasksBoardDetail,
} from 'src/components/features/organisms/Tasks';
import { Flex } from 'src/components/ui/atoms';
import { useProjectsPageContext } from 'src/pages/Projects/Provider';
import {
  getProjectsDetailId,
  isProjectsDetailURL,
  useRouter,
} from 'src/router';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { SortMenu } from '../TasksHeader';
import { SkeletonBoardContent, SkeletonBoardHeader } from './SkeletonBoard';

export const Board: React.FC = memo(() => {
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
  const { navigateToProjectsBoard } = useRouter();
  const { hasClickedOutside } = useTasksBoardDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  const backToPage = useCallback(async () => {
    await navigateToProjectsBoard(projectId);
  }, [navigateToProjectsBoard, projectId]);

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonBoardHeader />
        <SkeletonBoardContent />
      </Flex>
    );

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksHeader
          h="40px"
          boxShadow="sm"
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          alignItems="center"
        >
          <TasksHeaderRight ml="auto">
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        {contentLoading ? (
          <SkeletonBoardContent />
        ) : (
          <TasksBoardContent>
            <TasksBoardList />
          </TasksBoardContent>
        )}
      </Flex>
      <CustomizeMenu />
      <TaskDetailDrawer
        backToPage={backToPage}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
Component.displayName = 'Component';
Board.displayName = 'Board';
