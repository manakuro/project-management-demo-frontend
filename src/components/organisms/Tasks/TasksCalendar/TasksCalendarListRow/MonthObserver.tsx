import React, { memo, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { FlexProps, Flex } from 'src/components/atoms'
import { useTasksCalendarContext } from '../Provider'

type Props = {
  isSecondRowOfMonth: boolean
  dateString: string
} & FlexProps

export const MonthObserver: React.FC<Props> = memo<Props>((props) => {
  const { isSecondRowOfMonth, id, dateString, ...rest } = props
  const { ref, entry } = useInView({
    skip: !isSecondRowOfMonth,
  })
  const isFirst = useRef(true)
  const { onNextMonth, onPrevMonth } = useTasksCalendarContext()

  useEffect(() => {
    if (!isSecondRowOfMonth) return

    const cleanup = () => {
      console.log('Clean up!')
      isFirst.current = true
    }

    // When scrolling down and the calendar changes to the next month
    if (
      !isFirst.current &&
      !entry?.isIntersecting &&
      entry?.intersectionRatio === 0 &&
      entry.boundingClientRect.top < 0
    ) {
      console.log('down!: ', id)
      onNextMonth()
      return
    }

    // When scrolling up and the calendar changes to the previous month
    if (
      !isFirst.current &&
      entry?.isIntersecting &&
      entry?.intersectionRatio > 0 &&
      entry.boundingClientRect.top < 0
    ) {
      console.log('up!: ', id)
      onPrevMonth()
      return cleanup
    }

    if (entry && isFirst.current) isFirst.current = false
  }, [entry, isSecondRowOfMonth, id, onNextMonth, onPrevMonth])

  return <Flex {...rest} ref={ref} />
})
MonthObserver.displayName = 'MonthObserver'
