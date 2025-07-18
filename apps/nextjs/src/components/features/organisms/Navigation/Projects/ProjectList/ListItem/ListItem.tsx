import type React from 'react';
import { memo, useMemo } from 'react';
import { useNavigation } from 'src/components/features/organisms/Navigation';
import { PADDING_X } from 'src/components/features/organisms/Navigation/Navigation';
import { PopoverProjectMenu } from 'src/components/features/organisms/Popovers';
import {
  ColorBox,
  Flex,
  Icon,
  Link,
  NextLink,
  Text,
} from 'src/components/ui/atoms';
import { useClickableHoverStyle, useLinkHoverStyle } from 'src/hooks';
import { ROUTE_PROJECTS_LIST, useRouter } from 'src/router';
import { ROUTE_PROJECTS } from 'src/router/projects';
import { useProject } from 'src/store/entities/project';
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor';

type Props = {
  projectId: string;
};

export const ListItem: React.FC<Props> = memo((props) => {
  const { isExpanded } = useNavigation();
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { router } = useRouter();
  const selected = useMemo(
    () => router.asPath.includes(ROUTE_PROJECTS.href.pathname(projectId)),
    [projectId, router.asPath],
  );

  return (
    <NextLink
      href={ROUTE_PROJECTS_LIST.href.pathnameObj(projectId)}
      passHref
      legacyBehavior
    >
      <Link
        w="full"
        p={2}
        px={PADDING_X}
        _hover={_hover}
        {...(selected ? selectedStyle : {})}
      >
        <Flex alignItems="center">
          {isExpanded ? (
            <Flex alignItems="center" flex={1}>
              <ColorBox size="xs" color={projectBaseColor.color.color} />
              <Text fontSize="sm" flex={1} ml={2}>
                {project.name}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center" flex={1}>
              <Text fontSize="sm" flex={1}>
                {project.name.slice(0, 3)}
              </Text>
            </Flex>
          )}
          <PopoverProjectMenu
            addFavorite
            duplicateProject
            archiveProject
            deleteProject
            projectId={props.projectId}
            menuButtonStyle={{ ...clickableHoverLightStyle }}
          >
            <Icon icon="dotsHorizontalRounded" />
          </PopoverProjectMenu>
        </Flex>
      </Link>
    </NextLink>
  );
});
ListItem.displayName = 'ListItem';
