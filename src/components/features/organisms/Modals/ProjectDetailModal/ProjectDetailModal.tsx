import React, { memo } from 'react'
import { Modal, ModalOverlay } from 'src/components/ui/organisms/Modal'
import { Content } from './Content'
import { useProjectDetailModal } from './useProjectDetailModal'

type Props = {}

export const ProjectDetailModal: React.FC<Props> = memo(() => {
  const { isOpen, onClose, projectId } = useProjectDetailModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      {isOpen && <Content projectId={projectId} />}
    </Modal>
  )
})
ProjectDetailModal.displayName = 'ProjectDetailModal'
