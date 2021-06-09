import React, { memo } from 'react'
import {
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  AddTaskButton,
  IncompleteTasksButton,
  SortButton,
  CustomizeButton,
} from 'src/components/organisms'
import { TasksListHeader } from 'src/components/organisms/Tasks/TasksList/TasksListHeader'
import { Flex } from 'src/components/atoms'
import { TasksListSection } from 'src/components/organisms/Tasks/TasksList/TasksListSection'
import { useMyTasks } from 'src/store/app/myTasks'
import { useMyTasksComponent } from 'src/pages/MyTasks/Provider'
import { SkeletonList } from './SkeletonList'
import { useTasksListBody } from './useTasksListBody'

export const List: React.VFC = memo(() => {
  const { myTaskIds } = useMyTasks()
  const { loading } = useMyTasksComponent()
  const { id } = useTasksListBody()

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
          <TasksListHeader fields={[1, 2, 3]} />
          {myTaskIds.map((id) => (
            <TasksListSection myTaskId={id} key={id} />
          ))}
        </Flex>
      </Flex>
    </TasksList>
  )
})
List.displayName = 'List'
