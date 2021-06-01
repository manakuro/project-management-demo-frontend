import React, { memo } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { useCollaborators } from '../Provider'
import { AssigneeMenu } from 'src/components/organisms'
import { useClickOutside } from 'src/hooks'

export const Input: React.VFC = () => {
  const { isInputFocused } = useCollaborators()

  if (!isInputFocused) return null

  return <Component />
}

const Component: React.VFC = memo(() => {
  const { onInputUnfocus, isInputFocused } = useCollaborators()
  const { ref } = useClickOutside(onInputUnfocus)

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
      />
    </AssigneeMenu>
  )
})
