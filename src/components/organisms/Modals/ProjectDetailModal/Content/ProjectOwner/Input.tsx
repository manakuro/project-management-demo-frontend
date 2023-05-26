import React, { memo, useCallback, useState } from 'react'
import { AssignProjectOwnerMenu } from 'src/components/organisms/Menus'
import { Input as AtomsInput } from 'src/components/ui/atoms'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useProjectTeammatesCommand } from 'src/store/entities/projectTeammate'
import { Teammate } from 'src/store/entities/teammate'

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
  const [value, setValue] = useState<string>('')
  const { setOwnerByProjectIdAndTeammateId } = useProjectTeammatesCommand()

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
      await setOwnerByProjectIdAndTeammateId(projectId, val.id)
      setValue('')
      onClose()
    },
    [projectId, setOwnerByProjectIdAndTeammateId, onClose],
  )

  return (
    <AssignProjectOwnerMenu
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
    </AssignProjectOwnerMenu>
  )
})
Input.displayName = 'Input'
