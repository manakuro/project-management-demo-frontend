import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { useThumbnailAttachmentContext } from './Provider';

type Props = FlexProps;

export const Container: React.FC<Props> = (props) => {
  const { ref } = useThumbnailAttachmentContext();

  return (
    <Flex
      ref={ref}
      minW="60px"
      h={16}
      borderRadius="lg"
      cursor="pointer"
      position="relative"
      {...props}
    />
  );
};
