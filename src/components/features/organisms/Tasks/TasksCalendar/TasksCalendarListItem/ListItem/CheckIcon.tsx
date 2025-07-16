import type React from 'react'
import { memo, useCallback, useMemo } from 'react'
import {
  CheckIcon as AtomsCheckIcon,
  type IconProps,
} from 'src/components/ui/atoms'
import type { ChakraProps } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/project'
import { useTask } from 'src/store/entities/task'

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
