import React from 'react'
import { Flex, Skeleton, Stack } from 'src/components/atoms'
import { MakePublic } from 'src/components/organisms/TaskDetail/TaskDetailBody/MakePublic'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'
import { Form } from './Form'

type Props = {
  isMakePublic?: boolean
  loading?: boolean
}

export const TaskDetailBody: React.FC<Props> = (props) => {
  const { ref } = useTaskDetailBody(props.loading)

  if (props.loading)
    return (
      <Flex flexDirection="column">
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
}
