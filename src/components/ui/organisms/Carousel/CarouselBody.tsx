import React, { useEffect } from 'react'
import { Flex } from 'src/components/ui/atoms'
import { useCarouselContext } from './Provider'

type Props = {}

export const CarouselBody: React.FCWithChildren<Props> = (props) => {
  const { setCount } = useCarouselContext()
  const count = React.Children.toArray(props.children).filter(
    (c) => (c as any).type.displayName === 'CarouselItem',
  ).length

  const children = React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) {
      console.warn('Provide React element under Carousel component')
      return null
    }

    return React.cloneElement(child, {
      index,
    })
  })

  useEffect(() => {
    setCount(count)
  }, [count, setCount])

  return (
    <Flex flex="1" position="relative" height="100%">
      {children}
    </Flex>
  )
}
