import React, { memo } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { ModalFooter } from 'src/components/organisms/Modal'
import { useShareProjectModal } from '../useShareProjectModal'

type Props = {}

export const Footer: React.VFC<Props> = memo<Props>(() => {
  const { onClose } = useShareProjectModal()

  return (
    <ModalFooter>
      <Button
        onClick={onClose}
        variant="outline"
        leftIcon={<Icon icon="link" color="text.muted" />}
        size="xs"
      >
        Copy project link
      </Button>
    </ModalFooter>
  )
})
Footer.displayName = 'Footer'
