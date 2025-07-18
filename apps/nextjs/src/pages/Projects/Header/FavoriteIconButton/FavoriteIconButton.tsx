import type React from 'react';
import { memo } from 'react';
import type { IconButtonProps } from 'src/components/ui/atoms';
import {
  FavoriteIconButton as MoleculesFavoriteIconButton,
  Tooltip,
} from 'src/components/ui/molecules';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from 'src/store/entities/favoriteProjectIds';
import { useProject } from 'src/store/entities/project';
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor';

type Props = {
  projectId: string;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const FavoriteIconButton: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();
  const { isFavorite } = useFavoriteProjectIds();

  return (
    <Tooltip
      hasArrow
      label="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <MoleculesFavoriteIconButton
        favoriteId={projectId}
        isFavorite={isFavorite}
        setFavorite={setFavoriteProjectId}
        h={6}
        w={6}
        iconStyle={{
          favorite: { color: projectBaseColor.color.color },
          none: { color: 'text.muted' },
        }}
      />
    </Tooltip>
  );
});
FavoriteIconButton.displayName = 'FavoriteIconButton';
