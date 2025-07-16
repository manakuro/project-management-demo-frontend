import type React from 'react';
import { memo } from 'react';
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from 'src/components/features/organisms/Menus/ProjectTeammateMenu';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
} from 'src/components/features/organisms/Menus/SearchMenu';
import { Divider, Icon, Text } from 'src/components/ui/atoms';
import type { PopoverProps } from 'src/components/ui/organisms/Popover';
import type { Teammate } from 'src/store/entities/teammate';

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { teammates, loading, onSelectTeammate } =
    useProjectTeammateMenu(props);

  if (loading) return <SearchMenuLoading />;

  return (
    <>
      {teammates.map((t, i) => (
        <ProjectTeammateMenuItem
          key={t.id}
          onClick={onSelectTeammate}
          teammate={t}
          index={i}
        />
      ))}
      <Divider />
      <SearchMenuListItem index={teammates.length}>
        <SearchMenuLeftContainer>
          <Icon icon="userPlus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Invite '${props.queryText}' via email`}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
Content.displayName = 'Content';
