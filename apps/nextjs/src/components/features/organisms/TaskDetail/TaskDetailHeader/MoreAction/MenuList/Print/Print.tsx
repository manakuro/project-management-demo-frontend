import { MenuItem } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  onMouseEnter: () => void;
  onClose: () => void;
  taskId: string;
};

export const Print: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onClose } = props;

  const handleClick = useCallback(async () => {
    onClose();
  }, [onClose]);

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick} isDisabled>
      Print
    </MenuItem>
  );
});
Print.displayName = 'AddToAnotherProject';
