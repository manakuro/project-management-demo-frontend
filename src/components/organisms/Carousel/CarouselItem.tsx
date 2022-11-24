import React, { useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import { useCarouselContext } from './Provider'

type Props = {
  index?: number
}

export const CarouselItem: React.FCWithChildren<Props> = (props) => {
  const { currentIndex } = useCarouselContext()
  const show = useMemo(
    () => currentIndex === props.index,
    [currentIndex, props.index],
  )

  return (
    <Flex
      w="full"
      h="full"
      position="absolute"
      top={0}
      left={0}
      justifyContent="center"
      alignItems="center"
      px={24}
      opacity={show ? 1 : 0}
      zIndex={show ? 'popover' : 'base'}
    >
      <Flex
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {props.children}
      </Flex>
    </Flex>
  )
}
CarouselItem.displayName = 'CarouselItem'
