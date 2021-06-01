import React, { memo } from 'react'
import { Flex, Text } from 'src/components/atoms'
import { LeaveTask } from './LeaveTask'
import { Input } from './Input'
import { Teammates } from './Teammates'
import { Provider } from './Provider'

type Props = {}

export const Collaborators: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = memo(() => {
  return (
    <Flex flex={1} mt={4} pl={8} pb={2} alignItems="center">
      <Text fontSize="xs" color="text.muted" fontWeight="medium">
        Collaborators
      </Text>
      <Teammates />
      <Input />
      <LeaveTask />
    </Flex>
  )
})
