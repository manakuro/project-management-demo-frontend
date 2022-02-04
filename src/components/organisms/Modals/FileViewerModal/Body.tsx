import React, { memo, useCallback, useMemo } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselRightChevron,
  CarouselLeftChevron,
  CarouselBody,
  CarouselThumbnail,
  CarouselThumbnailItem,
} from 'src/components/organisms/Carousel'
import { ListItem } from './ListItem'
import { ThumbnailListItem } from './ThumbnailListItem/ThumbnailListItem'
import { useFileViewerModal } from './useFileViewerModal'

type Props = {}

export const Body: React.VFC<Props> = memo(() => {
  const { taskFileIds, setState, currentTaskFileId } = useFileViewerModal()
  const defaultIndex = useMemo(
    () => taskFileIds.indexOf(currentTaskFileId),
    [taskFileIds, currentTaskFileId],
  )

  const handleChangeCarousel = useCallback(
    (currentIndex: number) => {
      setState((s) => ({
        ...s,
        currentTaskFileId: taskFileIds[currentIndex],
      }))
    },
    [taskFileIds, setState],
  )

  return (
    <Carousel defaultIndex={defaultIndex} onChange={handleChangeCarousel}>
      <CarouselBody>
        {taskFileIds.map((id) => (
          <CarouselItem key={id}>
            <ListItem taskFileId={id} />
          </CarouselItem>
        ))}
      </CarouselBody>
      <CarouselThumbnail>
        {taskFileIds.map((id) => (
          <CarouselThumbnailItem key={id}>
            <ThumbnailListItem taskFileId={id} />
          </CarouselThumbnailItem>
        ))}
      </CarouselThumbnail>
      <CarouselRightChevron />
      <CarouselLeftChevron />
    </Carousel>
  )
})
Body.displayName = 'Body'
