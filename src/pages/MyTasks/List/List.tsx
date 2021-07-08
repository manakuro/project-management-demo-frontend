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
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { useMyTasksTaskColumns } from 'src/store/app/myTasks/taskColumns'
import { SkeletonList } from './SkeletonList'

export const List: React.VFC = memo(() => {
  const { taskColumnIds } = useMyTasksTaskColumns()
  const { loading } = useMyTasksContext()

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
        <Flex flex={1}>
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
