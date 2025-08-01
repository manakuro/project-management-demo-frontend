import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import type React from 'react';
import { memo } from 'react';

type Props = {
  teammateId: string;
};

export const Teammate: React.FC<Props> = memo((props) => {
  return <TeammateAvatar teammateId={props.teammateId} size="xs" />;
});
Teammate.displayName = 'Teammate';
