import React, { memo, useCallback } from 'react'
import { Button, Divider, Icon } from 'src/components/atoms'
import { ModalFooter } from 'src/components/organisms/Modal'
import { useShareProjectModal } from '../useShareProjectModal'

type Props = {}

export const Members: React.FC<Props> = memo<Props>(() => {
  const { onClose } = useShareProjectModal()

  const handleCopyProjectLink = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      <Divider />
      <ModalFooter>
        <Button
          onClick={handleCopyProjectLink}
          variant="outline"
          leftIcon={<Icon icon="link" color="text.muted" />}
          size="xs"
        >
          Copy project link
        </Button>
      </ModalFooter>
    </>
  )
})
Members.displayName = 'Members'
