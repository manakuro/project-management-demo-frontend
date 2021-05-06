import React, { useCallback } from 'react'
import {
  PopoverContent,
  PopoverProps,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  AssigneeMenu,
} from 'src/components/organisms'
import { Button, Input, Portal, Stack, Text } from 'src/components/atoms'
import { useDisclosure } from 'src/shared/chakra'
import { useClickOutside } from 'src/hooks'

type Props = {
  onClose?: () => void
} & PopoverProps

export const Content: React.FC<Props> = (props) => {
  const assigneeMenuDisclosure = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const { ref } = useClickOutside(props.onClose)

  const handleInputFocus = useCallback(() => {
    assigneeMenuDisclosure.onOpen()
  }, [assigneeMenuDisclosure])

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
              isOpen={assigneeMenuDisclosure.isOpen}
              onClosed={props.onClose}
            >
              <Input
                ref={inputRef}
                onFocus={handleInputFocus}
                size="sm"
                placeholder="Name or email"
                flex={1}
              />
            </AssigneeMenu>
            <Text as="span" fontSize="sm">
              or
            </Text>
            <Button size="sm" variant="outline">
              Assign to me
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
}
