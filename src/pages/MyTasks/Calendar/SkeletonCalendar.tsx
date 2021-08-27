import React, { memo } from 'react'
import { Flex, FlexProps, Skeleton } from 'src/components/atoms'
import {
  TasksCalendarContent,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from 'src/components/organisms/Tasks'

type Props = FlexProps

const BUTTON_HEIGHT = '28px'
export const SkeletonCalendar: React.VFC<Props> = memo<Props>((props) => {
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
        <TasksHeaderLeft>
          <Skeleton h={BUTTON_HEIGHT} w="127px" />
        </TasksHeaderLeft>
        <TasksHeaderRight ml="auto">
          <Skeleton h={BUTTON_HEIGHT} w="57px" />
          <Skeleton h={BUTTON_HEIGHT} w="91px" />
        </TasksHeaderRight>
      </TasksHeader>
      <Flex flex={1} flexDirection="column">
        <Flex
          flexShrink={0}
          fontSize="xs"
          color="text.muted"
          fontWeight="medium"
          h={6}
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          bg="white"
        />
        <TasksCalendarContent bg="gray.50" />
      </Flex>
    </Flex>
  )
})
SkeletonCalendar.displayName = 'SkeletonList'
