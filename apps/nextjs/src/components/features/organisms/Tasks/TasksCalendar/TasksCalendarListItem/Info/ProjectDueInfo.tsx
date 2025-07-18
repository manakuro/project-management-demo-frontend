import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { useProjectDueDate } from '../hooks';

type Props = {
  dateString: string;
} & FlexProps;

export const ProjectDueInfo: React.FC<Props> = memo<Props>((props) => {
  const { dateString } = props;
  const { isProjectDueDate } = useProjectDueDate({ dateString });

  if (isProjectDueDate)
    return (
      <Flex fontSize="xs" fontWeight="medium" color="orange.400">
        Project Due
      </Flex>
    );

  return null;
});
ProjectDueInfo.displayName = 'ProjectDueInfo';
