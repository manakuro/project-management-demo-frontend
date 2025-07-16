import { memo, useCallback } from 'react'
import { Button, Divider, Icon } from 'src/components/ui/atoms'
import { ModalFooter } from 'src/components/ui/organisms/Modal'
import { useShareProjectModal } from '../useShareProjectModal'

export const Members = memo(function Members() {
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
