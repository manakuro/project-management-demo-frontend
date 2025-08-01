import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from '@/shared/chakra';
import type React from 'react';
import { memo } from 'react';
import { Provider } from './Provider';

type Props = FlexProps;
type ComponentProps = Omit<Props, 'taskColumnIds'>;

export const TasksFiles: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component: React.FC<ComponentProps> = forwardRef((props, ref) => (
  <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
));

TasksFiles.displayName = 'TasksFiles';
