import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTasksNameContext } from './TasksNameProvider'

type Props = FlexProps

export const TasksNameGrabIconContainer: React.FC<Props> = memo<Props>(
  (props) => {
    const { isHovering } = useTasksNameContext()

    return (
      <Flex
        position="absolute"
        left="0"
        w="24px"
        top="-1px"
        h="37px"
        borderTop="1px"
        borderBottom="1px"
        borderColor={isHovering ? 'gray.400' : 'white'}
        borderStyle="solid"
        justifyContent="center"
        alignItems="center"
        {...props}
      />
    )
  },
)
TasksNameGrabIconContainer.displayName = 'TasksNameGrabIconContainer'
