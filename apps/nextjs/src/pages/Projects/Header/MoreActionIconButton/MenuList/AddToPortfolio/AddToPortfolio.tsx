import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const AddToPortfolio: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props;

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="plus" color="text.muted" />}
      isDisabled
    >
      Add to Portfolio
    </MenuItem>
  );
});
AddToPortfolio.displayName = 'AddToPortfolio';
