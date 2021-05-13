import React, { memo, useCallback, useMemo } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselRightChevron,
  CarouselLeftChevron,
  CarouselBody,
} from 'src/components/organisms'
import { useFileViewerModal } from './useFileViewerModal'
import { useAttachmentsByTask } from 'src/store/attachments'
import { ListItem } from './ListItem'

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
      <CarouselRightChevron />
      <CarouselLeftChevron />
    </Carousel>
  )
})
Body.displayName = 'Body'
