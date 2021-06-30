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
  TasksListBody,
} from 'src/components/organisms'
import { useMyTasksComponent } from 'src/pages/MyTasks/Provider'
import { useMyTasks } from 'src/store/app/myTasks'
import { useMyTasksTaskColumns } from 'src/store/app/myTasks/taskColumns'
import { SkeletonList } from './SkeletonList'

export const List: React.VFC = memo(() => {
  const { taskSectionIds } = useMyTasks()
  const { taskColumnIds } = useMyTasksTaskColumns()
  const { loading } = useMyTasksComponent()

  if (loading) return <SkeletonList />

  return (
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
            {taskSectionIds.map((id, i) => (
              <TasksListSection
                taskSectionId={id}
                key={id}
                showAddButton={taskSectionIds.length === i + 1}
              />
            ))}
          </TasksListBody>
        </Flex>
      </Flex>
    </TasksList>
  )
})
List.displayName = 'List'
