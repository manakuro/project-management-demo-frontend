import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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

type Props = {}

export const FileViewerModal: React.VFC<Props> = () => {
  const { isOpen, onClose, task } = useFileViewerModal()
  const { attachmentIds } = useAttachmentsByTask(task.taskId)
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
          <Stack spacing={6}>
            <Text>
              Your teammates will get an email that gives them access to your
              team.
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
