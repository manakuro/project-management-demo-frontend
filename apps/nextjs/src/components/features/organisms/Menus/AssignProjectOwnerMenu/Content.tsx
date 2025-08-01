import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from '@/components/features/organisms/Menus/ProjectTeammateMenu';
import { SearchMenuLoading } from '@/components/features/organisms/Menus/SearchMenu';
import type { Teammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo } from 'react';

type Props = {
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
    </>
  );
});
Content.displayName = 'Content';
