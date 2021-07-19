import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTasksListContentSticky } from 'src/components/organisms'
import { useTaskColumnByType } from 'src/store/entities/taskColumns'
import { TASK_COLUMN_TYPE_FIELD_NAME } from 'src/store/entities/taskColumns/types'

type Props = FlexProps

export const TasksListHorizontalScrollBorder: React.FC<Props> = memo<Props>(
  (props) => {
    const { isStickyVertical } = useTasksListContentSticky()
    const { taskColumn } = useTaskColumnByType(TASK_COLUMN_TYPE_FIELD_NAME)

    if (!isStickyVertical) return null

    return (
      <Flex
        position="absolute"
        top={0}
        left={0}
        borderRight="1px"
        borderStyle="solid"
        borderColor="gray.200"
        h="calc(100% + 64px)"
        w={taskColumn.width}
        zIndex="sticky"
        pointerEvents="none"
        {...props}
      />
    )
  },
)
TasksListHorizontalScrollBorder.displayName = 'TasksListHorizontalScrollBorder'
