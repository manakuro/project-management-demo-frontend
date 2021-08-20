import React, { memo, useEffect, useMemo, useState } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useNavigation } from 'src/components/organisms/Navigation'
import {
  useTasksListContentSticky,
  useTasksListContentHorizontalScroll,
} from 'src/components/organisms/Tasks'
import { ChakraProps } from 'src/shared/chakra'
import { useTaskColumnByType } from 'src/store/entities/taskColumns'
import { TASK_COLUMN_TYPE_FIELD_NAME } from 'src/store/entities/taskColumns/types'

type Props = FlexProps

const TOP = 72 + 60
export const TasksListHorizontalScrollBorder: React.FC<Props> = memo<Props>(
  (props) => {
    const [opacity, setOpacity] = useState<string>()
    const { isScrolling } = useTasksListContentHorizontalScroll()
    const { isStickyVertical } = useTasksListContentSticky()
    const { taskColumn } = useTaskColumnByType(TASK_COLUMN_TYPE_FIELD_NAME)
    const { isExpanded } = useNavigation()
    const left = useMemo(() => (isExpanded ? '240px' : '53px'), [isExpanded])
    const scrollingStyle = useMemo((): ChakraProps => {
      if (isScrolling) return { shadow: 'md' }
      return {}
    }, [isScrolling])

    // Use setTimeout to prevent border line from flashing  when navigation expands
    useEffect(() => {
      setOpacity('0')

      setTimeout(() => {
        setOpacity('1')
      }, 100)
    }, [isExpanded])

    if (!isStickyVertical) return null

    return (
      <Flex
        position="fixed"
        top={`${TOP}px`}
        left={left}
        h="calc(100% + 64px)"
        w={taskColumn.width}
        zIndex="sticky"
        pointerEvents="none"
        borderRight="1px"
        borderStyle="solid"
        borderColor="gray.200"
        bg="none"
        opacity={opacity}
        {...scrollingStyle}
        {...props}
      />
    )
  },
)
TasksListHorizontalScrollBorder.displayName = 'TasksListHorizontalScrollBorder'
