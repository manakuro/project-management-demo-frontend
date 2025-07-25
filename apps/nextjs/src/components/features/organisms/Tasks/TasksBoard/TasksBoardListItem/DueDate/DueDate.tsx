import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { PopoverDueDatePicker } from 'src/components/features/organisms/Popovers';
import {
  DueDate as AtomsDueDate,
  Button,
  Flex,
  type FlexProps,
  Icon,
} from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import { useTask } from 'src/store/entities/task';
import { useTasksBoardListItemContext } from '../Provider';

type Props = FlexProps & {
  taskId: string;
};

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { task, setTaskDueDate, resetTaskDueDate } = useTask(props.taskId);
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate]);
  const { isHovering } = useTasksBoardListItemContext();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date);
    },
    [setTaskDueDate],
  );

  const handleClear = useCallback(async () => {
    await resetTaskDueDate();
  }, [resetTaskDueDate]);

  return (
    <Flex onClick={(e) => e.stopPropagation()}>
      <PopoverDueDatePicker
        date={task.dueDate}
        onChange={handleChange}
        onClear={handleClear}
      >
        {!hasDueDate && (
          <Icon
            icon="calendarAlt"
            color="text.muted"
            visibility={isHovering ? 'visible' : 'hidden'}
            {...clickableHoverLightStyle}
          />
        )}
        {hasDueDate && (
          <Button variant="ghost" h={5} minH={5} w="auto" minW="44px" px={1}>
            <AtomsDueDate fontSize="xs" dueDate={task.dueDate} />
          </Button>
        )}
      </PopoverDueDatePicker>
    </Flex>
  );
});
DueDate.displayName = 'TasksDueDate';
