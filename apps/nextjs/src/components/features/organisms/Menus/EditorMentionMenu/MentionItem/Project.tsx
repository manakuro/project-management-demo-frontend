import type React from 'react';
import { memo } from 'react';
import { ColorBox, Flex, type FlexProps, Text } from 'src/components/ui/atoms';
import type { Mention } from 'src/store/entities/mention';
import { useProject } from 'src/store/entities/project';
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Project: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.mention.projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <ColorBox size="sm" color={projectBaseColor.color.color} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" noOfLines={1}>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  );
});
Project.displayName = 'Project';
