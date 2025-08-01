import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps & {
  projectId: string;
};

export const ProjectChip: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <Flex
      borderRadius="full"
      width={10}
      h="6px"
      bg={projectBaseColor.color.color}
    />
  );
});
ProjectChip.displayName = 'ProjectChip';
