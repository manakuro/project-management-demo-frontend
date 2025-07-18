import type React from 'react';
import { memo } from 'react';
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
import { useMyTasksContext } from 'src/pages/MyTasks/Provider';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from 'src/router';
import { SortMenu } from '../TasksHeader';
import { SkeletonBoardContent, SkeletonBoardHeader } from './SkeletonBoard';

export const Board: React.FC = memo(() => {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  );
});

const Component: React.FC = memo(() => {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    startContentLoading,
    endContentLoading,
    contentLoading,
  } = useMyTasksContext();
  const { navigateToMyTasksBoard } = useRouter();
  const { hasClickedOutside } = useTasksBoardDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

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
            <SortMenu projectSortable={false} />
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
        backToPage={navigateToMyTasksBoard}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
Board.displayName = 'Board';
Component.displayName = 'Component';
