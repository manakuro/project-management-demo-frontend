import React, { memo } from 'react'
import { Flex, Input as AtomsInput, Wrap, WrapItem } from 'src/components/atoms'
import { AssigneeChip } from 'src/components/molecules'
import { AssigneeMenu } from 'src/components/organisms/Menus'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useClickOutside } from 'src/hooks'
import { ChakraProps, useStyleConfig } from 'src/shared/chakra'
import { useTeammateIdsByTaskId } from 'src/store/entities/tasksTeammates'
import { useCollaboratorsContext } from '../Provider'

export const Input: React.VFC = () => {
  const { isInputFocused } = useCollaboratorsContext()

  if (!isInputFocused) return null

  return <Component />
}

type InputStyle = {
  field: ChakraProps
  addon: ChakraProps
}

const Component: React.VFC = memo(() => {
  const { taskId } = useTaskDetail()
  const { teammateIds } = useTeammateIdsByTaskId(taskId)
  const { onInputUnfocus, isInputFocused } = useCollaboratorsContext()
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
        <Wrap py={teammateIds.length ? 2 : 0}>
          {teammateIds.map((id) => (
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
