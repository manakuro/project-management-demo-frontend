import React from 'react'
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

type Props = Omit<MenuProps, 'children'> & {
  light?: IconButtonProps['light']
  color: IconProps['color']
}

export const MenuButton: React.VFC<Props> = (props) => {
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
      {...props}
    />
  )
}
