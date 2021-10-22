import React, { memo } from 'react'
import { Button, Flex, Input, Label, Portal } from 'src/components/atoms'
import { PopoverBody, PopoverContent } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import { useProjectTeammate } from 'src/store/entities/projectsTeammates'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  isOpen: boolean
  onClose: () => void
  projectId: string
  projectTeammateId: string
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { projectTeammateId, initialFocusRef, onClose } = props
  const { projectTeammate } = useProjectTeammate(projectTeammateId)
  const { teammate } = useTeammate(projectTeammate.teammateId)

  const { ref } = useClickOutside(onClose)

  return (
    <Portal>
      <PopoverContent ref={ref}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Label fontSize="xs" fontWeight="medium" color="text.muted">
            What is {teammate.name}'s role on this project?
          </Label>
          <Flex alignItems="center" mt={2}>
            <Input
              ref={initialFocusRef}
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
