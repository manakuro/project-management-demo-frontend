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
  const { ref, inView, entry } = useInView({
    skip: !isSecondRowOfMonth,
    trackVisibility: isSecondRowOfMonth,
    delay: 100,
  })
  const isFirst = useRef(true)
  const { onNextMonth, onPrevMonth } = useTasksCalendarContext()

  useEffect(() => {
    if (!isSecondRowOfMonth) return
    if (isFirst.current) return

    // When scrolling down and the calendar changes to the next month
    if (
      !entry?.isIntersecting &&
      entry?.intersectionRatio === 0 &&
      entry.boundingClientRect.top < 0
    ) {
      console.log('in!: ', id)
      onNextMonth()
      return
    }

    // When scrolling up and the calendar changes to the next month
    if (
      entry?.isIntersecting &&
      entry?.intersectionRatio > 0 &&
      entry.boundingClientRect.top < 0
    ) {
      console.log('out!: ', id)
      onPrevMonth()
      return
    }

    if (entry && isFirst) {
      isFirst.current = false
    }
  }, [entry, isSecondRowOfMonth, id, inView, onNextMonth, onPrevMonth])

  return <Flex {...rest} ref={ref} />
})
MonthObserver.displayName = 'MonthObserver'
