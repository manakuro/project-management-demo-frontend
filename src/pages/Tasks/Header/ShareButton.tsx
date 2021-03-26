import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useShareWorkspaceModal } from 'src/components/organisms/Modals/ShareWorkspaceModal'

export const ShareButton: React.VFC = memo(() => {
  const { setIsOpen } = useShareWorkspaceModal()

  const handleShareWorkspace = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <Flex alignItems="center">
      <Tooltip
        hasArrow
        label="Share this space with teammates to let them organize your work."
        aria-label="A share button description"
        size="md"
      >
        <Button
          leftIcon={<Icon icon="lockAlt" mt="-1px" size="xs" />}
          variant="outline"
          size="xs"
          onClick={handleShareWorkspace}
        >
          Share
        </Button>
      </Tooltip>
    </Flex>
  )
})
