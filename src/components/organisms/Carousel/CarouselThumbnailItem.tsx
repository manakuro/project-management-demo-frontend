import React, { useCallback, useMemo } from 'react'
import { AspectRatio, WrapItem } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useCarouselContext } from './Provider'

type Props = {
  index?: number
}

export const CarouselThumbnailItem: React.FCWithChildren<Props> = (props) => {
  const { currentIndex, setCurrentIndex } = useCarouselContext()
  const show = useMemo(
    () => currentIndex === props.index,
    [currentIndex, props.index],
  )
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleClick = useCallback(() => {
    setCurrentIndex(props.index!)
  }, [props.index, setCurrentIndex])

  return (
    <WrapItem
      justifyContent="center"
      alignItems="center"
      {...clickableHoverLightStyle}
      opacity={show ? 1 : 0.5}
      borderRadius="md"
      onClick={handleClick}
    >
      <AspectRatio w={16} ratio={4 / 3}>
        {props.children}
      </AspectRatio>
    </WrapItem>
  )
}
CarouselThumbnailItem.displayName = 'CarouselThumbnailItem'
