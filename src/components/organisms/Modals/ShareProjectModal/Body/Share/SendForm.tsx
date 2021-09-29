import React, { memo, useCallback, useState } from 'react'
import {
  Flex,
  Input as AtomsInput,
  Textarea,
  Wrap,
  WrapItem,
} from 'src/components/atoms'
import { InvitedTeammateChip } from 'src/components/molecules'
import { InviteProjectTeammateMenu } from 'src/components/organisms/Menus'
import { useDisclosure } from 'src/shared/chakra'
import { Teammate } from 'src/store/entities/teammates'
import { PermissionMenu } from '../PermissionMenu'

type Props = {
  projectId: string
  invitedTeammates: Teammate[]
  onSetInvitedTeammates: (val: Teammate) => void
  onDeleteInvitedTeammate: (teammateId: string) => void
}

export const SendForm: React.VFC<Props> = memo<Props>((props) => {
  const { onSetInvitedTeammates, invitedTeammates, onDeleteInvitedTeammate } =
    props
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
    (val: Teammate) => {
      console.log(val)
      onSetInvitedTeammates(val)
      setValue('')
    },
    [onSetInvitedTeammates],
  )

  return (
    <>
      <InviteProjectTeammateMenu
        isOpen={popoverDisclosure.isOpen}
        onClose={popoverDisclosure.onClose}
        onSelect={handleSelect}
        placement="bottom-start"
        queryText={value}
      >
        <Flex
          border={1}
          borderColor="gray.300"
          borderStyle="solid"
          px={2}
          bg="white"
          minH="40px"
          borderRadius="md"
        >
          <Wrap justifyItems="center" display="flex" alignItems="center" py={1}>
            {invitedTeammates.map((t) => (
              <WrapItem key={t.id}>
                <InvitedTeammateChip
                  variant="button"
                  teammate={t}
                  deletable
                  onDelete={onDeleteInvitedTeammate}
                />
              </WrapItem>
            ))}
            <WrapItem alignItems="center">
              <AtomsInput
                h="full"
                autoFocus
                fontSize="sm"
                variant="unstyled"
                color="text.base"
                value={value}
                onChange={handleChange}
              />
            </WrapItem>
          </Wrap>
          <Flex ml="auto" pt={1}>
            <PermissionMenu />
          </Flex>
        </Flex>
      </InviteProjectTeammateMenu>
      <Flex alignItems="center">
        <Textarea
          minH="120px"
          maxH="120px"
          placeholder="Add message (optional)"
          resize="none"
        />
      </Flex>
    </>
  )
})
SendForm.displayName = 'SendForm'
