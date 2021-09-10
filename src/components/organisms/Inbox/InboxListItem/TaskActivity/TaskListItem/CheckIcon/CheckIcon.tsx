import React, { memo, useCallback } from 'react'
import {
  CheckIcon as AtomsCheckIcon,
  CheckIconProps,
} from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
  isTransitioning: boolean
  onEndTransition: () => void
  onStartTransition: () => void
} & Omit<CheckIconProps, 'isDone'>

export const CheckIcon: React.VFC<Props> = memo((props) => {
  const { taskId, isTransitioning, onEndTransition, onStartTransition } = props
  const { task, setTask } = useTask(taskId)

  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      e.preventDefault()

      if (!task.isDone) {
        onStartTransition()
        setTimeout(async () => {
          await setTask({ isDone: !task.isDone })
          onEndTransition()
        }, 1000)
        return
      }

      await setTask({ isDone: !task.isDone })
      onEndTransition()
    },
    [onEndTransition, onStartTransition, setTask, task.isDone],
  )

  return (
    <AtomsCheckIcon
      isDone={task.isDone}
      onClick={handleToggleDone}
      isTransitioning={isTransitioning}
    />
  )
})
CheckIcon.displayName = 'CheckIcon'
