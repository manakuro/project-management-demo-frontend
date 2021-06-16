import React, { memo } from 'react'
import { Flex, Input as AtomsInput, Wrap, WrapItem } from 'src/components/atoms'
import { AssigneeChip } from 'src/components/molecules'
import { AssigneeMenu, useTasksListDetail } from 'src/components/organisms'
import { useClickOutside } from 'src/hooks'
import { ChakraProps, useStyleConfig } from 'src/shared/chakra'
import { useTask } from 'src/store/entities/tasks'
import { useCollaborators } from '../Provider'

export const Input: React.VFC = () => {
  const { isInputFocused } = useCollaborators()

  if (!isInputFocused) return null

  return <Component />
}

type InputStyle = {
  field: ChakraProps
  addon: ChakraProps
}

const Component: React.VFC = memo(() => {
  const { taskId } = useTasksListDetail()
  const { task } = useTask(taskId)
  const { onInputUnfocus, isInputFocused } = useCollaborators()
  const { ref } = useClickOutside(onInputUnfocus)
  const style = useStyleConfig('Input') as InputStyle

  return (
    <AssigneeMenu
      defaultIsOpen={false}
      isOpen={isInputFocused}
      placement="top-start"
    >
      <Flex
        ref={ref}
        border={1}
        borderColor="gray.200"
        borderStyle="solid"
        bg="white"
        ml={2}
        alignItems="center"
        {...style.field}
        h="auto"
        maxH="none"
      >
        <Wrap py={task.teammateIds.length ? 2 : 0}>
          {task.teammateIds.map((id) => (
            <WrapItem key={id}>
              <AssigneeChip teammateId={id} key={id} />
            </WrapItem>
          ))}
          <WrapItem>
            <AtomsInput
              minH={9}
              autoFocus
              fontSize="sm"
              size="sm"
              placeholder="Name or email"
              variant="unstyled"
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </AssigneeMenu>
  )
})
