import { Portal } from '@/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from '@/components/ui/organisms/Menu';

export function MenuList() {
  return (
    <Portal>
      <AtomsMenuList>
        <MenuItem isDisabled>Archive all</MenuItem>
        <MenuItem isDisabled>Manage notifications</MenuItem>
      </AtomsMenuList>
    </Portal>
  );
}
