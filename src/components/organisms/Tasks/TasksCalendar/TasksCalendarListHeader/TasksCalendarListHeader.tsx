import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat']
export const TasksCalendarListHeader: React.FC<Props> = memo<Props>(() => {
  const weekdays = useMemo(() => {
    return WEEKDAYS
  }, [])

  return (
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
    >
      {weekdays.map((w) => (
        <Flex
          key={w}
          justifyContent="flex-start"
          h="full"
          pl={2}
          w="full"
          alignItems="center"
        >
          {w}
        </Flex>
      ))}
    </Flex>
  )
})
TasksCalendarListHeader.displayName = 'TasksCalendarList'
