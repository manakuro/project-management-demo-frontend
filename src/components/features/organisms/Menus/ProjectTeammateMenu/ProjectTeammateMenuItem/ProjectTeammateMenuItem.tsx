import type React from 'react';
import { memo, useCallback } from 'react';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuRightContainer,
} from 'src/components/features/organisms/Menus/SearchMenu';
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar';
import { Text } from 'src/components/ui/atoms';
import type { Teammate } from 'src/store/entities/teammate';

type Props = {
  onClick: (teammate: Teammate) => void;
  teammate: Teammate;
  index: number;
};

export const ProjectTeammateMenuItem: React.FC<Props> = memo<Props>((props) => {
  const { teammate, onClick } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClick(teammate);
    },
    [onClick, teammate],
  );

  return (
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      <SearchMenuLeftContainer>
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      </SearchMenuLeftContainer>
      <SearchMenuRightContainer>
        <Text fontSize="sm">{teammate.name}</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </SearchMenuRightContainer>
    </SearchMenuListItem>
  );
});
ProjectTeammateMenuItem.displayName = 'ProjectTeammateMenuItem';
