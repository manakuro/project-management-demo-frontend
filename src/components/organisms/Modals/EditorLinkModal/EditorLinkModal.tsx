import React, { useCallback } from 'react'
import { Input, Stack } from 'src/components/atoms'
import { Modal, ModalBody, ModalContent } from 'src/components/organisms/Modal'
import { useEditorLinkModal } from './useEditorLinkModal'

type Props = {}

const MARGIN = 30
export const EditorLinkModal: React.FC<Props> = () => {
  const { isOpen, x, y, onClose, setInput, input } = useEditorLinkModal()

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof input) => {
      setInput({
        ...input,
        [type]: e.target.value,
      })
    },
    [input, setInput],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalContent position="fixed" top={x + MARGIN} left={y} mb={0} mt={0}>
        <ModalBody>
          <Stack spacing={2}>
            <Input
              value={input.url}
              onChange={(e) => handleInput(e, 'url')}
              focusBorderColor="none"
              placeholder="Add URL"
              size="sm"
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
