import React, { memo, useCallback, useState } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { PopoverDueDatePicker } from 'src/components/organisms/Popovers'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
  onClose: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { projectId, onClose } = props
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true })
  const [, setValue] = useState<string>('')
  const { setProject, project } = useProject(projectId)

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
      await setProject({ dueDate: val.toISOString() })
      onClose()
    },
    [onClose, setProject],
  )

  return (
    <PopoverDueDatePicker
      date={project.dueDate}
      onChange={handleSelect}
      defaultIsOpen
    >
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        onChange={handleChange}
        ml={2}
      />
    </PopoverDueDatePicker>
  )
})
