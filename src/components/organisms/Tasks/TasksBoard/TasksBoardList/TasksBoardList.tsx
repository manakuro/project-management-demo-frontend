import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTaskSectionFromTasks } from 'src/components/organisms/Tasks/hooks'
import { TasksBoardListSection } from '../TasksBoardListSection'

export const TasksBoardList: React.VFC = memo(() => {
  const { taskSectionIds } = useTaskSectionFromTasks()

  return (
    <Flex direction="row" flex={1} px={2} pt={2} position="relative">
      {taskSectionIds.map((id, i) => (
        <TasksBoardListSection
          taskSectionId={id}
          key={id}
          showAddButton={taskSectionIds.length === i + 1}
        />
      ))}
    </Flex>
  )
})
TasksBoardList.displayName = 'TasksBoardList'
