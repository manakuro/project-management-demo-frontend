import React, { useCallback, useState } from 'react'
import { Button, Input, Portal, Stack, Text } from 'src/components/atoms'
import { AssigneeMenu } from 'src/components/organisms/Menus'
import {
  PopoverContent,
  PopoverProps,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { useMe } from 'src/store/entities/me'
import { useTask } from 'src/store/entities/tasks'
import { Teammate } from 'src/store/entities/teammates'

type Props = {
  taskId: string
  onClose: () => void
} & PopoverProps

export const Content: React.FC<Props> = (props) => {
  const { onClose, taskId } = props
  const { setTask } = useTask(taskId)
  const { me } = useMe()
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
      console.log('val: ', val)
      await setTask({ assigneeId: val.id })
      onClose()
    },
    [onClose, setTask],
  )

  const handleAssignMe = useCallback(async () => {
    await setTask({ assigneeId: me.id })
    onClose()
  }, [me.id, onClose, setTask])

  return (
    <Portal>
      <PopoverContent w="400px" ref={ref}>
        <PopoverHeader border="none">
          <Text fontSize="xs" color="text.muted">
            Assignee
          </Text>
        </PopoverHeader>
        <PopoverCloseButton onClick={props.onClose} color="text.muted" />
        <PopoverBody>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <AssigneeMenu
              isOpen={popoverDisclosure.isOpen}
              onClose={popoverDisclosure.onClose}
              onSelect={handleSelect}
              placement="bottom-start"
              queryText={value}
            >
              <Input
                ref={ref}
                autoFocus
                size="sm"
                placeholder="Name or email"
                onChange={handleChange}
                flex={1}
              />
            </AssigneeMenu>
            <Text as="span" fontSize="sm">
              or
            </Text>
            <Button size="sm" variant="outline" onClick={handleAssignMe}>
              Assign to me
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
}
