import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
  isHovering: boolean
}

export const DeleteButton: React.FC<Props> = memo<Props>((props) => {
  const { isHovering, projectId } = props
  const { setProject } = useProject(projectId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()

      await setProject({ dueDate: '' })
    },
    [setProject],
  )

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  )
})
DeleteButton.displayName = 'DeleteButton'
