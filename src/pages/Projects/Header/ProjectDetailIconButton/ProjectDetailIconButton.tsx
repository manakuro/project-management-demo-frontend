import React, { memo, useCallback } from 'react'
import { Icon, IconButton, IconButtonProps } from 'src/components/atoms'

type Props = {
  projectId: string
} & Omit<IconButtonProps, 'aria-label'>

export const ProjectDetailIconButton: React.VFC<Props> = memo<Props>(
  (props) => {
    const { projectId, ...rest } = props
    const handleClick = useCallback(() => {}, [])

    return (
      <IconButton
        aria-label="Project detail"
        icon={<Icon icon="infoCircle" color="text.muted" size="xs" />}
        variant="ghost"
        {...rest}
        h={6}
        w={6}
        onClick={handleClick}
      />
    )
  },
)

ProjectDetailIconButton.displayName = 'ProjectDetailIconButton'
