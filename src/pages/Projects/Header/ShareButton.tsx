import type React from 'react';
import { memo, useCallback } from 'react';
import { useShareProjectModal } from 'src/components/features/organisms/Modals/ShareProjectModal';
import { Button, Flex, type FlexProps, Icon } from 'src/components/ui/atoms';
import { Tooltip } from 'src/components/ui/molecules';
import { useTooltip } from 'src/components/ui/molecules/Tooltip/useTooltip';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { useWorkspace } from 'src/store/entities/workspace';

type Props = FlexProps;

export const ShareButton: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = useProjectsProjectId();
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal();
  const { isOpen, ref } = useTooltip();
  const { workspace } = useWorkspace();

  const handleClick = useCallback(() => {
    setProjectId(projectId);
    setShareTab();
    onOpen();
  }, [onOpen, projectId, setProjectId, setShareTab]);

  return (
    <Flex alignItems="center" {...props}>
      <Tooltip
        isOpen={isOpen}
        hasArrow
        label={`Members of this ${workspace.name} team can find this project`}
        aria-label="A share button description"
        size="md"
      >
        <Button
          ref={ref}
          leftIcon={<Icon icon="lockAlt" mt="-1px" size="xs" />}
          variant="outline"
          size="xs"
          onClick={handleClick}
        >
          Share
        </Button>
      </Tooltip>
    </Flex>
  );
});
ShareButton.displayName = 'ShareButton';
