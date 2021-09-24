import React, { memo, useCallback } from 'react'
import { Button, Divider, Icon } from 'src/components/atoms'
import { ModalFooter } from 'src/components/organisms/Modal'
import { useShareProjectModal } from '../useShareProjectModal'
import { useShareProjectModalInvitedTeammates } from '../useShareProjectModalInvitedTeammates'

type Props = {}

export const Share: React.VFC<Props> = memo<Props>(() => {
  const { onClose } = useShareProjectModal()
  const { hasInvitedTeammates } = useShareProjectModalInvitedTeammates()

  const handleSend = useCallback(() => {
    onClose()
  }, [onClose])

  const handleCopyProjectLink = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      <Divider />
      <ModalFooter>
        {hasInvitedTeammates ? (
          <Button onClick={handleSend} colorScheme="teal" size="sm" mr="auto">
            Send
          </Button>
        ) : (
          <Button
            onClick={handleCopyProjectLink}
            variant="outline"
            leftIcon={<Icon icon="link" color="text.muted" />}
            size="xs"
          >
            Copy project link
          </Button>
        )}
      </ModalFooter>
    </>
  )
})
Share.displayName = 'Share'