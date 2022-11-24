import React from 'react'
import { Modal } from 'src/components/organisms/Modal'
import { MenuList } from './MenuList'
import { useEditorEmojiMenu } from './useEditorEmojiMenu'

type Props = {}

export const EditorEmojiMenu: React.FC<Props> = () => {
  const { isOpen, onClose } = useEditorEmojiMenu()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      autoFocus={false}
      trapFocus={false}
      motionPreset="none"
    >
      {isOpen && <MenuList />}
    </Modal>
  )
}
