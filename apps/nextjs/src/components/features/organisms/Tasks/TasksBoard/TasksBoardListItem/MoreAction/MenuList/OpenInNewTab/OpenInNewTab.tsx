import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const OpenInNewTab: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props;

  const handleClick = useCallback(() => {
    onCloseMenu();
  }, [onCloseMenu]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="linkExternal" color="text.muted" />}
      onClick={handleClick}
      isDisabled
    >
      Open in new tab
    </MenuItem>
  );
});

OpenInNewTab.displayName = 'OpenInNewTab';
