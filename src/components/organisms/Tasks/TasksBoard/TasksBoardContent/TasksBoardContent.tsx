import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks'

type Props = FlexProps

const maxH = 72 + 40
export const TasksBoardContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()

  return (
    <Flex
      flex={1}
      maxW={maxW}
      overflowX="scroll"
      overflowY="hidden"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.50"
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  )
})
TasksBoardContent.displayName = 'TasksBoardContent'
