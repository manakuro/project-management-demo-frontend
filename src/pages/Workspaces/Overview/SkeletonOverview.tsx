import React, { memo } from 'react'
import { Flex, FlexProps, Skeleton, Stack } from 'src/components/atoms'
import { TasksHeader, TasksHeaderRight } from 'src/components/organisms/Tasks'

type Props = FlexProps

const TEXT_HEIGHT = '16px'
const BUTTON_HEIGHT = '28px'
const CARD_HEIGHT = '97px'
export const SkeletonOverview: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Flex flex={1} flexDirection="column" {...props}>
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
      <Flex flex={1} p={2}>
        {[...new Array(3)].map((_, i) => (
          <Flex flexDirection="column" w="304px" px={3} py={2} key={i}>
            <Flex h="36px" alignItems="center">
              <Skeleton h={TEXT_HEIGHT} w="100px" borderRadius="full" />
            </Flex>
            <Stack spacing={2}>
              <Skeleton h={CARD_HEIGHT} w="full" borderRadius="md" />
              <Skeleton h={CARD_HEIGHT} w="full" borderRadius="md" />
            </Stack>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
})
SkeletonOverview.displayName = 'SkeletonList'
