import React, { useCallback, useMemo, useState } from 'react'
import {
  Flex,
  Icon,
  Input as AtomsInput,
  InputGroup,
  InputRightElement,
} from 'src/components/atoms'
import { AssigneeMenu } from 'src/components/organisms/Menus'
import { PopoverProps } from 'src/components/organisms/Popover'
import { useClickableHoverStyle } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useTask } from 'src/store/entities/tasks'
import { Teammate, useTeammate } from 'src/store/entities/teammates'

type Props = {
  taskId: string
  onClose: () => void
} & PopoverProps

export const Input: React.FC<Props> = (props) => {
  const { onClose, taskId } = props
  const { setTask, task } = useTask(taskId)
  const hasAssigned = useMemo(() => !!task.assigneeId, [task.assigneeId])
  const { teammate } = useTeammate(task.assigneeId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true })
  const [value, setValue] = useState<string>('')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()

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
      console.log('val: ', val)
      await setTask({ assigneeId: val.id })
      onClose()
    },
    [onClose, setTask],
  )

  const handleDelete = useCallback(async () => {
    await setTask({ assigneeId: '' })
    onClose()
  }, [onClose, setTask])

  return (
    <AssigneeMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="bottom-start"
      queryText={value}
    >
      <Flex flex={1} alignItems="center">
        <InputGroup>
          <AtomsInput
            autoFocus
            size="sm"
            placeholder="Name or email"
            onChange={handleChange}
            defaultValue={teammate.name}
          />
          {hasAssigned && (
            <InputRightElement h="full">
              <Icon
                icon="x"
                color="text.muted"
                size="sm"
                {...clickableHoverLightStyle}
                onClick={handleDelete}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>
    </AssigneeMenu>
  )
}
Input.displayName = 'Input'
