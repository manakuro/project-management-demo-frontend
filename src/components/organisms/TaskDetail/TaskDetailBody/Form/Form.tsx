import React from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { TaskName } from './TaskName'
import { Assignee } from './Assignee'
import { DueDate } from './DueDate'
import { dateFns } from 'src/shared/dateFns'

type Props = {}

export const Form: React.FC<Props> = (props) => {
  return (
    <Flex flexDirection="column" py={2}>
      <TaskName />
      <Stack px={6} mt={3}>
        <Assignee />
        <DueDate
          dueDate={new Date(dateFns.addDays(new Date(), 3)).toISOString()}
          dueTime={new Date(dateFns.addDays(new Date(), 3)).toISOString()}
        />
      </Stack>
    </Flex>
  )
}
