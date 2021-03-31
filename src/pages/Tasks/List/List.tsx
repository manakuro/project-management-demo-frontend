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

export const List: React.VFC = memo(() => {
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
        <Flex flex={1} flexDirection="column">
          <TasksListHeader fields={[1, 2, 3]} />
          <TasksListSection title="Recently assigned" />
        </Flex>
      </Flex>
    </TasksList>
  )
})
