import type React from 'react';
import { memo } from 'react';
import { PopoverProjectMenu } from 'src/components/features/organisms/Popovers';
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar';
import {
  AvatarGroup,
  Flex,
  type FlexProps,
  Icon,
  IconButton,
  Text,
} from 'src/components/ui/atoms';
import type { IconType } from 'src/shared/icons';
import { useProject } from 'src/store/entities/project';
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor';
import { useProjectIcon } from 'src/store/entities/projectIcon';
import { useTeammateIdsByProjectId } from 'src/store/entities/projectTeammate';
import { Container } from './Container';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  projectId: string;
  containerStyle?: FlexProps;
};

export const ProjectListItem: React.FC<Props> = memo<Props>((props) => {
  const { projectId, containerStyle } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { projectIcon } = useProjectIcon(project.projectIconId);
  const { teammateIds } = useTeammateIdsByProjectId(projectId);

  return (
    <Container aria-label="project list item" {...containerStyle}>
      <Flex
        borderRadius="lg"
        p={2}
        w={12}
        h={12}
        bg={projectBaseColor.color.color}
        color="white"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Icon size="md" icon={projectIcon.icon.icon as IconType} />
      </Flex>
      <Flex ml={3} flex={1} alignItems="flex-start">
        <Flex alignItems="center">
          <Text fontSize="sm">{project.name}</Text>
          <FavoriteButton projectId={projectId} />
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <AvatarGroup size="xs" max={2} spacing={1} fontSize="xs">
          {teammateIds.map((id) => (
            <TeammateAvatar teammateId={id} key={id} />
          ))}
        </AvatarGroup>
        <PopoverProjectMenu
          addFavorite
          editProjectDetails
          copyProjectLink
          share
          projectId={project.id}
          iconButton={{
            as: IconButton,
            'aria-label': 'menu button',
            icon: <Icon icon="menu" size="xs" />,
            variant: 'ghost',
            ml: 2,
          }}
        />
      </Flex>
    </Container>
  );
});
ProjectListItem.displayName = 'ProjectListItem';
