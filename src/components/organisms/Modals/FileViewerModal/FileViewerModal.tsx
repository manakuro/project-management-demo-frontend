import React from 'react'
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
import {
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
} from 'src/components/atoms'
import { useFileViewerModal } from './useFileViewerModal'
import { useAttachmentsByTask } from 'src/store/attachments'
import { ListItem } from './ListItem'

type Props = {}

export const FileViewerModal: React.VFC<Props> = () => {
  const { isOpen, onClose, taskId } = useFileViewerModal()
  const { attachmentIds } = useAttachmentsByTask(taskId)
  console.log('attachmentIds: ', attachmentIds)

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
          <Flex h="full">
            <Flex flexDirection="column" py={4} px={6}>
              <Text fontSize="md">Screen Shot 2021-04-08 at 10.21.42.png</Text>
              <Text fontSize="sm" color="text.muted">
                Apr 8, 2021 at 10:24am
              </Text>
            </Flex>
            <Stack direction="row" spacing={2} ml="auto" py={4} px={6}>
              <Button
                leftIcon={<Icon icon="download" mr={1} />}
                variant="ghost"
                lightBg
              >
                Download
              </Button>
              <Button
                leftIcon={<Icon icon="commentDots" mr={1} />}
                variant="ghost"
                lightBg
              >
                Add Feedback
              </Button>
            </Stack>
            <Divider orientation="vertical" />
            <Flex py={4} px={6} justifyContent="center" alignItems="center">
              <IconButton
                icon={<Icon icon="x" size="lg" />}
                aria-label="close modal"
                variant="ghost"
                light
                onClick={onClose}
              />
            </Flex>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Carousel>
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
