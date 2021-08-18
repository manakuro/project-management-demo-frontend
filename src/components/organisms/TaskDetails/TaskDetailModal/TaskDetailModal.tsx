import React, { memo, useCallback } from 'react'
import { Modal, ModalOverlay, useTaskDetail } from 'src/components/organisms'
import { Content } from './Content'
import { useTaskDetailModal } from './useTaskDetailModal'

type Props = {
  backToPage: () => Promise<void>
}

export const TaskDetailModal: React.VFC<Props> = memo((props) => {
  const { isOpen, onClose } = useTaskDetailModal()
  const { loading } = useTaskDetail()

  const handleClose = useCallback(() => {
    onClose()
    props.backToPage()
  }, [onClose, props])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      {isOpen && <Content loading={loading} onClose={handleClose} />}
    </Modal>
  )
})
TaskDetailModal.displayName = 'TaskDetailModal'
