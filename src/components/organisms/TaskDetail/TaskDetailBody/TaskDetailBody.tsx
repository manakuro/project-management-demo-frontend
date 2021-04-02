import React from 'react'
import { Flex } from 'src/components/atoms'
import { MakePublic } from 'src/components/organisms/TaskDetail/TaskDetailBody/MakePublic'
import { Form } from './Form'

type Props = {
  isMakePublic?: boolean
}

export const TaskDetailBody: React.FC<Props> = (props) => {
  return (
    <Flex overflowY="scroll" flexDirection="column">
      {props.isMakePublic && <MakePublic />}
      <Form />
    </Flex>
  )
}
