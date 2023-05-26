import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { MonthObserver } from './MonthObserver'
import { ScrollDownObserver } from './ScrollDownObserver'
import { ScrollUpObserver } from './ScrollUpObserver'

type Props = {
  observeScrollUp?: boolean
  observeScrollDown?: boolean
  onVisibleWhenScrollUp: (id: string) => void
  onVisibleWhenScrollDown: (id: string) => void
  isSecondRowOfMonth: boolean
  dateString: string
} & FlexProps

export const TasksCalendarListRow: React.FC<Props> = memo<Props>((props) => {
  const {
    observeScrollUp,
    observeScrollDown,
    onVisibleWhenScrollUp,
    onVisibleWhenScrollDown,
    isSecondRowOfMonth,
    dateString,
    ...rest
  } = props

  return (
    <MonthObserver
      isSecondRowOfMonth={isSecondRowOfMonth}
      dateString={dateString}
      id={props.id}
    >
      <ScrollUpObserver
        observeScrollUp={observeScrollUp}
        onVisible={onVisibleWhenScrollUp}
        dateString={dateString}
      >
        <ScrollDownObserver
          observeScrollDown={observeScrollDown}
          onVisible={onVisibleWhenScrollDown}
          dateString={dateString}
        >
          <Flex marginBottom="3px" {...rest} flex={1} />
        </ScrollDownObserver>
      </ScrollUpObserver>
    </MonthObserver>
  )
})
TasksCalendarListRow.displayName = 'TasksCalendarListRow'
