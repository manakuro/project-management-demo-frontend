import type React from 'react';
import { type PropsWithChildren, memo } from 'react';
import { type FileUploaderParams, Flex } from 'src/components/ui/atoms';
import { Tooltip, type TooltipProps } from 'src/components/ui/molecules';
import { Menu } from 'src/components/ui/organisms/Menu';
import { useDisclosure } from 'src/shared/chakra';
import { MenuList } from './MenuList';

type Props = PropsWithChildren<{
  label: string;
  tooltip?: Omit<TooltipProps, 'children'>;
  onUpload?: (files: FileUploaderParams) => void;
}>;

export const AttachmentMenu: React.FC<Props> = memo<Props>((props) => {
  const menuDisclosure = useDisclosure();

  return (
    <Menu isLazy isOpen={menuDisclosure.isOpen} autoSelect={false}>
      <Tooltip
        hasArrow
        label={props.label}
        aria-label="Attachment button"
        {...props.tooltip}
        withIcon
      >
        <Flex onClick={menuDisclosure.onOpen}>{props.children}</Flex>
      </Tooltip>
      {menuDisclosure.isOpen && (
        <MenuList onUpload={props.onUpload} onClose={menuDisclosure.onClose} />
      )}
    </Menu>
  );
});
AttachmentMenu.displayName = 'AttachmentMenu';
