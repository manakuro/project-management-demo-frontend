import React, { memo, useLayoutEffect } from 'react'
import { Flex, Skeleton, Stack } from 'src/components/atoms'
import { useTasksListDetail } from 'src/components/organisms'
import { MakePublic } from 'src/components/organisms/TaskDetail/TaskDetailBody/MakePublic'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'
import { Form } from './Form'

type Props = {
  isMakePublic?: boolean
  loading?: boolean
}

export const TaskDetailBody: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useTaskDetailBody(props.loading)
  const { scrollId } = useTasksListDetail()

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

  if (props.loading)
    return (
      <Flex flexDirection="column" flex={1}>
        <Skeleton h="44px" />

        <Stack direction="column" spacing={4} mt={4} px={6}>
          <Skeleton h="16px" w="60%" borderRadius="full" />
          <Skeleton h="16px" w="50%" borderRadius="full" />
          <Skeleton h="16px" w="40%" borderRadius="full" />
          <Skeleton h="16px" w="45%" borderRadius="full" />
        </Stack>
      </Flex>
    )

  return (
    <Flex overflowY="scroll" flexDirection="column" ref={ref}>
      {props.isMakePublic && <MakePublic />}
      <Form />
    </Flex>
  )
})
