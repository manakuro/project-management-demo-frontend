import React, { memo } from 'react'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from 'src/components/ui/organisms/Modal'
import { Body } from './Body'
import { Footer } from './Footer'
import { Header } from './Header'
import { useShareProjectModal } from './useShareProjectModal'

type Props = {}

export const ShareProjectModal: React.FC<Props> = memo<Props>(() => {
  const { isOpen, onClose, projectId } = useShareProjectModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {isOpen && <Header projectId={projectId} />}
        <ModalCloseButton />
        {isOpen && <Body projectId={projectId} />}
        {isOpen && <Footer />}
      </ModalContent>
    </Modal>
  )
})
ShareProjectModal.displayName = 'ShareProjectModal'
