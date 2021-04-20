import React from 'react'
import { Modal, ModalBody, ModalContent } from 'src/components/organisms'
import { Text } from 'src/components/atoms'
import { useEditorMentionModal } from './useEditorMentionModal'

type Props = {}

export const EditorMentionModal: React.VFC<Props> = () => {
  const { isOpen, x, y, onClose } = useEditorMentionModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      autoFocus={false}
      trapFocus={false}
    >
      <ModalContent
        position="fixed"
        top={y + 24}
        left={x}
        mb={0}
        mt={0}
        maxW="450px"
      >
        <ModalBody w="full">
          <Text fontSize="sm" color="text.muted">
            Mention a teammate or link to a task, project, or message.
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
