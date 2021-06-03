import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'

// type CustomField = {
//   id: number
//   name: string
// }
// const customFields: CustomField = [
//   {
//     id: 1,
//     name: 'Due date',
//   },
//   {
//     id: 2,
//     name: 'Projects',
//   },
//   {
//     id: 3,
//     name: 'Tags',
//   },
// ]

type Props = {
  fields: number[]
}

export const TasksListHeader: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex flex={1}>
      <TasksListCell pl={0} flex={1}>
        Task name
      </TasksListCell>
      <TasksListCell w="12%">Due date</TasksListCell>
      <TasksListCell w="12%">Projects</TasksListCell>
      <TasksListCell w="12%">Tags</TasksListCell>
      <TasksListCell w="4%" borderRight="none" />
    </Flex>
  )
})
TasksListHeader.displayName = 'TasksListHeader'
