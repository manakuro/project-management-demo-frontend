import type React from 'react';
import { Text, type TextProps } from 'src/components/ui/atoms';
import { useLinkStyle } from 'src/hooks/styles';

type Props = TextProps;
export type MentionTextProps = Props;

export const MentionText: React.FC<Props> = (props) => {
  const { style } = useLinkStyle();
  return <Text as="span" {...style} {...props} />;
};
