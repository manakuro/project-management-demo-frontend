import {
  isEmojiOpen,
  onEmojiClose,
} from 'src/components/features/organisms/Menus/EditorEmojiMenu';
import {
  isMentionOpen,
  onMentionClose,
} from 'src/components/features/organisms/Menus/EditorMentionMenu';

export const Escape = () => {
  if (isEmojiOpen) onEmojiClose();
  if (isMentionOpen) onMentionClose();
  return true;
};
