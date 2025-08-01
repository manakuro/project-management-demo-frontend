import { Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps & {
  spacing?: number;
};

export const TasksHeaderRight: React.FC<Props> = memo<Props>((props) => {
  const { children, ...rest } = props;

  return (
    <Flex {...rest}>
      <Stack spacing={props.spacing ?? 2} direction="row">
        {children}
      </Stack>
    </Flex>
  );
});
TasksHeaderRight.displayName = 'TasksHeaderRight';
