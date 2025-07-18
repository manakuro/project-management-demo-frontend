import type React from 'react';
import { memo } from 'react';
import {
  SearchMenu,
  SearchMenuContent,
  SearchMenuTrigger,
} from 'src/components/features/organisms/Menus/SearchMenu';
import type { PopoverProps } from 'src/components/ui/organisms/Popover';
import { Content } from './Content';

type Props = PopoverProps & {
  onSelect: (val: string) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  immediate?: boolean;
};

export const ProjectMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, queryText, isOpen, onClose, immediate, ...rest } = props;

  return (
    <SearchMenu isOpen={isOpen} {...rest}>
      <SearchMenuTrigger>{props.children}</SearchMenuTrigger>
      {isOpen && (
        <SearchMenuContent mr={-3} onClose={onClose}>
          <Content
            onClosed={onClosed}
            onClose={props.onClose}
            onSelect={props.onSelect}
            queryText={queryText}
            immediate={immediate}
          />
        </SearchMenuContent>
      )}
    </SearchMenu>
  );
});
ProjectMenu.displayName = 'ProjectMenu';
