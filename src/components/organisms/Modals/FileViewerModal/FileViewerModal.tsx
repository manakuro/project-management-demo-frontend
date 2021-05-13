import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from 'src/components/organisms'
import { Divider } from 'src/components/atoms'
import { useFileViewerModal } from './useFileViewerModal'
import { Header } from './Header'
import { Body } from './Body'

type Props = {}

export const FileViewerModal: React.VFC<Props> = () => {
  const { isOpen, onClose } = useFileViewerModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent
        bg="gray.700"
        color="white"
        w="100vw"
        h="100vh"
        m={0}
        borderRadius="none"
      >
        <ModalHeader p={0}>
          <Header />
        </ModalHeader>
        <Divider />
        <ModalBody zIndex="tooltip">{isOpen && <Body />}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
