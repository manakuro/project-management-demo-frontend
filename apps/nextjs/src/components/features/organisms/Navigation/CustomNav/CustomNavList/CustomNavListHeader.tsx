import type React from 'react';
import { memo } from 'react';
import { Heading, type HeadingProps } from 'src/components/ui/atoms';

type Props = HeadingProps;

export const CustomNavListHeader: React.FC<Props> = memo((props) => {
  return (
    <Heading
      as="h4"
      size="xs"
      color="text.muted"
      flex="1"
      textAlign="left"
      {...props}
    />
  );
});
CustomNavListHeader.displayName = 'CustomNavListHeader';
