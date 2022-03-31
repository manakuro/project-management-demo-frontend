import React, { memo } from 'react'
import { Modal } from 'src/components/organisms/Modal'
import { MenuContent } from './MenuContent'
import { useEditorMentionMenu } from './useEditorMentionMenu'

type Props = {}

export const EditorMentionMenu: React.VFC<Props> = memo<Props>(() => {
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
      {isOpen && <MenuContent />}
    </Modal>
  )
})
EditorMentionMenu.displayName = 'EditorMentionMenu'
