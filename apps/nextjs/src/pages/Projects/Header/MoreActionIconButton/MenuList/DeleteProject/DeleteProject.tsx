import type React from 'react';
import { memo } from 'react';
import { MenuItem } from 'src/components/ui/organisms/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const DeleteProject: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props;

  return (
    <MenuItem onMouseEnter={onMouseEnter} color="alert" isDisabled>
      Delete project
    </MenuItem>
  );
});
DeleteProject.displayName = 'DeleteProject';
