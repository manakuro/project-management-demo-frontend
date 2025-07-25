import type React from 'react';
import { memo, useCallback } from 'react';
import { Icon } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import { useProjectTeammatesCommand } from 'src/store/entities/projectTeammate';

type Props = {
  projectTeammateId: string;
  isHovering: boolean;
};

export const DeleteButton: React.FC<Props> = memo<Props>((props) => {
  const { isHovering, projectTeammateId } = props;
  const { setProjectTeammateById } = useProjectTeammatesCommand();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();

      await setProjectTeammateById({
        id: projectTeammateId,
        isOwner: false,
      });
    },
    [projectTeammateId, setProjectTeammateById],
  );

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  );
});
DeleteButton.displayName = 'DeleteButton';
