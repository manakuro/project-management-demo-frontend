import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const Duplicate: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props;

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="copyAlt" color="text.muted" />}
      isDisabled
    >
      Duplicate
    </MenuItem>
  );
});
Duplicate.displayName = 'Duplicate';
