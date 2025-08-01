import {
  TasksHeader,
  TasksHeaderRight,
} from '@/components/features/organisms/Tasks';
import { type FlexProps, Skeleton } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

const BUTTON_HEIGHT = '28px';
export const SkeletonBoardHeader: React.FC<Props> = memo<Props>(() => {
  return (
    <TasksHeader
      h="40px"
      boxShadow="sm"
      borderBottom={1}
      borderStyle="solid"
      borderColor="gray.200"
      alignItems="center"
    >
      <TasksHeaderRight ml="auto">
        <Skeleton h={BUTTON_HEIGHT} w="126px" />
        <Skeleton h={BUTTON_HEIGHT} w="57px" />
        <Skeleton h={BUTTON_HEIGHT} w="91px" />
      </TasksHeaderRight>
    </TasksHeader>
  );
});
SkeletonBoardHeader.displayName = 'SkeletonBoardHeader';
