import type React from 'react';
import { memo } from 'react';
import {
  MenuButton,
  type MenuButtonProps,
} from 'src/components/ui/organisms/Menu';
import { useMenuSelectContext } from './useMenuSelect';

type Props = MenuButtonProps;

export const MenuSelectButton: React.FC<Props> = memo<Props>((props) => {
  const { onOpen } = useMenuSelectContext();

  return <MenuButton onClick={onOpen} {...props} />;
});
MenuSelectButton.displayName = 'MenuSelectButton';
