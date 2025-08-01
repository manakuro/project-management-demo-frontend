import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useWorkspaceActivityTasksTaskIds } from '@/store/app/inbox/activity/workspaceActivityTasks';
import { useCreatedByIdsByTaskIds } from '@/store/entities/task';
import { useTeammateNamesByTeammateIds } from '@/store/entities/teammate';
import type React from 'react';
import { memo, useMemo } from 'react';

type Props = FlexProps & {
  workspaceActivityId: string;
};

export const InfoText: React.FC<Props> = memo<Props>((props) => {
  const { workspaceActivityId } = props;
  const { taskIds } = useWorkspaceActivityTasksTaskIds(workspaceActivityId);
  const { createdByIds } = useCreatedByIdsByTaskIds(taskIds);
  const { teammateNames } = useTeammateNamesByTeammateIds(createdByIds);
  const text = useMemo(() => {
    const names =
      teammateNames.length > 2
        ? [...teammateNames.slice(0, 2), 'others']
        : teammateNames;

    return `${names.join(' and ')} added new tasks`;
  }, [teammateNames]);

  return (
    <Flex flex={1} mt={2} fontSize="xs" fontWeight="medium">
      {text}
    </Flex>
  );
});

InfoText.displayName = 'InfoText';
