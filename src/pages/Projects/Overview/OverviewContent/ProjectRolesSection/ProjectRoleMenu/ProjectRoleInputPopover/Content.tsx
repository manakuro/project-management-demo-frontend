import React, { memo, useEffect, useRef } from 'react'
import { Button, Flex, Input, Label, Portal } from 'src/components/atoms'
import { PopoverBody, PopoverContent } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  onClose: () => void
  projectId: string
  teammateId: string
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { onClose, teammateId } = props
  const { teammate } = useTeammate(teammateId)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { ref } = useClickOutside(onClose)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  return (
    <Portal>
      <PopoverContent contentEditable={false} ref={ref}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Label fontSize="xs" fontWeight="medium" color="text.muted">
            What is {teammate.name}'s role on this project?
          </Label>
          <Flex alignItems="center" mt={2}>
            <Input
              ref={inputRef}
              defaultValue=""
              placeholder="e.g. Approver, Contributor, Tester"
              size="sm"
              autoFocus
            />
            <Button ml={2} colorScheme="teal" size="sm">
              Done
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
})
Content.displayName = 'Content'
