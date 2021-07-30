import React, { memo } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { Provider } from './Provider'

type Props = FlexProps & {
  taskId: string
}

export const TasksBoardListItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>(() => {
  return (
    <>
      <Flex
        minH="91px"
        w="full"
        bg="white"
        border={1}
        borderStyle="solid"
        borderColor="gray.200"
        borderRadius="md"
        mt={2}
        _hover={{
          borderColor: 'gray.300',
          boxShadow: 'sm',
        }}
        cursor="pointer"
        transition={transitions.base()}
      ></Flex>
    </>
  )
})
TasksBoardListItem.displayName = 'TasksBoardListItem'
