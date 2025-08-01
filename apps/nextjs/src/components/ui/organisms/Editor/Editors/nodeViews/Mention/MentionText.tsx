import { Text, type TextProps } from '@/components/ui/atoms';
import { useLinkStyle } from '@/hooks/styles';
import type React from 'react';

type Props = TextProps;
export type MentionTextProps = Props;

export const MentionText: React.FC<Props> = (props) => {
  const { style } = useLinkStyle();
  return <Text as="span" {...style} {...props} />;
};
