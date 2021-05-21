import React from 'react'
import { Flex, Skeleton, Stack } from 'src/components/atoms'
import { MakePublic } from 'src/components/organisms/TaskDetail/TaskDetailBody/MakePublic'
import { Form } from './Form'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'

type Props = {
  isMakePublic?: boolean
  loading?: boolean
}

export const TaskDetailBody: React.FC<Props> = (props) => {
  const { ref } = useTaskDetailBody()

  if (props.loading)
    return (
      <Flex flexDirection="column">
        <Skeleton h="44px" />

        <Stack direction="column" spacing={4} mt={4} px={6}>
          <Skeleton h="16px" w="50%" />
          <Skeleton h="16px" w="30%" />
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
