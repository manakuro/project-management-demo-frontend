import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useHomeContentDom, useTasksListContentVerticalScroll } from './hooks'

type Props = FlexProps

const HEADER_HEIGHT = 72
export const Content: React.VFC<Props> = memo<Props>((props) => {
  const { ref } = useHomeContentDom()

  useTasksListContentVerticalScroll({ listenOnEvent: true })

  return (
    <Flex
      ref={ref}
      maxH={`calc(100vh - ${HEADER_HEIGHT}px)`}
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      overflowY="scroll"
    >
      <Flex w="840px" mx="auto" py={10} {...props} justifyContent="center" />
    </Flex>
  )
})
Content.displayName = 'Content'
