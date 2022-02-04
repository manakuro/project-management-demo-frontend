import React, { memo, useCallback, useMemo } from 'react'
import { CheckIcon as AtomsCheckIcon, IconProps } from 'src/components/atoms'
import { ChakraProps } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/project'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
  projectId: string
  isHovering: boolean
} & Omit<IconProps, 'icon'>

export const CheckIcon: React.FC<Props> = memo<Props>((props) => {
  const { taskId, isHovering, projectId } = props
  const { task, setTask } = useTask(taskId)
  const { project } = useProject(projectId)

  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      await setTask({ completed: !task.completed })
    },
    [task, setTask],
  )

  const colorStyle = useMemo((): ChakraProps => {
    if (!project.id) return {}

    return {
      color: 'white',
    }
  }, [project.id])

  return (
    <AtomsCheckIcon
      completed={task.completed}
      onClick={handleToggleDone}
      marginLeft={isHovering ? 0 : '-25px'}
      {...colorStyle}
    />
  )
})
CheckIcon.displayName = 'CheckIcon'
