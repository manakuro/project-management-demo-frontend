import type React from 'react';
import { memo } from 'react';
import { useReactNodeView } from 'src/components/ui/organisms/Editor/Editors';
import type { EmojiAttrs } from 'src/shared/prosemirror/schema';

export const Emoji: React.FC = memo(() => {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as EmojiAttrs;

  return <>{attrs.emoji}</>;
});
Emoji.displayName = 'Emoji';
