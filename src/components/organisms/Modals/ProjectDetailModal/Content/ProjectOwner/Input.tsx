import React, { memo, useCallback, useState } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { InviteProjectTeammateMenu } from 'src/components/organisms/Menus'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { Teammate } from 'src/store/entities/teammates'

type Props = {
  onClickOutside: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useClickOutside(props.onClickOutside)
  const popoverDisclosure = useDisclosure({ isOpen: true })
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

  const handleSelect = useCallback((val: Teammate) => {
    console.log(val)
    setValue('')
  }, [])

  return (
    <InviteProjectTeammateMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="bottom-start"
      queryText={value}
      contentStyle={{
        ml: '-45px',
      }}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        placeholder="Name or email"
        onChange={handleChange}
        ml={2}
      />
    </InviteProjectTeammateMenu>
  )
})
