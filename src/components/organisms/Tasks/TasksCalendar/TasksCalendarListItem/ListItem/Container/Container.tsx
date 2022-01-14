import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import {
  useProjectBaseColor,
  useProjectBaseColorText,
} from 'src/store/entities/projectBaseColors'
import { useProject } from 'src/store/entities/projects'
import { useTask } from 'src/store/entities/tasks'
import { transitions } from 'src/styles'

type Props = {
  taskId: string
  projectId: string
} & FlexProps

export const Container: React.FC<Props> = memo<Props>(
  forwardRef((props, ref) => {
    const { taskId, projectId, ...rest } = props
    const { project } = useProject(projectId)
    const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)
    const { textColor } = useProjectBaseColorText(project.projectBaseColorId)
    const { task } = useTask(taskId)

    const colorStyle = useMemo((): FlexProps => {
      if (!project.id)
        return {
          bg: 'white',
          color: 'text.base',
          borderColor: 'gray.300',
          _hover: { borderColor: 'cyan.400', boxShadow: 'md' },
        }

      return {
        color: textColor,
        bg: projectBaseColor.color.color,
        _hover: { boxShadow: 'md' },
      }
    }, [project.id, projectBaseColor.color.color, textColor])

    const style = useMemo(
      () => ({
        ...(task.isDone ? { opacity: 0.6 } : {}),
      }),
      [task.isDone],
    )

    return (
      <Flex
        ref={ref}
        alignItems="center"
        flex={1}
        h={9}
        maxH={9}
        p={1}
        maxW="full"
        cursor="pointer"
        borderRadius="sm"
        border="1px"
        borderColor="transparent"
        transition={transitions.base()}
        boxShadow="sm"
        overflow="hidden"
        {...style}
        {...colorStyle}
        {...rest}
      />
    )
  }),
)
Container.displayName = 'Container'
