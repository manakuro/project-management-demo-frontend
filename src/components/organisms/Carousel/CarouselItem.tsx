import React, { useMemo } from 'react'
import { useCarousel } from './Provider'
import { Flex } from 'src/components/atoms'

type Props = {
  index?: number
}

export const CarouselItem: React.FC<Props> = (props) => {
  const { currentIndex } = useCarousel()
  const show = useMemo(
    () => currentIndex === props.index,
    [currentIndex, props.index],
  )
  console.log(props.index, currentIndex)

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
