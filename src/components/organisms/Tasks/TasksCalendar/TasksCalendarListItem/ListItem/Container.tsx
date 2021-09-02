import React, { memo, useCallback, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useColorPicker } from 'src/hooks'
import { useRouter } from 'src/router'
import { forwardRef } from 'src/shared/chakra'
import { useProjectIdsByTaskId } from 'src/store/entities/projectTasks'
import { useProject } from 'src/store/entities/projects'
import { useTask } from 'src/store/entities/tasks'
import { transitions } from 'src/styles'

type Props = {
  taskId: string
} & FlexProps

export const Container: React.FC<Props> = memo<Props>(
  forwardRef((props, ref) => {
    const { taskId, ...rest } = props
    const { task } = useTask(taskId)
    const { projectIds } = useProjectIdsByTaskId(props.taskId)
    const { project } = useProject(projectIds[0])
    const { findColor } = useColorPicker()
    const { navigateToTaskDetail } = useRouter()

    const handleOpenTaskDetail = useCallback(
      async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        await navigateToTaskDetail(taskId)
      },
      [navigateToTaskDetail, taskId],
    )

    const colorStyle = useMemo((): FlexProps => {
      if (!project.id)
        return {
          bg: 'white',
          color: 'text.base',
          borderColor: 'gray.300',
          _hover: { borderColor: 'cyan.400', boxShadow: 'md' },
        }

      return {
        color: findColor(project.color.id).text,
        bg: project.color.color,
        _hover: { boxShadow: 'md' },
      }
    }, [findColor, project.color.color, project.color.id, project.id])

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
        onClick={handleOpenTaskDetail}
        {...colorStyle}
        {...style}
        {...rest}
      />
    )
  }),
)
Container.displayName = 'Container'
