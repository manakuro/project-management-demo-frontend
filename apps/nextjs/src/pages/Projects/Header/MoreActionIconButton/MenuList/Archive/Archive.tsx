import { MenuItem } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const Archive: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props;

  return (
    <MenuItem onMouseEnter={onMouseEnter} isDisabled>
      Archive
    </MenuItem>
  );
});
Archive.displayName = 'Archive';
