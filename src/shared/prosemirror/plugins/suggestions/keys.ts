import {
  isEmojiOpen,
  onEmojiClose,
} from 'src/components/organisms/Menus/EditorEmojiMenu'

export const Escape = () => {
  if (isEmojiOpen) onEmojiClose()
  return true
}
