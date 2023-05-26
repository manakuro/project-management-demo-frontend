import React, { memo } from 'react'
import {
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from 'src/components/features/organisms/Tasks'
import { Skeleton } from 'src/components/ui/atoms'

const BUTTON_HEIGHT = '28px'
export const SkeletonListHeader: React.FC = memo(() => {
  return (
    <TasksHeader>
      <TasksHeaderLeft>
        <Skeleton w="114px" h={BUTTON_HEIGHT} />
      </TasksHeaderLeft>
      <TasksHeaderRight>
        <Skeleton h={BUTTON_HEIGHT} w="126px" />
        <Skeleton h={BUTTON_HEIGHT} w="57px" />
        <Skeleton h={BUTTON_HEIGHT} w="91px" />
      </TasksHeaderRight>
    </TasksHeader>
  )
})
SkeletonListHeader.displayName = 'SkeletonListHeader'
