import React, { memo } from 'react'
import {
  CustomizeButton,
  IncompleteTasksButton,
  SortButton,
  TasksHeader,
  TasksHeaderRight,
  TasksList,
  TasksListContent,
  TasksProvider,
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
        <TasksHeader
          h="40px"
          boxShadow="sm"
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          alignItems="center"
        >
          <TasksHeaderRight ml="auto">
            <IncompleteTasksButton />
            <SortButton />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        <TasksListContent></TasksListContent>
      </TasksList>
      <CustomizeMenu />
    </TasksProvider>
  )
})
Board.displayName = 'Board'
