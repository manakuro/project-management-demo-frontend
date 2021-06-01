import React, { memo } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { useCollaborators } from '../Provider'
import { AssigneeMenu } from 'src/components/organisms'
import { useClickOutside } from 'src/hooks'

export const Input: React.VFC = memo(() => {
  const { onInputUnfocus, isInputFocused } = useCollaborators()
  const { ref } = useClickOutside(onInputUnfocus)

  if (!isInputFocused) return null

  return (
    <AssigneeMenu
      defaultIsOpen={false}
      isOpen={isInputFocused}
      placement="top-start"
    >
      <AtomsInput
        ref={ref}
        autoFocus
        fontSize="sm"
        size="sm"
        placeholder="Name or email"
        bg="white"
        ml={2}
        onBlur={onInputUnfocus}
      />
    </AssigneeMenu>
  )
})
