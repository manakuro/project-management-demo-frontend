import type React from 'react'
import { memo } from 'react'
import { Flex, type FlexProps } from 'src/components/ui/atoms'
import { useMainStyle } from 'src/hooks'
import { transitions } from 'src/styles'

type Props = FlexProps

const maxH = 72
export const TasksFilesContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()

  return (
    <Flex
      flex={1}
      maxW={maxW}
      overflowY="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.50"
      p={8}
      pb={0}
      transition={transitions.base()}
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  )
})
TasksFilesContent.displayName = 'TasksFilesContent'
