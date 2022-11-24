import React, { memo } from 'react'
import { Flex, Skeleton } from 'src/components/atoms'
import { TasksListRow } from 'src/components/organisms/Tasks'

const TEXT_HEIGHT = '16px'

export const SkeletonList: React.FC = memo(() => {
  return (
    <Flex px={6} flex={1}>
      <Flex flex={1} flexDirection="column">
        <Flex flexDirection="column" ml={6}>
          {['40%', '32%', '38%'].map((w, i) => (
            <TasksListRow key={i} alignItems="center">
              <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" />
              <Skeleton h={TEXT_HEIGHT} w={w} ml={2} borderRadius="full" />
            </TasksListRow>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
})
SkeletonList.displayName = 'SkeletonList'
