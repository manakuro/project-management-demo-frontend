import React, { useCallback, useMemo } from 'react'
import {
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
} from 'src/components/atoms'
import { useThumbnailAttachmentContext } from 'src/components/molecules/ThumbnailAttachment/Provider'
import {
  MenuButton as AtomsMenuButton,
  MenuButtonProps,
} from 'src/components/organisms/Menu'
import { transitions } from 'src/styles'

type Props = Omit<MenuButtonProps, 'children'> & {
  light?: IconButtonProps['light']
  color: IconProps['color']
}

export const MenuButton: React.FC<Props> = (props) => {
  const { isHovering, thumbnailMenuOpened } = useThumbnailAttachmentContext()
  const show = useMemo(
    () => isHovering || thumbnailMenuOpened,
    [isHovering, thumbnailMenuOpened],
  )
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }, [])

  return (
    <AtomsMenuButton
      aria-label="Attachment button"
      as={IconButton}
      icon={<Icon icon="chevronDown" color={props.color} />}
      size="sm"
      variant="ghost"
      position="absolute"
      top={4}
      right={1}
      zIndex="docked"
      visibility={show ? 'visible' : 'hidden'}
      transition={transitions.base('background')}
      onClick={handleClick}
      {...props}
    />
  )
}
