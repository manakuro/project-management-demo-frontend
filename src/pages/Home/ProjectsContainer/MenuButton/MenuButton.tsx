import React from 'react'
import { IconButton, Icon, IconButtonProps } from 'src/components/atoms'
import { PopoverProjectMenu } from 'src/components/organisms/Popovers'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  projectId: string
  onOpened?: () => void
  onClosed?: () => void
}

export const MenuButton: React.VFC<Props> = (props) => {
  const { projectId, onOpened, onClosed, ...rest } = props

  return (
    <PopoverProjectMenu
      addFavorite
      editNamesAndDescriptionProject
      copyProjectLink
      share
      projectId={projectId}
      iconButton={{
        as: IconButton,
        'aria-label': 'menu button',
        icon: <Icon icon="menu" size="xs" />,
        variant: 'ghost',
        ...rest,
      }}
      onOpened={onOpened}
      onClosed={onClosed}
    />
  )
}
