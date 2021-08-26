import React, { memo, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = {
  observeScrollUp?: boolean
  onVisible: (id: string) => void
  dateString: string
} & FlexProps

export const ScrollUpObserver: React.FC<Props> = memo<Props>((props) => {
  const { observeScrollUp, onVisible, dateString, ...rest } = props
  const { ref, inView } = useInView({
    skip: !observeScrollUp,
    triggerOnce: true,
  })
  const hasScrolledUp = useRef(false)

  useEffect(() => {
    const cleanup = () => {
      hasScrolledUp.current = false
    }
    if (!inView) return cleanup
    if (hasScrolledUp.current) return cleanup

    if (observeScrollUp) {
      onVisible(dateString)
      hasScrolledUp.current = true
    }
  }, [inView, observeScrollUp, onVisible, dateString])

  return <Flex {...rest} ref={ref} flex={1} />
})
ScrollUpObserver.displayName = 'ScrollUpObserver'
