import React, { memo, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = {
  observeScrollUp?: boolean
  observeScrollDown?: boolean
  onVisibleWhenScrollUp: (id: string) => void
  onVisibleWhenScrollDown: (id: string) => void
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
  const [scrolledUp, setScrolledUp] = useState(false)
  const [scrolledDown, setScrolledDown] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (scrolledDown) return

    if (observeScrollDown) {
      onVisibleWhenScrollDown(props.id || '')
      setScrolledDown(true)
    }
  }, [
    inView,
    observeScrollDown,
    onVisibleWhenScrollDown,
    props.id,
    scrolledDown,
  ])

  useEffect(() => {
    if (!inView) return
    if (scrolledUp) return

    if (observeScrollUp) {
      onVisibleWhenScrollUp(props.id || '')
      setScrolledUp(true)
    }
  }, [inView, observeScrollUp, onVisibleWhenScrollUp, props.id, scrolledUp])

  return <Flex marginBottom="3px" {...rest} ref={ref} />
})
TasksCalendarListRow.displayName = 'TasksCalendarListRow'
