import React, { memo } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { AssigneeMenu } from 'src/components/organisms/Menus'
import { useClickOutside } from 'src/hooks'

type Props = {
  onClickOutside: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useClickOutside(props.onClickOutside)

  return (
    <AssigneeMenu defaultIsOpen>
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        placeholder="mana"
        ml={2}
        w={60}
      />
    </AssigneeMenu>
  )
})
