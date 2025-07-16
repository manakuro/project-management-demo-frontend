import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { useTaskFeedListItemContext } from '../../Provider';

type Props = FlexProps;

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { editable } = useTaskFeedListItemContext();

  return (
    <Flex
      border="1px"
      borderRadius="md"
      borderColor={editable() ? 'gray.400' : 'transparent'}
      p={2}
      flexDirection="column"
      flex={1}
      bg={editable() ? 'white' : 'transparent'}
      minH={editable() ? 40 : 0}
      position="relative"
      {...props}
    />
  );
});
Container.displayName = 'Container';
