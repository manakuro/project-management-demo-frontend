import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks'
import { useTasksListContent } from './useTasksListContent'
import { useTasksListContentScroll } from './useTasksListContentScroll'
import { useTasksListContentSticky } from './useTasksListContentSticky'

type Props = FlexProps

const maxH = 72 + 60
export const TasksListContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()
  const { ref } = useTasksListContent()

  useTasksListContentScroll({ listenOnEvent: true })
  useTasksListContentSticky({ listenOnEvent: true })

  return (
    <Flex
      ref={ref}
      flex={1}
      maxW={maxW}
      overflowX="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  )
})
TasksListContent.displayName = 'TasksListContent'
