import { useTasksContext } from '@/components/features/organisms/Tasks';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { ProjectDueInfo } from './ProjectDueInfo';

type Props = {
  dateString: string;
} & FlexProps;

export const Info: React.FC<Props> = memo<Props>((props) => {
  const { dateString } = props;
  const { isProjectsPage } = useTasksContext();

  if (isProjectsPage)
    return (
      <Flex ml="auto">
        <ProjectDueInfo dateString={dateString} />
      </Flex>
    );

  return null;
});
Info.displayName = 'Info';
