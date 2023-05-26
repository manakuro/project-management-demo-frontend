import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { useMainStyle } from 'src/hooks'
import { useTasksListContent } from './useTasksListContent'
import { useTasksListContentHorizontalScroll } from './useTasksListContentHorizontalScroll'
import { useTasksListContentSticky } from './useTasksListContentSticky'
import { useTasksListContentVerticalScroll } from './useTasksListContentVerticalScroll'

type Props = FlexProps

const maxH = 72 + 60
export const TasksListContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()
  const { ref } = useTasksListContent()

  useTasksListContentVerticalScroll({ listenOnEvent: true })
  useTasksListContentSticky({ listenOnEvent: true })
  useTasksListContentHorizontalScroll({ listenOnEvent: true })

  return (
    <Flex
      ref={ref}
      flex={1}
      maxW={maxW}
      overflowX="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  )
})
TasksListContent.displayName = 'TasksListContent'
