import React, { useCallback, useState } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselRightChevron,
  CarouselLeftChevron,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  CarouselBody,
} from 'src/components/organisms'
import { Divider } from 'src/components/atoms'
import { useFileViewerModal } from './useFileViewerModal'
import { useAttachmentsByTask } from 'src/store/attachments'
import { ListItem } from './ListItem'
import { Header } from './Header'

type Props = {}

export const FileViewerModal: React.VFC<Props> = () => {
  const { isOpen, onClose, taskId } = useFileViewerModal()
  const { attachmentIds } = useAttachmentsByTask(taskId)
  const [currentAttachmentId, setCurrentAttachmentId] = useState<string>('')

  const handleChangeCarousel = useCallback(
    (currentIndex: number) => {
      setCurrentAttachmentId(attachmentIds[currentIndex])
    },
    [attachmentIds],
  )

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
          <Header attachmentId={currentAttachmentId} />
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Carousel onChange={handleChangeCarousel}>
            <CarouselBody>
              {attachmentIds.map((id) => (
                <CarouselItem key={id}>
                  <ListItem attachmentId={id} />
                </CarouselItem>
              ))}
            </CarouselBody>
            <CarouselRightChevron />
            <CarouselLeftChevron />
          </Carousel>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
