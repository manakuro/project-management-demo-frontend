import React, { memo, useCallback, useMemo } from 'react'
import { Box } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'
import { Input } from './Input'

type Props = {
  taskSectionId: string
}

export const TaskSectionName: React.FC<Props> = memo<Props>((props) => {
  const { useTaskByTaskSection, addedTaskSectionId, resetAddedTaskSectionId } =
    useTasksContext()
  const { taskSection, setSectionName } = useTaskByTaskSection(
    props.taskSectionId,
  )
  const { focused, onFocusInput, onUnfocusInput } = useTasksListSectionContext()

  const showInput = useMemo(() => {
    if (addedTaskSectionId === props.taskSectionId) return true
    return focused
  }, [addedTaskSectionId, focused, props.taskSectionId])

  const handleClick = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  const handleClickOutside = useCallback(() => {
    onUnfocusInput()
    resetAddedTaskSectionId()
  }, [onUnfocusInput, resetAddedTaskSectionId])

  const handleChange = useCallback(
    async (val: string) => {
      await setSectionName(val)
    },
    [setSectionName],
  )

  if (showInput) {
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
TaskSectionName.displayName = 'TaskSectionName'
