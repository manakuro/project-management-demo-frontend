import React, { memo, useMemo } from 'react'
import { Flex, FlexProps, Text, TextProps } from 'src/components/atoms'
import { dateFns } from 'src/shared/dateFns'

type Props = {
  dateString: string
} & FlexProps

export const TasksCalendarListItem: React.FC<Props> = memo<Props>((props) => {
  const { dateString, ...rest } = props
  const date = useMemo(() => new Date(dateString), [dateString])

  const dateText = useMemo(() => {
    if (dateFns.isFirstDayOfMonth(date)) return dateFns.format(date, 'MMMM d')
    return dateFns.format(date, 'd')
  }, [date])

  const style = useMemo<FlexProps>(() => {
    if (dateFns.isToday(date)) return { borderTopColor: 'cyan.400' }
    if (dateFns.isFirstDayOfMonth(date)) return { borderTopColor: 'gray.400' }
    return {}
  }, [date])

  const textStyle = useMemo<TextProps>(() => {
    if (dateFns.isToday(date)) return { color: 'cyan.400', fontWeight: 'bold' }
    return {}
  }, [date])

  return (
    <Flex
      bg="white"
      borderTop="3px"
      borderStyle="solid"
      borderTopColor="transparent"
      flexDirection="column"
      marginRight="3px"
      minH="185px"
      w="full"
      p={2}
      {...style}
      {...rest}
    >
      <Text fontSize="xs" fontWeight="medium" color="text.muted" {...textStyle}>
        {dateText}
      </Text>
    </Flex>
  )
})
TasksCalendarListItem.displayName = 'TasksCalendarListItem'
