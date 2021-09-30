import React, { memo, useCallback, useState } from 'react'
import { Input as AtomsInput } from 'src/components/atoms'
import { AssigneeMenu } from 'src/components/organisms/Menus'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useTask } from 'src/store/entities/tasks'
import { Teammate } from 'src/store/entities/teammates'

type Props = {
  taskId: string
  onClose: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { taskId, onClose } = props
  const { setTask } = useTask(taskId)
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true })
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
    async (val: Teammate) => {
      setValue('')
      await setTask({ assigneeId: val.id })
      onClose()
    },
    [onClose, setTask],
  )

  return (
    <AssigneeMenu
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
        placeholder="mana"
        onChange={handleChange}
        ml={2}
        w={60}
      />
    </AssigneeMenu>
  )
})
