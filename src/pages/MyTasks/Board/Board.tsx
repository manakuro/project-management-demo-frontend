import React, { memo } from 'react'
import {
  CustomizeButton,
  IncompleteTasksButton,
  SortButton,
  TasksHeader,
  TasksHeaderRight,
  TasksList,
  TasksProvider,
  TasksBoardContent,
  TasksBoardList,
  TaskDetailDrawer,
  useTasksBoardDetail,
} from 'src/components/organisms'
import { CustomizeMenu } from 'src/components/organisms/Tasks'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { SkeletonBoard } from './SkeletonBoard'

export const Board: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { loading } = useMyTasksContext()
  const { backToPage, skipElement } = useTasksBoardDetail()

  if (loading) return <SkeletonBoard />

  return (
    <>
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
        <TasksBoardContent>
          <TasksBoardList />
        </TasksBoardContent>
      </TasksList>
      <CustomizeMenu />
      <TaskDetailDrawer backToPage={backToPage} skipElement={skipElement} />
    </>
  )
})
Board.displayName = 'Board'
