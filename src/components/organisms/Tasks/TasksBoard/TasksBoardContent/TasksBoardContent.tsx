import React, { memo, useEffect, useRef, useState } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTaskDetailDrawer } from 'src/components/organisms'
import { useTasksBoardListSectionElement } from 'src/components/organisms/Tasks/TasksBoard/TasksBoardListSection'
import { useMainStyle, usePrevious } from 'src/hooks'
import { useBreakpointValue } from 'src/shared/chakra'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { transitions } from 'src/styles'

type Props = FlexProps

const maxH = 72 + 40
export const TasksBoardContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()
  const { isOpen, taskId } = useTaskDetailDrawer()
  const { getTasksBoardListSectionElementByTaskId } =
    useTasksBoardListSectionElement()
  const ref = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState<FlexProps>()
  const prevIsOpen = usePrevious(isOpen)
  const margin = useBreakpointValue({ base: 220, '2xl': 600 }) ?? 0

  useEffect(() => {
    const current = ref.current
    if (prevIsOpen) return
    if (!isOpen) {
      setStyle({})
      return
    }
    if (!isHTMLElement(current)) return

    const boardListSectionElement =
      getTasksBoardListSectionElementByTaskId(taskId)
    if (!isHTMLElement(boardListSectionElement)) return

    setTimeout(() => {
      const left = boardListSectionElement.offsetLeft

      // Skip scrolling when the first section is clicked
      if (left < 300) return

      setStyle({ width: '36%', minWidth: 'calc(100% - 670px)' })
      current.scrollTo({
        left: left - margin,
        behavior: 'smooth',
      })
    }, 500)
  }, [
    getTasksBoardListSectionElementByTaskId,
    isOpen,
    margin,
    prevIsOpen,
    taskId,
  ])

  return (
    <Flex
      ref={ref}
      flex={1}
      maxW={maxW}
      overflowX="scroll"
      overflowY="hidden"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.50"
      transition={transitions.base()}
      {...style}
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  )
})
TasksBoardContent.displayName = 'TasksBoardContent'
