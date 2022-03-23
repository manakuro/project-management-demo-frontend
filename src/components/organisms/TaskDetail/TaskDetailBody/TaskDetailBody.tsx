import React, { memo, useLayoutEffect } from 'react'
import { Flex } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { Form } from './Form'
import { Info } from './Info'
import { SkeletonTaskDetailBody } from './SkeletonTaskDetailBody'
import { useTaskDetailBody } from './useTaskDetailBody'

type Props = {
  isMakePublic?: boolean
  loading?: boolean
}

export const TaskDetailBody: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useTaskDetailBody()
  const { scrollId, taskId } = useTaskDetail()

  useLayoutEffect(() => {
    if (props.loading) return
    if (!scrollId) return
    if (!ref.current) return

    setTimeout(() => {
      const rect = document.getElementById(scrollId)?.getBoundingClientRect()
      const top = (rect?.top ?? 0) - (72 + 57)
      ref.current?.scrollTo({ top, behavior: 'smooth' })
    })
  }, [props.loading, ref, scrollId])

  if (props.loading) return <SkeletonTaskDetailBody />

  return (
    <Flex overflowY="scroll" flexDirection="column" ref={ref} flex={1}>
      <Info taskId={taskId} />
      <Form />
    </Flex>
  )
})
TaskDetailBody.displayName = 'TaskDetailBody'
