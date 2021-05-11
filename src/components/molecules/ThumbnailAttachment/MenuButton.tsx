import React, { useMemo } from 'react'
import {
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
} from 'src/components/atoms'
import {
  MenuButton as AtomsMenuButton,
  MenuProps,
} from 'src/components/organisms'
import { useThumbnailAttachment } from 'src/components/molecules/ThumbnailAttachment/Provider'
import { transitions } from 'src/styles'

type Props = Omit<MenuProps, 'children'> & {
  light?: IconButtonProps['light']
  color: IconProps['color']
}

export const MenuButton: React.VFC<Props> = (props) => {
  const { isHovering, thumbnailMenuOpened } = useThumbnailAttachment()
  const show = useMemo(
    () => isHovering || thumbnailMenuOpened,
    [isHovering, thumbnailMenuOpened],
  )

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
      {...props}
    />
  )
}
