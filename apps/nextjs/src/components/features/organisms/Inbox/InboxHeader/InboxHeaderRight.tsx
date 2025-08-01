import { Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps & {
  spacing?: number;
};

export const InboxHeaderRight: React.FC<Props> = memo<Props>((props) => {
  const { children, ...rest } = props;

  return (
    <Flex ml="auto" {...rest}>
      <Stack spacing={props.spacing ?? 4} direction="row">
        {children}
      </Stack>
    </Flex>
  );
});
InboxHeaderRight.displayName = 'InboxHeaderRight';
