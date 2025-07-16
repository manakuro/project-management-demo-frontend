import type React from 'react';
import { memo, useCallback } from 'react';
import { useTaskDetailProjectsInput } from 'src/components/features/organisms/TaskDetail/hooks';
import { Icon } from 'src/components/ui/atoms';
import { MenuItem } from 'src/components/ui/organisms/Menu';

type Props = {
  onMouseEnter: () => void;
  onClose: () => void;
  taskId: string;
};

export const AddToAnotherProject: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onClose } = props;
  const inputDisclosure = useTaskDetailProjectsInput();

  const handleClick = useCallback(async () => {
    onClose();
    inputDisclosure.onOpen();
  }, [inputDisclosure, onClose]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="bookAdd" color="text.muted" />}
      command="Tab+P"
      onClick={handleClick}
    >
      Add to another project
    </MenuItem>
  );
});
AddToAnotherProject.displayName = 'AddToAnotherProject';
