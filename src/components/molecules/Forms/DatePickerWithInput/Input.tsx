import React, { memo, useCallback, useState } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { PopoverDueDatePicker } from 'src/components/organisms/Popovers'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { formatDueDateInput } from 'src/shared/date'

type Props = {
  onClose: () => void
  onSelect: (val: Date) => void
  dueDate: string
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { onClose, onSelect, dueDate } = props
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true })
  const [value, setValue] = useState<string>(formatDueDateInput(dueDate))

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
    async (val: Date) => {
      setValue('')
      onSelect(val)
      onClose()
    },
    [onClose, onSelect],
  )

  return (
    <PopoverDueDatePicker
      date={value}
      onChange={handleSelect}
      defaultIsOpen
      includeDueTime={false}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        onChange={handleChange}
        value={value}
        ml={2}
      />
    </PopoverDueDatePicker>
  )
})
Input.displayName = 'Input'
