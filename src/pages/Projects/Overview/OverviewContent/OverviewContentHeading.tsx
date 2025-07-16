import type React from 'react';
import { Heading, type HeadingProps } from 'src/components/ui/atoms';

type Props = HeadingProps;

export const OverviewContentHeading: React.FC<Props> = (props) => {
  return <Heading as="h2" size="md" {...props} />;
};
OverviewContentHeading.displayName = 'OverviewContentHeading';
