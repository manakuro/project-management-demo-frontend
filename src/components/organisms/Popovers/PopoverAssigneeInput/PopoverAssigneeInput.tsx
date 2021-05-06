import React, { useCallback } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  AssigneeMenu,
} from 'src/components/organisms'
import {
  Button,
  Input,
  Link,
  Portal,
  PortalManager,
  Stack,
  Text,
} from 'src/components/atoms'
import { useDisclosure } from 'src/shared/chakra'

type Props = {
  onChange: () => void
  onOpened?: () => void
  onClosed?: () => void
} & PopoverProps

export const PopoverAssigneeInput: React.FC<Props> = (props) => {
  const popoverDisclosure = useDisclosure()
  const assigneeMenuDisclosure = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handleOpen = useCallback(() => {
    popoverDisclosure.onOpen()
    props.onOpened?.()
  }, [popoverDisclosure, props])

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose()
    // Prevent flush when closing popover
    setTimeout(() => {
      props.onClosed?.()
    }, 60)
  }, [popoverDisclosure, props])

  const handleInputFocus = useCallback(() => {
    assigneeMenuDisclosure.onOpen()
  }, [assigneeMenuDisclosure])

  return (
    <PortalManager zIndex={1500}>
      <Popover
        placement="bottom-end"
        isOpen={popoverDisclosure.isOpen}
        initialFocusRef={inputRef}
        isLazy
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link onClick={handleOpen}>{props.children}</Link>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="400px">
            <PopoverHeader border="none">
              <Text fontSize="xs" color="text.muted">
                Assignee
              </Text>
            </PopoverHeader>
            <PopoverCloseButton onClick={handleClose} color="text.muted" />
            <PopoverBody>
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <AssigneeMenu
                  isOpen={assigneeMenuDisclosure.isOpen}
                  onClosed={popoverDisclosure.onClose}
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
      </Popover>
    </PortalManager>
  )
}
