import React, { memo } from 'react'
import { TaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import {
  AddTaskButton,
  CustomizeButton,
  IncompleteTasksButton,
  SortButton,
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
  const { skipElement, backToPage } = useTasksListDetail()
  console.log('List!')

  if (loadingTabContent) return <SkeletonList />

  return (
    <>
      <TasksList>
        <TasksHeader>
          <TasksHeaderLeft>
            <AddTaskButton solid />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksButton />
            <SortButton />
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
      <TaskDetailDrawer backToPage={backToPage} skipElement={skipElement} />
    </>
  )
})
List.displayName = 'List'
