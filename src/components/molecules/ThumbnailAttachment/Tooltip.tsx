import React, { useEffect } from 'react'
import {
  Tooltip as MoleculesTooltip,
  TooltipProps,
} from 'src/components/molecules'
import { useDisclosure } from 'src/shared/chakra'
import { useAttachment } from 'src/store/attachments'
import { useThumbnailAttachment } from './Provider'
import { Flex } from 'src/components/atoms'

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
      tooltipDisclosure.onOpen()
    } else {
      tooltipDisclosure.onClose()
    }
  }, [isHovering, thumbnailMenuOpened, tooltipDisclosure])

  return (
    <MoleculesTooltip
      isOpen={tooltipDisclosure.isOpen}
      hasArrow
      label={attachment.src}
      aria-label={attachment.src}
      size="sm"
      {...rest}
    >
      <Flex>{children}</Flex>
    </MoleculesTooltip>
  )
}
