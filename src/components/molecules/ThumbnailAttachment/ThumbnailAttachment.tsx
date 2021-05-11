import React, { useCallback, useEffect, useState } from 'react'
import { Flex, FlexProps, Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { MenuButton } from 'src/components/organisms'
import { ThumbnailMenu } from './ThumbnailMenu'
import { useHover } from 'src/hooks/useHover'
import { useDisclosure } from 'src/shared/chakra'
import { useAttachment } from 'src/store/attachments'
import { ThumbnailListItem } from './ThrumbnailListItem'

type Props = FlexProps & {
  attachmentId: string
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props
  const { attachment } = useAttachment(attachmentId)
  const { ref, isHovering } = useHover()
  const tooltipDisclosure = useDisclosure()
  const [thumbnailMenuOpened, setThumbnailMenuOpened] = useState<boolean>(false)

  useEffect(() => {
    if (!thumbnailMenuOpened && isHovering) {
      tooltipDisclosure.onOpen()
    } else {
      tooltipDisclosure.onClose()
    }
  }, [isHovering, thumbnailMenuOpened, tooltipDisclosure])

  const handleThumbnailMenuOpen = useCallback(() => {
    setThumbnailMenuOpened(true)
  }, [])

  const handleThumbnailMenuClose = useCallback(() => {
    setThumbnailMenuOpened(false)
  }, [])

  return (
    <Tooltip
      isOpen={tooltipDisclosure.isOpen}
      hasArrow
      label={attachment.src}
      aria-label={attachment.src}
      size="sm"
    >
      <Flex
        {...rest}
        ref={ref}
        minW="60px"
        h={16}
        bg="gray.50"
        borderRadius="lg"
        cursor="pointer"
        position="relative"
      >
        <ThumbnailListItem
          attachmentId={attachmentId}
          isHovering={isHovering}
        />
        <ThumbnailMenu
          onOpen={handleThumbnailMenuOpen}
          onClose={handleThumbnailMenuClose}
          src={attachment.src}
        >
          <MenuButton
            aria-label="Attachment button"
            as={IconButton}
            icon={<Icon icon="chevronDown" color="white" />}
            size="sm"
            variant="ghost"
            position="absolute"
            top={4}
            right={1}
            zIndex="docked"
            light
          />
        </ThumbnailMenu>
      </Flex>
    </Tooltip>
  )
}
