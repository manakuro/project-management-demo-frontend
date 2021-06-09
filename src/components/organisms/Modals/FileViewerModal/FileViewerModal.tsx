import React from 'react'
import { Divider } from 'src/components/atoms'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from 'src/components/organisms'
import { Body } from './Body'
import { Header } from './Header'
import { useFileViewerModal } from './useFileViewerModal'

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
        <ModalBody pb={0} zIndex="tooltip">
          {isOpen && <Body />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
