import React, { memo, useCallback, useMemo } from 'react'
import { Flex, Text } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useTask } from 'src/store/entities/tasks'
import { Teammate, useTeammate } from 'src/store/entities/teammates'
import { DeleteButton } from './DeleteButton'
import { Input } from './Input'

type Props = {
  taskId: string
  isHovering: boolean
  focused: boolean
  onUnfocus: () => void
}

export const Content: React.VFC<Props> = memo<Props>((props) => {
  const { isHovering, focused, onUnfocus, taskId } = props
  const { task, setTask } = useTask(taskId)
  const { teammate } = useTeammate(task.assigneeId)
  const hasAssigned = useMemo(() => !!task.assigneeId, [task.assigneeId])
  const showIcon = useMemo(
    () => !hasAssigned && isHovering,
    [hasAssigned, isHovering],
  )
  const showResetIcon = useMemo(
    () => hasAssigned && isHovering,
    [hasAssigned, isHovering],
  )

  const handleSelect = useCallback(
    async (val: Teammate) => {
      await setTask({ assigneeId: val.id })
    },
    [setTask],
  )

  if (focused) {
    return <Input onClose={onUnfocus} onSelect={handleSelect} />
  }

  if (showIcon) {
    return <TeammateAvatar teammateId="" bg="gray.200" size="xs" />
  }

  if (hasAssigned) {
    return (
      <>
        <Flex alignItems="center" maxW="inherit">
          <TeammateAvatar teammateId={task.assigneeId} size="xs" />
          <Text fontSize="xs" ml={1} isTruncated>
            {teammate.name}
          </Text>
        </Flex>
        {showResetIcon && <DeleteButton taskId={taskId} />}
      </>
    )
  }

  return null
})
Content.displayName = 'Content'