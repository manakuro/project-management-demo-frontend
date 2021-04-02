import React from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { TaskName } from './TaskName'
import { Assignee } from './Assignee'

type Props = {}

export const Form: React.FC<Props> = (props) => {
  return (
    <Flex flexDirection="column" py={2}>
      <TaskName />
      <Stack px={6} mt={3}>
        <Assignee />
      </Stack>
    </Flex>
  )
}
