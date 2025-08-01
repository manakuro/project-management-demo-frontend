import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { WrapItem } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = {
  teammateId: string;
};

export const Teammate: React.FC<Props> = memo((props) => {
  return (
    <WrapItem>
      <TeammateAvatar teammateId={props.teammateId} size="xs" />
    </WrapItem>
  );
});
Teammate.displayName = 'Teammate';
