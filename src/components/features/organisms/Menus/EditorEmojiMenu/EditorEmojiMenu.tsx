import { Modal } from 'src/components/ui/organisms/Modal'
import { MenuList } from './MenuList'
import { useEditorEmojiMenu } from './useEditorEmojiMenu'

export function EditorEmojiMenu() {
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
