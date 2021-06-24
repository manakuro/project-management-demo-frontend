import React, { memo, useCallback } from 'react'
import { Box } from 'src/components/atoms'
import { useMyTask } from 'src/store/app/myTasks'
import { useTasksListSectionHeader } from '../Provider'
import { Input } from './Input'

type Props = {
  taskSectionId: string
}

export const TaskSectionName: React.FC<Props> = memo<Props>((props) => {
  const { taskSection, setSectionName } = useMyTask(props.taskSectionId)
  const { focused, onFocusInput, onUnfocusInput } = useTasksListSectionHeader()

  const handleClick = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  const handleClickOutside = useCallback(() => {
    onUnfocusInput()
  }, [onUnfocusInput])

  const handleChange = useCallback(
    async (val: string) => {
      await setSectionName(val)
    },
    [setSectionName],
  )

  if (focused) {
    return (
      <Input
        onClickOutside={handleClickOutside}
        onChange={handleChange}
        value={taskSection.name}
      />
    )
  }

  return (
    <Box
      px={2}
      maxW={80}
      isTruncated
      fontWeight="semibold"
      border="1px"
      borderColor="transparent"
      onClick={handleClick}
      cursor="pointer"
    >
      {taskSection.name}
    </Box>
  )
})
TaskSectionName.displayName = 'TasksListSection'
