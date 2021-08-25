import React, { memo, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = {
  observeScrollDown?: boolean
  onVisible: (id: string) => void
  dateString: string
} & FlexProps

export const ScrollDownObserver: React.FC<Props> = memo<Props>((props) => {
  const { observeScrollDown, onVisible, dateString, ...rest } = props
  const { ref, inView } = useInView({
    skip: !observeScrollDown,
    triggerOnce: true,
  })
  const hasScrolledDown = useRef(false)

  useEffect(() => {
    if (!inView) return
    if (hasScrolledDown.current) return

    if (observeScrollDown) {
      onVisible(props.id || '')
      hasScrolledDown.current = true
    }
  }, [inView, observeScrollDown, onVisible, props.id])

  return <Flex {...rest} ref={ref} flex={1} />
})
ScrollDownObserver.displayName = 'ScrollDownObserver'
