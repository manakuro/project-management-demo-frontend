import type React from 'react';
import { memo } from 'react';
import {
  ProjectTeammateMenu,
  ProjectTeammateMenuContent,
  ProjectTeammateMenuTrigger,
} from 'src/components/features/organisms/Menus/ProjectTeammateMenu';
import type {
  PopoverContentProps,
  PopoverProps,
} from 'src/components/ui/organisms/Popover';
import type { Teammate } from 'src/store/entities/teammate';
import { Content } from './Content';

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  contentStyle?: PopoverContentProps;
};

export const AssignTaskMenu: React.FC<Props> = memo<Props>((props) => {
  const {
    onClosed,
    queryText,
    contentStyle,
    onSelect,
    onClose,
    isOpen,
    ...rest
  } = props;

  return (
    <ProjectTeammateMenu isOpen={isOpen} {...rest}>
      <ProjectTeammateMenuTrigger>{props.children}</ProjectTeammateMenuTrigger>
      {isOpen && (
        <ProjectTeammateMenuContent onClose={onClose} {...contentStyle}>
          <Content
            onSelect={onSelect}
            onClosed={onClosed}
            onClose={onClose}
            queryText={queryText}
          />
        </ProjectTeammateMenuContent>
      )}
    </ProjectTeammateMenu>
  );
});
AssignTaskMenu.displayName = 'AssignTaskMenu';
