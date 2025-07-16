import type React from 'react';
import { memo, useCallback } from 'react';
import { SearchMenuListItem } from 'src/components/features/organisms/Menus/SearchMenu';
import type { Tag } from 'src/store/entities/tag';

type Props = {
  onClick: (tag: Tag) => void;
  tag: Tag;
  index: number;
};

export const TagItem: React.FC<Props> = memo<Props>((props) => {
  const { tag } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      props.onClick(tag);
    },
    [tag, props],
  );

  return (
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      {tag.name}
    </SearchMenuListItem>
  );
});
TagItem.displayName = 'TagItem';
