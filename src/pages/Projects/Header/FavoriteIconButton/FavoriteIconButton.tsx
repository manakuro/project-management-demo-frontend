import React, { memo, useCallback } from 'react'
import { IconButton, IconButtonProps, TextProps } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { Icon } from './Icon'

type Props = {
  projectId: string
  textStyle?: TextProps
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>

export const FavoriteIconButton: React.VFC<Props> = memo<Props>((props) => {
  const { textStyle, projectId, ...rest } = props

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    // onToggle()
  }, [])

  return (
    <Tooltip
      hasArrow
      label="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <IconButton
        aria-label="Favorite project"
        icon={<Icon isFavorite={true} />}
        variant="ghost"
        size="sm"
        onClick={handleClick}
        h={6}
        w={6}
        {...rest}
      />
    </Tooltip>
  )
})
FavoriteIconButton.displayName = 'FavoriteIconButton'
