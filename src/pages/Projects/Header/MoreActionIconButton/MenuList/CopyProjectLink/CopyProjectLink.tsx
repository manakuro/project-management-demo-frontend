import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useCopyProjectLink } from 'src/hooks/pages/projects'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  projectId: string
}

export const CopyProjectLink: React.FC<Props> = memo((props) => {
  const { onMouseEnter, projectId, onClose } = props
  const { copyProjectLink } = useCopyProjectLink({ projectId })

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onClose()

      await copyProjectLink()
    },
    [copyProjectLink, onClose],
  )

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="link" color="text.muted" />}
      onClick={handleClick}
    >
      Copy project link
    </MenuItem>
  )
})
CopyProjectLink.displayName = 'CopyProjectLink'
