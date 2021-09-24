import React, { memo } from 'react'
import { TaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import {
  AddTaskButton,
  CustomizeButton,
  IncompleteTasksMenu,
  SortMenu,
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
import { SkeletonList } from './SkeletonList'

export const List: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})
const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useMyTasksContext()
  const { navigateToMyTasksList } = useRouter()
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
  })

  if (loadingTabContent) return <SkeletonList />

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
        <TasksListContent>
          <TasksListHeader />
          <TasksListBody>
            <TasksListLayout />
          </TasksListBody>
          <TasksListHorizontalScrollBorder />
        </TasksListContent>
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
