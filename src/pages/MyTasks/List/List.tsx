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
  TasksListHeader,
  TasksListSection,
} from 'src/components/organisms'
import { useMyTasksComponent } from 'src/pages/MyTasks/Provider'
import { useMyTasks, useMyTaskTaskColumns } from 'src/store/app/myTasks'
import { SkeletonList } from './SkeletonList'
import { useTasksListBody } from './useTasksListBody'

export const List: React.VFC = memo(() => {
  const { myTaskIds } = useMyTasks()
  const { loading } = useMyTasksComponent()
  const { id } = useTasksListBody()
  const { taskColumnIds } = useMyTaskTaskColumns()

  if (loading) return <SkeletonList />

  return (
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
      <Flex px={6} flex={1}>
        <Flex flex={1} flexDirection="column" id={id}>
          <TasksListHeader taskColumnIds={taskColumnIds} />
          {myTaskIds.map((id) => (
            <TasksListSection myTaskId={id} key={id} />
          ))}
        </Flex>
      </Flex>
    </TasksList>
  )
})
List.displayName = 'List'
