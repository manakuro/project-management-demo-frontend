import React from 'react'
import { Modal } from 'src/components/organisms'
import { useEditorMentionMenu } from './useEditorMentionMenu'
import { MenuList } from './MenuList'

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
    >
      {isOpen && <MenuList />}
    </Modal>
  )
}
