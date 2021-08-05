import React from 'react'
import { Modal, ModalOverlay } from 'src/components/organisms'
import { Content } from './Content'
import { useDuplicateTaskModal } from './useDuplicateTaskModal'

type Props = {}

export const DuplicateTaskModal: React.VFC<Props> = () => {
  const { isOpen, onClose } = useDuplicateTaskModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      {isOpen && <Content />}
    </Modal>
  )
}
