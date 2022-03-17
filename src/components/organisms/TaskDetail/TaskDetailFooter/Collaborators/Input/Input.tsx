import React, { memo, useCallback, useState } from 'react'
import { Flex, Input as AtomsInput, Wrap, WrapItem } from 'src/components/atoms'
import { AssigneeChip } from 'src/components/molecules'
import { InviteCollaboratorMenu } from 'src/components/organisms/Menus'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useClickOutside } from 'src/hooks'
import { ChakraProps, useDisclosure, useStyleConfig } from 'src/shared/chakra'
import {
  useTaskCollaboratorCommand,
  useTeammateIdsByTaskId,
} from 'src/store/entities/taskCollaborator'
import { Teammate } from 'src/store/entities/teammate'
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
  const { addTaskCollaboratorByTeammate, deleteTaskCollaboratorByTeammate } =
    useTaskCollaboratorCommand()
  const { onInputUnfocus } = useCollaboratorsContext()
  const { ref } = useClickOutside(onInputUnfocus, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const style = useStyleConfig('Input') as InputStyle

  const popoverDisclosure = useDisclosure()
  const [value, setValue] = useState<string>('')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)
      if (val) {
        popoverDisclosure.onOpen()
        return
      }
      popoverDisclosure.onClose()
    },
    [popoverDisclosure],
  )

  const handleSelect = useCallback(
    async (input: Teammate) => {
      setValue('')
      await addTaskCollaboratorByTeammate({
        taskId,
        teammate: input,
      })
    },
    [addTaskCollaboratorByTeammate, taskId],
  )

  const handleDelete = useCallback(
    async (teammateId: string) => {
      await deleteTaskCollaboratorByTeammate({
        taskId,
        teammateId,
      })
    },
    [deleteTaskCollaboratorByTeammate, taskId],
  )

  return (
    <InviteCollaboratorMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="top-start"
      queryText={value}
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
              <AssigneeChip teammateId={id} key={id} onDelete={handleDelete} />
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
              value={value}
              onChange={handleChange}
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </InviteCollaboratorMenu>
  )
})
Component.displayName = 'Component'
