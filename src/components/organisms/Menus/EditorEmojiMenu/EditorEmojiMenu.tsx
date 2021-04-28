import React from 'react'
import { Modal } from 'src/components/organisms'
import { useEditorEmojiMenu } from './useEditorEmojiMenu'
import { MenuList } from './MenuList'

type Props = {}

export const EditorEmojiMenu: React.VFC<Props> = () => {
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
