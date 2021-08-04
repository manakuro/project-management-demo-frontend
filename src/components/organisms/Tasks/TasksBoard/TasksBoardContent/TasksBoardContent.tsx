import React, { memo, useEffect, useMemo, useRef } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTaskDetailDrawer } from 'src/components/organisms'
import { useTasksBoardListSectionElement } from 'src/components/organisms/Tasks/TasksBoard/TasksBoardListSection'
import { useMainStyle } from 'src/hooks'
import { isHTMLElement } from 'src/shared/isHTMLElement'

type Props = FlexProps

const maxH = 72 + 40
const MARGIN = 60
export const TasksBoardContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()
  const { isOpen, taskId } = useTaskDetailDrawer()
  const { getTasksBoardListSectionElementByTaskId } =
    useTasksBoardListSectionElement()
  const ref = useRef<HTMLDivElement | null>(null)
  const style = useMemo<FlexProps>(
    () => ({
      ...(isOpen ? { width: '36%' } : {}),
    }),
    [isOpen],
  )

  useEffect(() => {
    const current = ref.current
    if (!isOpen) return
    if (!isHTMLElement(current)) return

    const boardListSectionElement =
      getTasksBoardListSectionElementByTaskId(taskId)
    if (!isHTMLElement(boardListSectionElement)) return

    setTimeout(() => {
      const left = boardListSectionElement.offsetLeft
      current.scrollTo({
        left: left - MARGIN,
        behavior: 'smooth',
      })
    }, 500)
  }, [getTasksBoardListSectionElementByTaskId, isOpen, taskId])

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
