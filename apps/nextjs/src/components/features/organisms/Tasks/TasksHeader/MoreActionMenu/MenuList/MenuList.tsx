import {
  MenuList as AtomsMenuList,
  MenuItem,
} from '@/components/ui/organisms/Menu';
import { memo } from 'react';

export const MenuList = memo(function MenuList() {
  return (
    <AtomsMenuList>
      <MenuItem isDisabled>Save layout as default</MenuItem>
    </AtomsMenuList>
  );
});
