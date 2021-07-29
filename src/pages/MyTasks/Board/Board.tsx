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
import { CustomizeMenu } from 'src/components/organisms/Tasks'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { SkeletonBoard } from './SkeletonBoard'

export const Board: React.VFC = memo(() => {
  const { loading } = useMyTasksContext()

  if (loading) return <SkeletonBoard />

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
      <CustomizeMenu />
    </TasksProvider>
  )
})
Board.displayName = 'Board'
