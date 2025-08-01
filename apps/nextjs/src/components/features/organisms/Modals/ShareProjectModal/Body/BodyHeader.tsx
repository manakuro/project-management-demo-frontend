import { Heading, type HeadingProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = HeadingProps;

export const BodyHeader: React.FC<Props> = (props) => {
  return <Heading as="h5" size="sm" {...props} />;
};
BodyHeader.displayName = 'BodyHeader';
