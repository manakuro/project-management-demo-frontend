import type React from 'react';
import { memo } from 'react';
import { Flex, Icon, Text } from 'src/components/ui/atoms';
import { MenuItem } from 'src/components/ui/organisms/Menu';
import { PopoverAddCoverImageActions } from './PopoverAddCoverImageActions';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const AddCoverImage: React.FC<Props> = memo((props) => {
  const { onClose, onOpen, isOpen } = props;

  return (
    <MenuItem onMouseEnter={onOpen} isDisabled>
      <PopoverAddCoverImageActions
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <Flex flex={1}>
          <Icon icon="photoAlbum" size="sm" color="text.muted" mt="2px" />
          <Text fontSize="sm" flex={1} ml={2}>
            Add cover image
          </Text>
          <Icon icon="chevronRight" color="text.muted" />
        </Flex>
      </PopoverAddCoverImageActions>
    </MenuItem>
  );
});

AddCoverImage.displayName = 'EditTaskName';
