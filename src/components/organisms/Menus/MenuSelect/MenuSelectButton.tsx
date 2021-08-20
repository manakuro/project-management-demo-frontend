import React, { memo } from 'react'
import { MenuButton, MenuButtonProps } from 'src/components/organisms/Menu'
import { useMenuSelectContext } from './useMenuSelect'

type Props = MenuButtonProps

export const MenuSelectButton: React.FC<Props> = memo<Props>((props) => {
  const { onOpen } = useMenuSelectContext()

  return <MenuButton onClick={onOpen} {...props} />
})
MenuSelectButton.displayName = 'MenuSelectButton'
