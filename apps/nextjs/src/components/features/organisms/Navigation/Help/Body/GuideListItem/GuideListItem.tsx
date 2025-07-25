import type React from 'react';
import type { IconType } from 'src/shared/icons';
import { ListItem } from './ListItem';
import { ListItemDetail } from './ListItemDetail';

export type Item = {
  id: number;
  number: number;
  title: string;
  src: string;
  description: string;
  icon: {
    name: IconType;
    color: string;
  };
  iconDone: {
    name: IconType;
    color: string;
  };
  done: boolean;
  time: string;
  seeMoreComponent?: React.ReactNode;
  detailComponent?: React.ReactNode;
};
type Props = {
  item: Item;
  isOpen: boolean;
  onToggle: (id: number) => void;
  nextItem?: Item;
};

export const PADDING_X = 4;
export const GuideListItem: React.FC<Props> = (props) => {
  const { item, isOpen, onToggle, nextItem } = props;

  return (
    <>
      {isOpen ? (
        <ListItemDetail
          item={item}
          nextItem={nextItem}
          onToggle={onToggle}
          seeMoreComponent={item.seeMoreComponent}
        />
      ) : (
        <ListItem item={item} onToggle={onToggle} />
      )}
    </>
  );
};
