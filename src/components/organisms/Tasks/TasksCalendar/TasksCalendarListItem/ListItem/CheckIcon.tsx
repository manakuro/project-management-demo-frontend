import React, { memo, useCallback, useMemo } from 'react'
import { CheckIcon as AtomsCheckIcon, IconProps } from 'src/components/atoms'
import { ChakraProps } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/projects'
import { useTask } from 'src/store/entities/tasks'
import { useTasksProjectTaskIds } from 'src/store/entities/tasks/projectIds'

type Props = {
  taskId: string
  isHovering: boolean
} & Omit<IconProps, 'icon'>

export const CheckIcon: React.FC<Props> = memo<Props>((props) => {
  const { taskId, isHovering } = props
  const { task, setTask } = useTask(taskId)
  const { projectIds } = useTasksProjectTaskIds(props.taskId)
  const { project } = useProject(projectIds[0])

  const handleToggleDone = useCallback(async () => {
    await setTask({ isDone: !task.isDone })
  }, [task, setTask])

  const colorStyle = useMemo((): ChakraProps => {
    if (!project.id) return {}

    return {
      color: 'white',
    }
  }, [project.id])

  return (
    <AtomsCheckIcon
      isDone={task.isDone}
      onClick={handleToggleDone}
      marginLeft={isHovering ? 0 : '-25px'}
      {...colorStyle}
    />
  )
})
CheckIcon.displayName = 'CheckIcon'