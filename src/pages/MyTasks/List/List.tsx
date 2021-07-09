import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
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
  TasksProvider,
} from 'src/components/organisms'
import { useMainStyle } from 'src/hooks'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { useMyTasksTaskColumns } from 'src/store/app/myTasks/taskColumns'
import { SkeletonList } from './SkeletonList'

const maxH = 72 + 60
export const List: React.VFC = memo(() => {
  const { taskColumnIds } = useMyTasksTaskColumns()
  const { loading } = useMyTasksContext()
  const { maxW } = useMainStyle()

  if (loading) return <SkeletonList />

  return (
    <TasksProvider isMyTasksPage>
      <TasksList taskColumnIds={taskColumnIds}>
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
        <Flex
          flex={1}
          maxW={maxW}
          overflowX="scroll"
          maxH={`calc(100vh - ${maxH}px)`}
        >
          <Flex flex={1} flexDirection="column">
            <TasksListHeader />
            <TasksListBody>
              <TasksListLayout />
            </TasksListBody>
          </Flex>
        </Flex>
      </TasksList>
    </TasksProvider>
  )
})
List.displayName = 'List'
