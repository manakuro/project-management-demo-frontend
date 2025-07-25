import type React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { Flex, Input, type InputProps } from 'src/components/ui/atoms';
import { useClickOutside, useDebounce } from 'src/hooks';

type Props = {
  value: string;
  onChange: (val: string) => void;
  isNew?: boolean;
  deleteTask?: () => Promise<void>;
  focusedBorder?: boolean;
} & Omit<InputProps, 'onChange'>;

export const TasksNameField: React.FC<Props> = memo<Props>((props) => {
  const [value, setValue] = useState<string>(props.value);
  const { ref, removeEventListener } = useClickOutside(
    async () => {
      if (!value) await props.deleteTask?.();
    },
    {
      skip: !props.isNew,
    },
  );

  useEffect(() => {
    if (!props.isNew) removeEventListener();
  }, [props.isNew, removeEventListener]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useDebounce(value, props.onChange, 500);

  return (
    <Flex
      ref={ref}
      position="relative"
      flex={1}
      h={9}
      maxH={9}
      maxW="full"
      p={1}
      alignItems="center"
      borderColor="gray.300"
      borderRadius="sm"
      border="1px"
      boxShadow="sm"
    >
      <Input
        value={value}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        fontSize="sm"
        placeholder="Write a task name"
        autoFocus
        variant="unstyled"
      />
    </Flex>
  );
});
TasksNameField.displayName = 'TasksNameField';
