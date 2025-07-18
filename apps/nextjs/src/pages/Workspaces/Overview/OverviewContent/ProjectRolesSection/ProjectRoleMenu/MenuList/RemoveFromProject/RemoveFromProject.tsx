import type React from 'react';
import { memo, useCallback } from 'react';
import { MenuItem } from 'src/components/ui/organisms/Menu';

type Props = {
  projectId: string;
  projectTeammateId: string;
};

export const RemoveFromProject: React.FC<Props> = memo<Props>(() => {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <MenuItem onClick={handleRemoveFromProject} color="alert">
      Remove from Project
    </MenuItem>
  );
});
RemoveFromProject.displayName = 'RemoveFromProject';
