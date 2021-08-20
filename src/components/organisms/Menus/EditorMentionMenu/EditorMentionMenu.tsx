import React from 'react'
import { Modal } from 'src/components/organisms/Modal'
import { MenuList } from './MenuList'
import { useEditorMentionMenu } from './useEditorMentionMenu'

type Props = {}

export const EditorMentionMenu: React.VFC<Props> = () => {
  const { isOpen, onClose } = useEditorMentionMenu()

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
