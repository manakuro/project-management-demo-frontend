import React from 'react'
import { Modal, ModalBody, ModalContent } from 'src/components/organisms'
import { Input, Stack } from 'src/components/atoms'
import { useEditorLinkModal } from './useEditorLinkModal'

type Props = {}

const MARGIN = 30
export const EditorLinkModal: React.VFC<Props> = (props) => {
  const { isOpen, x, y, onClose } = useEditorLinkModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalContent position="fixed" top={x + MARGIN} left={y} mb={0} mt={0}>
        <ModalBody>
          <Stack spacing={2}>
            <Input focusBorderColor="none" placeholder="Add text" size="sm" />
            <Input focusBorderColor="none" placeholder="Add URL" size="sm" />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
