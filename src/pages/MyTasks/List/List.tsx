import React, { memo } from 'react'
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
} from 'src/components/organisms'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { SkeletonList } from './SkeletonList'

export const List: React.VFC = memo(() => {
  const { loading } = useMyTasksContext()

  if (loading) return <SkeletonList />

  return (
    <TasksProvider isMyTasksPage>
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
    </TasksProvider>
  )
})
List.displayName = 'List'
