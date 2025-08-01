import { Stack, type StackProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = StackProps;

export const BodyStack: React.FC<Props> = (props) => {
  return <Stack spacing={6} {...props} />;
};
BodyStack.displayName = 'BodyStack';
