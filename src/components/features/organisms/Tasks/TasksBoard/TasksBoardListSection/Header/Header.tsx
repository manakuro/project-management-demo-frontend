import type React from 'react';
import { memo } from 'react';
import { Flex, Stack } from 'src/components/ui/atoms';
import { AddTaskButton } from './AddTaskButton';
import { MoreAction } from './MoreAction';
import { TaskSectionName } from './TaskSectionName';

type Props = {
  taskSectionId: string;
};

export const Header: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex h="36px" alignItems="center">
      <TaskSectionName taskSectionId={props.taskSectionId} />
      <Stack direction="row" spacing={1} ml="auto">
        <AddTaskButton taskSectionId={props.taskSectionId} />
        <MoreAction />
      </Stack>
    </Flex>
  );
});
Header.displayName = 'Header';
