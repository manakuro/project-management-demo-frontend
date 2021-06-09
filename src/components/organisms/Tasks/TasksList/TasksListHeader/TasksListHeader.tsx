import React, { memo, useState } from 'react'
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
  const [width, setWidth] = useState<string>('60%')

  return (
    <Flex flex={1}>
      <TasksListCell
        resizable
        w={width}
        minW="40%"
        pl={0}
        borderLeft="none"
        onChangeSize={(s) => setWidth(s)}
      >
        Task name
      </TasksListCell>
      <TasksListCell resizable w="12%">
        Due date
      </TasksListCell>
      <TasksListCell resizable w="12%">
        Projects
      </TasksListCell>
      <TasksListCell resizable w="12%">
        Tags
      </TasksListCell>
      <TasksListCell w="4%" flex={1} borderRight="none" />
    </Flex>
  )
})
TasksListHeader.displayName = 'TasksListHeader'
