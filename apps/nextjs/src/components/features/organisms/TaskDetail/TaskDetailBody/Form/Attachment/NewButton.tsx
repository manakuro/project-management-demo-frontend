import { AttachmentMenu } from '@/components/features/organisms/Menus';
import { NewBox } from '@/components/ui/molecules';
import { MenuButton } from '@/components/ui/organisms/Menu';
import { memo } from 'react';

export const NewButton = memo(function NewButton() {
  return (
    <AttachmentMenu
      label="Attach a file. This file will not be persisted in database."
      tooltip={{ size: 'md', textAlign: 'left' }}
    >
      <MenuButton cursor="pointer">
        <NewBox size="lg" />
      </MenuButton>
    </AttachmentMenu>
  );
});
