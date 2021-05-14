import React, { memo, useCallback, useMemo } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselRightChevron,
  CarouselLeftChevron,
  CarouselBody,
  CarouselThumbnail,
  CarouselThumbnailItem,
} from 'src/components/organisms'
import { useFileViewerModal } from './useFileViewerModal'
import { useAttachmentsByTask } from 'src/store/attachments'
import { ListItem } from './ListItem'
import { ThumbnailListItem } from './ThumbnailListItem'

type Props = {}

export const Body: React.VFC<Props> = memo(() => {
  const { taskId, setState, currentAttachmentId } = useFileViewerModal()
  const { attachmentIds } = useAttachmentsByTask(taskId)
  const defaultIndex = useMemo(
    () => attachmentIds.indexOf(currentAttachmentId),
    [attachmentIds, currentAttachmentId],
  )

  const handleChangeCarousel = useCallback(
    (currentIndex: number) => {
      setState((s) => ({
        ...s,
        currentAttachmentId: attachmentIds[currentIndex],
      }))
    },
    [attachmentIds, setState],
  )

  return (
    <Carousel defaultIndex={defaultIndex} onChange={handleChangeCarousel}>
      <CarouselBody>
        {attachmentIds.map((id) => (
          <CarouselItem key={id}>
            <ListItem attachmentId={id} />
          </CarouselItem>
        ))}
      </CarouselBody>
      <CarouselThumbnail>
        {attachmentIds.map((id) => (
          <CarouselThumbnailItem key={id}>
            <ThumbnailListItem attachmentId={id} />
          </CarouselThumbnailItem>
        ))}
      </CarouselThumbnail>
      <CarouselRightChevron />
      <CarouselLeftChevron />
    </Carousel>
  )
})
Body.displayName = 'Body'
