import { memo } from 'react';
import { ModalBody, ModalContent } from 'src/components/ui/organisms/Modal';
import { useMenuStyle } from 'src/hooks';
import { MenuList } from './MenuList';
import { useEditorMentionMenu } from './useEditorMentionMenu';

export const MenuContent = memo(function MenuContent() {
  const { x, y, containerRef } = useEditorMentionMenu();
  const menuStyles = useMenuStyle().list;

  return (
    <ModalContent
      position="fixed"
      top={y}
      left={x}
      mb={0}
      mt={0}
      maxW="450px"
      maxH={56}
      overflowY="scroll"
      ref={containerRef}
    >
      <ModalBody w="full" px={0} {...menuStyles}>
        <MenuList />
      </ModalBody>
    </ModalContent>
  );
});
