import React, { memo } from 'react'
import { Flex, Skeleton } from 'src/components/atoms'
import {
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksListRow,
} from 'src/components/organisms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'

const TEXT_HEIGHT = '16px'
const BUTTON_HEIGHT = '28px'
export const SkeletonList: React.VFC = memo(() => {
  return (
    <Flex flex={1} flexDirection="column">
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
      <Flex px={6} flex={1}>
        <Flex flex={1} flexDirection="column">
          <Flex flex={1}>
            <TasksListCell
              containerStyle={{ w: 'calc(600px - 24px)' }}
              pl={0}
              borderLeft="none"
            />
            <TasksListCell containerStyle={{ w: '120px' }} />
            <TasksListCell containerStyle={{ w: '120px' }} />
            <TasksListCell containerStyle={{ w: '120px' }} />
            <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
          </Flex>
          <Flex flex={1} flexDirection="column">
            <Flex h="50px" alignItems="center">
              <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" ml={2} />
              <Skeleton h={TEXT_HEIGHT} w="138px" borderRadius="full" ml={3} />
            </Flex>
            <Flex flexDirection="column" ml={8}>
              {['40%', '32%', '38%', '42%', '50%', '40%', '41%'].map((w, i) => (
                <TasksListRow key={i} alignItems="center">
                  <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" />
                  <Skeleton h={TEXT_HEIGHT} w={w} ml={2} borderRadius="full" />
                </TasksListRow>
              ))}
            </Flex>
            <Flex h="50px" alignItems="center">
              <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" ml={2} />
              <Skeleton h={TEXT_HEIGHT} w="138px" borderRadius="full" ml={3} />
            </Flex>
            <Flex flexDirection="column" ml={8}>
              {['39%', '30%', '38%', '42%'].map((w, i) => (
                <TasksListRow key={i} alignItems="center">
                  <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" />
                  <Skeleton h={TEXT_HEIGHT} w={w} ml={2} borderRadius="full" />
                </TasksListRow>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
})
SkeletonList.displayName = 'SkeletonList'
