import React, { memo, useCallback, useMemo } from 'react'
import { Box } from 'src/components/atoms'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks'
import { useTasksTaskSection } from 'src/components/organisms/Tasks/hooks'
import { Input } from './Input'

type Props = {
  taskSectionId: string
}

export const TaskSectionName: React.FC<Props> = memo<Props>((props) => {
  const { taskSection, setSectionName } = useTasksTaskSection(
    props.taskSectionId,
  )
  const { focused, onFocusInput, onUnfocusInput } = useTasksListSectionContext()

  const showInput = useMemo(() => {
    if (taskSection.isNew) return true
    return focused
  }, [focused, taskSection.isNew])

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
