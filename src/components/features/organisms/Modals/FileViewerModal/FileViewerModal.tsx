import { Divider, PortalManager } from 'src/components/ui/atoms'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from 'src/components/ui/organisms/Modal'
import { Body } from './Body'
import { Header } from './Header'
import { useFileViewerModal } from './useFileViewerModal'

export function FileViewerModal() {
  const { isOpen, onClose } = useFileViewerModal()

  return (
    <PortalManager zIndex={1800}>
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
    </PortalManager>
  )
}
