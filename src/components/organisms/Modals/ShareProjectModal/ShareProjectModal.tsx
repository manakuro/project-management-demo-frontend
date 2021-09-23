import React, { memo } from 'react'
import { Divider } from 'src/components/atoms'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from 'src/components/organisms/Modal'
import { Body } from './Body'
import { Footer } from './Footer'
import { Header } from './Header'
import { useShareProjectModal } from './useShareProjectModal'

type Props = {}

export const ShareProjectModal: React.VFC<Props> = memo<Props>(() => {
  const { isOpen, onClose, projectId, tabIndex } = useShareProjectModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {isOpen && <Header projectId={projectId} />}
        <ModalCloseButton />
        {isOpen && <Body projectId={projectId} initialTabIndex={tabIndex} />}
        <Divider />
        {isOpen && <Footer />}
      </ModalContent>
    </Modal>
  )
})
ShareProjectModal.displayName = 'ShareProjectModal'
