import React from 'react'
import { Flex } from 'src/components/atoms'
import { MakePublic } from 'src/components/organisms/TaskDetail/TaskDetailBody/MakePublic'
import { Form } from './Form'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'

type Props = {
  isMakePublic?: boolean
}

export const TaskDetailBody: React.FC<Props> = (props) => {
  const { ref } = useTaskDetailBody()

  return (
    <Flex overflowY="scroll" flexDirection="column" pb={24} ref={ref}>
      {props.isMakePublic && <MakePublic />}
      <Form />
    </Flex>
  )
}
