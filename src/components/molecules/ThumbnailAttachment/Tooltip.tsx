import React, { useEffect } from 'react'
import { Flex } from 'src/components/atoms'
import {
  Tooltip as MoleculesTooltip,
  TooltipProps,
} from 'src/components/molecules'
import { useDisclosure } from 'src/shared/chakra'
import { useAttachment } from 'src/store/entities/attachments'
import { useThumbnailAttachment } from './Provider'

type Props = Omit<TooltipProps, 'label' | 'size'> & {
  attachmentId: string
}

export const Tooltip: React.FC<Props> = (props) => {
  const { attachmentId, children, ...rest } = props
  const { attachment } = useAttachment(attachmentId)
  const tooltipDisclosure = useDisclosure()
  const { isHovering, thumbnailMenuOpened } = useThumbnailAttachment()

  useEffect(() => {
    if (!thumbnailMenuOpened && isHovering) {
      setTimeout(() => {
        tooltipDisclosure.onOpen()
      }, props.openDelay ?? 0)
    } else {
      tooltipDisclosure.onClose()
    }
  }, [isHovering, props.openDelay, thumbnailMenuOpened, tooltipDisclosure])

  return (
    <MoleculesTooltip
      isOpen={tooltipDisclosure.isOpen}
      hasArrow
      label={attachment.name}
      aria-label={attachment.src}
      size="sm"
      {...rest}
    >
      <Flex>{children}</Flex>
    </MoleculesTooltip>
  )
}
