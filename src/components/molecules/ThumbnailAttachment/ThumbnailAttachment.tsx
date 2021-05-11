import React, { useCallback, useEffect, useState } from 'react'
import { Flex, FlexProps, Icon, IconButton, Image } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { MenuButton } from 'src/components/organisms'
import { ThumbnailMenu } from './ThumbnailMenu'
import { useHover } from 'src/hooks/useHover'
import { useDisclosure } from 'src/shared/chakra'

type Props = FlexProps & {
  image: string
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  const { image, ...rest } = props
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
      label={props.image}
      aria-label={props.image}
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
        <Image
          width="auto"
          maxH={16}
          maxW="240px"
          src={image}
          borderRadius="lg"
          objectFit="cover"
        />
        <ThumbnailMenu
          onOpen={handleThumbnailMenuOpen}
          onClose={handleThumbnailMenuClose}
          src={props.image}
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
        <Flex
          borderRadius="lg"
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg="gray.700"
          opacity={isHovering ? 0.5 : 0}
          zIndex="base"
          alignItems="center"
          justifyContent="flex-end"
          p={1}
        />
      </Flex>
    </Tooltip>
  )
}
