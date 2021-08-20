import React, { memo, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = {
  observeScrollUp?: boolean
  observeScrollDown?: boolean
  onVisibleWhenScrollUp: () => void
  onVisibleWhenScrollDown: () => void
} & FlexProps

export const TasksCalendarListRow: React.FC<Props> = memo<Props>((props) => {
  const {
    observeScrollUp,
    observeScrollDown,
    onVisibleWhenScrollUp,
    onVisibleWhenScrollDown,
    ...rest
  } = props
  const { ref, inView } = useInView({
    skip: !observeScrollUp && !observeScrollDown,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!inView) return

    if (observeScrollUp) {
      onVisibleWhenScrollUp()
      return
    }
    if (observeScrollDown) {
      onVisibleWhenScrollDown()
    }
  }, [
    inView,
    observeScrollDown,
    observeScrollUp,
    onVisibleWhenScrollDown,
    onVisibleWhenScrollUp,
  ])

  return <Flex marginBottom="3px" {...rest} ref={ref} />
})
TasksCalendarListRow.displayName = 'TasksCalendarListItem'
