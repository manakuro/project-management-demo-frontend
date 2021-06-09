import React, { useCallback } from 'react'
import { Flex, Icon, IconButton } from 'src/components/atoms'
import { useCarousel } from './Provider'

type Props = {}

export const CarouselLeftChevron: React.FC<Props> = () => {
  const { count, currentIndex, setCurrentIndex } = useCarousel()

  const handleClick = useCallback(() => {
    const nextIndex = currentIndex - 1
    if (nextIndex < 0) {
      setCurrentIndex(count - 1)
      return
    }

    setCurrentIndex(nextIndex)
  }, [count, currentIndex, setCurrentIndex])

  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      w={24}
      h="100%"
      justifyContent="center"
      alignItems="center"
      zIndex="skipLink"
    >
      <IconButton
        onClick={handleClick}
        aria-label="next"
        icon={<Icon icon="chevronLeft" size="2xl" />}
        variant="ghost"
        light
      />
    </Flex>
  )
}
