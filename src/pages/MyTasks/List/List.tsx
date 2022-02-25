import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import {
  AddTaskButton,
  CustomizeButton,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  TasksListBody,
  TasksListHeader,
  TasksListLayout,
  TasksListContent,
  TasksProvider,
  TasksListHorizontalScrollBorder,
  CustomizeMenu,
  useTasksListDetail,
} from 'src/components/organisms/Tasks'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from 'src/router'
import { SortMenu } from '../TasksHeader'
import { SkeletonListContent, SkeletonListHeader } from './SkeletonList'

export const List: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})
const Component: React.VFC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery, listContentLoading } =
    useMyTasksContext()
  const { navigateToMyTasksList } = useRouter()
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonListHeader />
        <SkeletonListContent />
      </Flex>
    )

  return (
    <>
      <TasksList>
        <TasksHeader>
          <TasksHeaderLeft>
            <AddTaskButton solid />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksMenu />
            <SortMenu />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        {listContentLoading ? (
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
        backToPage={navigateToMyTasksList}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  )
})
List.displayName = 'List'
Component.displayName = 'Component'
