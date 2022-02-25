import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import {
  CustomizeMenu,
  CustomizeButton,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderRight,
  TasksProvider,
  TasksBoardContent,
  TasksBoardList,
  useTasksBoardDetail,
} from 'src/components/organisms/Tasks'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from 'src/router'
import { SortMenu } from '../TasksHeader'
import { SkeletonBoardContent, SkeletonBoardHeader } from './SkeletonBoard'

export const Board: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    startContentLoading,
    endContentLoading,
    contentLoading,
  } = useMyTasksContext()
  const { navigateToMyTasksBoard } = useRouter()
  const { hasClickedOutside } = useTasksBoardDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonBoardHeader />
        <SkeletonBoardContent />
      </Flex>
    )

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
  )
})
Board.displayName = 'Board'
Component.displayName = 'Component'
