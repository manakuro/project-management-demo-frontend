import {
  MentionText,
  type MentionTextProps,
} from '@/components/ui/organisms/Editor/Editors/nodeViews/Mention/MentionText';
import type React from 'react';

type Props = MentionTextProps;

export const PopoverEditorLinkText: React.FC<Props> = (props) => {
  return <MentionText fontSize="sm" ml={3} flex={1} {...props} />;
};
