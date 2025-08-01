import type { SetValueParam } from '@/components/features/organisms/Menus/EditorMentionMenu';
import type { FlexProps } from '@/components/ui/atoms';
import type { Mention } from '@/store/entities/mention';
import { MentionType } from '@/store/entities/mention';
import type React from 'react';
import { memo } from 'react';
import { MentionItemBase } from './MentionItemBase';
import { Project } from './Project';
import { Task } from './Task';
import { Teammate } from './Teammate';
import { Workspace } from './Workspace';

type Props = Override<
  FlexProps,
  {
    onClick: (val: SetValueParam) => void;
  }
> & {
  mention: Mention;
  index: number;
};

export const MentionItem: React.FC<Props> = memo<Props>((props) => {
  const { onClick, mention, ...rest } = props;

  switch (mention.type) {
    case MentionType.TEAMMATE:
      return (
        <MentionItemBase {...props}>
          <Teammate {...rest} mention={props.mention} />
        </MentionItemBase>
      );
    case MentionType.TASK:
      return (
        <MentionItemBase {...props}>
          <Task {...rest} mention={props.mention} />
        </MentionItemBase>
      );
    case MentionType.PROJECT:
      return (
        <MentionItemBase {...props}>
          <Project {...rest} mention={props.mention} />
        </MentionItemBase>
      );
    case MentionType.WORKSPACE:
      return (
        <MentionItemBase {...props}>
          <Workspace {...rest} mention={props.mention} />
        </MentionItemBase>
      );
  }
});
MentionItem.displayName = 'MentionItem';
