import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { PopoverDueDatePicker } from 'src/components/features/organisms/Popovers';
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell';
import { DueDate, Flex, type FlexProps, Icon } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import { useHover } from 'src/hooks/useHover';
import { useTask } from 'src/store/entities/task';

type Props = FlexProps & {
  taskId: string;
  width: string;
};

export const TasksDueDate: React.FC<Props> = memo<Props>((props) => {
  const { task, setTaskDueDate, resetTaskDueDate } = useTask(props.taskId);
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate]);
  const { ref, isHovering } = useHover();
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const showCalendarIcon = useMemo(
    () => !hasDueDate && isHovering,
    [hasDueDate, isHovering],
  );
  const showResetIcon = useMemo(
    () => hasDueDate && isHovering,
    [hasDueDate, isHovering],
  );
  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date);
    },
    [setTaskDueDate],
  );
  const handleReset = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await resetTaskDueDate();
    },
    [resetTaskDueDate],
  );

  return (
    <TasksListCell
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: '280px',
      }}
      ref={ref}
      cursor="pointer"
      hover
    >
      <PopoverDueDatePicker
        linkStyle={{ w: 'full', h: 'full' }}
        date={task.dueDate}
        onChange={handleChange}
        onClear={resetTaskDueDate}
      >
        <Flex flex={1} h="full" alignItems="center">
          {showCalendarIcon && (
            <Icon
              icon="calendarAlt"
              color="text.muted"
              {...clickableHoverLightStyle}
            />
          )}
          <DueDate fontSize="xs" dueDate={task.dueDate} />
          {showResetIcon && (
            <Icon
              ml="auto"
              mt="1px"
              icon="x"
              color="text.muted"
              size="sm"
              {...clickableHoverLightStyle}
              onClick={handleReset}
            />
          )}
        </Flex>
      </PopoverDueDatePicker>
    </TasksListCell>
  );
});
TasksDueDate.displayName = 'TasksDueDate';
