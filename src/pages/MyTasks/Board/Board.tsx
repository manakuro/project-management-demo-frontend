import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  CustomizeButton,
  IncompleteTasksButton,
  SortButton,
  TasksHeader,
  TasksHeaderRight,
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
  const { loadingTabContent } = useMyTasksContext()
  const { backToPage, skipElement } = useTasksBoardDetail()

  if (loadingTabContent) return <SkeletonBoard />

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
            <IncompleteTasksButton />
            <SortButton projectSortable={false} />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        <TasksBoardContent>
          <TasksBoardList />
        </TasksBoardContent>
      </Flex>
      <CustomizeMenu />
      <TaskDetailDrawer backToPage={backToPage} skipElement={skipElement} />
    </>
  )
})
Board.displayName = 'Board'
