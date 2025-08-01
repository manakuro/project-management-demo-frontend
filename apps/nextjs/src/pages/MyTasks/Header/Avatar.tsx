import { MyAvatar } from '@/components/features/organisms/MyAvatar';
import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

export const Avatar: React.FC = memo(() => {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  );
});
Avatar.displayName = 'Avatar';
