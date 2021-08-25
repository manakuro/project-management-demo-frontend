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
  const [hasScrolledUp, setHasScrolledUp] = useState(false)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (hasScrolledDown) return

    if (observeScrollDown) {
      onVisibleWhenScrollDown(props.id || '')
      setHasScrolledDown(true)
    }
  }, [
    inView,
    observeScrollDown,
    onVisibleWhenScrollDown,
    props.id,
    hasScrolledDown,
  ])

  useEffect(() => {
    if (!inView) return
    if (hasScrolledUp) return

    if (observeScrollUp) {
      onVisibleWhenScrollUp(props.id || '')
      setHasScrolledUp(true)
    }
  }, [inView, observeScrollUp, onVisibleWhenScrollUp, props.id, hasScrolledUp])

  return <Flex marginBottom="3px" {...rest} ref={ref} />
})
TasksCalendarListRow.displayName = 'TasksCalendarListRow'
