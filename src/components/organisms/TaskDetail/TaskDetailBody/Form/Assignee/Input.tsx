import React, { memo, useEffect } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import { AssigneeMenu } from 'src/components/organisms'

type Props = {
  onClickOutside: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { ref, hasClickedOutside } = useClickOutside()

  useEffect(() => {
    if (hasClickedOutside) {
      props.onClickOutside()
    }
  })

  return (
    <AssigneeMenu>
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
