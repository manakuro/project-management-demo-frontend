import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { AssigneeMenu } from 'src/components/features/organisms/Menus';
import { Input as AtomsInput } from 'src/components/ui/atoms';
import { useClickOutside } from 'src/hooks';
import { useDisclosure } from 'src/shared/chakra';
import { useTaskCommand } from 'src/store/entities/task';
import type { Teammate } from 'src/store/entities/teammate';

type Props = {
  taskId: string;
  onClose: () => void;
};

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { taskId, onClose } = props;
  const { assignTask } = useTaskCommand();
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true });
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (val) {
        popoverDisclosure.onOpen();
        return;
      }
      popoverDisclosure.onClose();
    },
    [popoverDisclosure],
  );

  const handleSelect = useCallback(
    async (val: Teammate) => {
      setValue('');
      onClose();
      await assignTask({ id: taskId, assigneeId: val.id });
    },
    [assignTask, onClose, taskId],
  );

  return (
    <AssigneeMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="bottom-start"
      queryText={value}
      contentStyle={{
        ml: '-45px',
      }}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        placeholder="mana"
        onChange={handleChange}
        ml={2}
        w={60}
      />
    </AssigneeMenu>
  );
});
Input.displayName = 'Input';
